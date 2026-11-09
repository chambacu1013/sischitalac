import React, { useState, useEffect } from "react";

import { UsuarioModal } from "../components/UsuarioModal";
import TablaUsuarios from "../components/usuarios/TablaUsuarios";
import { usuariosColumns } from "../utils/usuariosColumns";
import ToolbarUsuarios from "../components/usuarios/ToolbarUsuarios";

import {
  obtenerUsuarios,
  createUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../services/userService";

import ConfirmDialog from "../components/common/dialogs/ConfirmDialog";
import useSnackbar from "../components/common/feedback/useSnackbar";
import AppSnackbar from "../components/common/feedback/AppSnackbar";

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  // Estado para ConfirmDialog
  const [openDialog, setOpenDialog] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  // Sistema de Snackbar
  const { snackbar, mostrarSuccess, mostrarError, cerrarSnackbar } =
    useSnackbar();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);

    try {
      const data = await obtenerUsuarios();

      setUsuarios(data);
    } catch (err) {
      console.error(err);

      mostrarError("No fue posible cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // NUEVO USUARIO
  // =====================================================

  const handleNuevoUsuario = () => {
    setUsuarioSeleccionado(null);
    setIsModalOpen(true);
  };

  // =====================================================
  // EDITAR USUARIO
  // =====================================================

  const handleEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setIsModalOpen(true);
  };

  // =====================================================
  // GUARDAR / ACTUALIZAR
  // =====================================================

  const handleSave = async (datosFormulario) => {
    try {
      const token = localStorage.getItem("token");

      const esEdicion = !!usuarioSeleccionado;

      const payloadBackend = {
        nombre: datosFormulario.usu_nombre,
        apellido: datosFormulario.usu_apellido,
        cedula: datosFormulario.usu_cedula,
        username: datosFormulario.usu_username,
        password: datosFormulario.usu_password,
        rol_id: parseInt(datosFormulario.rol_id),
      };

      if (esEdicion) {
        await actualizarUsuario(
          token,
          usuarioSeleccionado.usu_id,
          payloadBackend,
        );
      } else {
        await createUsuario(token, payloadBackend);
      }

      // Limpiar interfaz
      setIsModalOpen(false);
      setUsuarioSeleccionado(null);

      // Actualizar tabla
      await cargarDatos();

      // Snackbar
      mostrarSuccess(
        esEdicion
          ? "Usuario actualizado exitosamente."
          : "Usuario creado exitosamente.",
      );
    } catch (error) {
      console.error(error);

      mostrarError("Error al procesar la solicitud: " + error.message);
    }
  };

  // =====================================================
  // PREPARAR ELIMINACIÓN
  // =====================================================

  const handleDelete = (id, nombre, rolId) => {
    // Validación especial para administrador
    if (parseInt(rolId) === 1) {
      mostrarError(
        "Acción denegada: Los administradores no pueden ser eliminados del sistema.",
      );

      return;
    }

    const usuario = usuarios.find((u) => u.usu_id === id);

    setUsuarioAEliminar({
      ...usuario,
      nombreMostrar: nombre,
    });

    setOpenDialog(true);
  };

  // =====================================================
  // CONFIRMAR ELIMINACIÓN
  // =====================================================

  const confirmarEliminar = async () => {
    if (!usuarioAEliminar) return;

    try {
      const token = localStorage.getItem("token");

      await eliminarUsuario(token, usuarioAEliminar.usu_id);

      setOpenDialog(false);
      setUsuarioAEliminar(null);

      await cargarDatos();

      mostrarSuccess("Usuario eliminado con éxito.");
    } catch (error) {
      console.error(error);

      mostrarError(error.message);
    }
  };

  const columns = usuariosColumns(handleEditarUsuario, handleDelete);

  return (
    <div style={{ padding: "20px" }}>
      <ToolbarUsuarios
        onNuevo={handleNuevoUsuario}
        filtro={filtro}
        onFiltroChange={setFiltro}
      />

      <TablaUsuarios usuarios={usuarios} columns={columns} loading={loading} />

      <UsuarioModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setUsuarioSeleccionado(null);
        }}
        onSave={handleSave}
        editData={usuarioSeleccionado}
      />

      {/* =================================================
          CONFIRMAR ELIMINACIÓN
      ================================================= */}

      <ConfirmDialog
        open={openDialog}
        titulo="Eliminar usuario"
        mensaje={
          usuarioAEliminar
            ? `¿Está seguro de eliminar el acceso al sistema de "${usuarioAEliminar.nombreMostrar}"? Esta acción no se puede deshacer.`
            : "¿Está seguro de eliminar este usuario?"
        }
        textoConfirmar="Eliminar"
        textoCancelar="Cancelar"
        onClose={() => {
          setOpenDialog(false);
          setUsuarioAEliminar(null);
        }}
        onConfirm={confirmarEliminar}
      />

      {/* =================================================
          SNACKBAR
      ================================================= */}

      <AppSnackbar snackbar={snackbar} onClose={cerrarSnackbar} />
    </div>
  );
};
