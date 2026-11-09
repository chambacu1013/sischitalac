// src/pages/Proveedores.jsx
import React, { useEffect, useState } from "react";
import {
  obtenerProveedores,
  createProveedor,
  actualizarProveedor,
  eliminarProveedor,
} from "../services/proveedorService";
import { ProveedorModal } from "../components/ProveedorModal";
import ToolbarProveedores from "../components/proveedores/ToolbarProveedores";
import TablaProveedores from "../components/proveedores/TablaProveedores";
import ConfirmDialog from "../components/common/dialogs/ConfirmDialog";
import useSnackbar from "../components/common/feedback/useSnackbar";
import AppSnackbar from "../components/common/feedback/AppSnackbar";
import { proveedoresColumns } from "../utils/proveedoresColumns";
export const Proveedores = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [proveedorAEliminar, setProveedorAEliminar] = useState(null);

  const { snackbar, mostrarSuccess, mostrarError, cerrarSnackbar } =
    useSnackbar();

  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null); // Estado para saber qué proveedor editar
  const [filtro, setFiltro] = useState("");
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const data = await obtenerProveedores();
      setProveedores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Función encargada de abrir el modal en modo "Creación"
  const handleNuevoProveedor = () => {
    setProveedorSeleccionado(null); // Al ser null, el modal sabe que es uno nuevo
    setIsModalOpen(true);
  };

  // Función encargada de abrir el modal en modo "Edición"
  const handleEditarProveedor = (proveedor) => {
    setProveedorSeleccionado(proveedor); // Pasamos los datos del proveedor seleccionado
    setIsModalOpen(true);
  };

  // Esta única función maneja tanto el guardar como el actualizar
  const handleSave = async (datosFormulario) => {
    try {
      const token = localStorage.getItem("token");

      const payloadBackend = {
        nombre: datosFormulario.prov_nom,
        apellido: datosFormulario.prov_ape,
        cedula: datosFormulario.prov_cedula,
        finca: datosFormulario.prov_finca,
        vereda: datosFormulario.prov_vereda,
        telefono: datosFormulario.prov_tel,
      };

      const esEdicion = !!proveedorSeleccionado;

      if (esEdicion) {
        await actualizarProveedor(
          token,
          proveedorSeleccionado.prov_id,
          payloadBackend,
        );
      } else {
        await createProveedor(token, payloadBackend);
      }

      setIsModalOpen(false);
      setProveedorSeleccionado(null);

      await cargarDatos();

      mostrarSuccess(
        esEdicion
          ? "Proveedor actualizado exitosamente."
          : "Proveedor agregado exitosamente.",
      );
    } catch (error) {
      mostrarError("Error al procesar la solicitud: " + error.message);
    }
  };
  const handleDelete = (id) => {
    const proveedor = proveedores.find((p) => p.prov_id === id);

    setProveedorAEliminar(proveedor);
    setOpenDialog(true);
  };
  const confirmarEliminar = async () => {
    if (!proveedorAEliminar) return;

    try {
      const token = localStorage.getItem("token");

      await eliminarProveedor(token, proveedorAEliminar.prov_id);

      setOpenDialog(false);
      setProveedorAEliminar(null);

      await cargarDatos();

      mostrarSuccess("Proveedor eliminado correctamente.");
    } catch (error) {
      console.error(error);

      mostrarError(error.message);
    }
  };
  const columns = proveedoresColumns(handleEditarProveedor, handleDelete);
  if (loading) return <div>Cargando proveedores...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <ToolbarProveedores
        onNuevo={handleNuevoProveedor}
        filtro={filtro}
        onFiltroChange={setFiltro}
      />
      <TablaProveedores
        proveedores={proveedores}
        columns={columns}
        loading={loading}
      />
      {/* 3. Renderizado del Modal */}
      <ProveedorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProveedorSeleccionado(null); // 2. Limpiamos también si el usuario da clic en "Cancelar" o cierra el modal
        }}
        onSave={handleSave}
        editData={proveedorSeleccionado}
      />
      <AppSnackbar snackbar={snackbar} onClose={cerrarSnackbar} />

      <ConfirmDialog
        open={openDialog}
        titulo="Eliminar proveedor"
        mensaje={
          proveedorAEliminar
            ? `¿Está seguro de eliminar al proveedor "${proveedorAEliminar.prov_nom} ${proveedorAEliminar.prov_ape}"? Esta acción no se puede deshacer.`
            : "¿Está seguro de eliminar este proveedor?"
        }
        textoConfirmar="Eliminar"
        textoCancelar="Cancelar"
        onClose={() => {
          setOpenDialog(false);
          setProveedorAEliminar(null);
        }}
        onConfirm={confirmarEliminar}
      />
    </div>
  );
};
