import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import BaseDialog from "../components/common/dialogs/BaseDialog";
import FormInput from "../components/common/forms/FormInput";
import FormSelect from "../components/common/forms/FormSelect";
import FormActions from "../components/common/forms/FormActions";

import "../estilos/usuarioModal.css";

export const UsuarioModal = ({ isOpen, onClose, onSave, editData }) => {
  const [form, setForm] = useState({
    usu_nombre: "",
    usu_apellido: "",
    usu_cedula: "",
    usu_username: "",
    usu_password: "",
    rol_id: 2, // Por defecto Operario
  });

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setForm(editData);
      } else {
        setForm({
          usu_nombre: "",
          usu_apellido: "",
          usu_cedula: "",
          usu_username: "",
          usu_password: "",
          rol_id: 2,
        });
      }
    } else {
      setForm({
        usu_nombre: "",
        usu_apellido: "",
        usu_cedula: "",
        usu_username: "",
        usu_password: "",
        rol_id: 2,
      });
    }
  }, [editData, isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  const opcionesRol = [
    { value: 1, label: "Administrador" },
    { value: 2, label: "Operario" },
    { value: 3, label: "Asesor" },
  ];
  return (
    <BaseDialog
      open={isOpen}
      onClose={onClose}
      titulo={editData ? "Editar Usuario" : "Registrar Nuevo Usuario"}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormInput
              label="Nombre"
              name="usu_nombre"
              value={form.usu_nombre}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormInput
              label="Apellido"
              name="usu_apellido"
              value={form.usu_apellido}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormInput
              label="Cédula"
              name="usu_cedula"
              value={form.usu_cedula}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormInput
              label="Usuario"
              name="usu_username"
              value={form.usu_username}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormInput
              label={editData ? "Nueva contraseña" : "Contraseña"}
              name="usu_password"
              value={form.usu_password}
              onChange={handleChange}
              required={!editData}
              type="password"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormSelect
              label="Rol"
              name="rol_id"
              value={form.rol_id}
              options={opcionesRol}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <FormActions
          onCancel={onClose}
          textoGuardar={editData ? "Actualizar Usuario" : "Guardar Usuario"}
        />
      </form>
    </BaseDialog>
  );
};
