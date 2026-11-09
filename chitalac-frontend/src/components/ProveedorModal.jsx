// src/components/ProveedorModal.jsx
import React, { useState, useEffect } from "react";

import { Grid } from "@mui/material";

import BaseDialog from "../components/common/dialogs/BaseDialog";

import FormInput from "../components/common/forms/FormInput";
import FormActions from "../components/common/forms/FormActions";

import "../estilos/proveedorModal.css";

export const ProveedorModal = ({ isOpen, onClose, onSave, editData }) => {
  const [form, setForm] = useState({
    prov_nom: "",
    prov_ape: "",
    prov_cedula: "",
    prov_finca: "",
    prov_vereda: "",
    prov_tel: "",
  });

  // Cada vez que el modal se abre o cambia el proveedor a editar, actualizamos el estado interno
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setForm(editData); // Carga los datos si es edición
      } else {
        // Limpia si se abre como nuevo
        setForm({
          prov_nom: "",
          prov_ape: "",
          prov_cedula: "",
          prov_finca: "",
          prov_vereda: "",
          prov_tel: "",
        });
      }
    } else {
      // === NUEVO: Si el modal se cierra (isOpen === false), vaciamos todo de inmediato ===
      setForm({
        prov_nom: "",
        prov_ape: "",
        prov_cedula: "",
        prov_finca: "",
        prov_vereda: "",
        prov_tel: "",
      });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form); // Envía el estado completo a la página padre
  };
  return (
    <BaseDialog
      open={isOpen}
      onClose={onClose}
      titulo={editData ? "Editar Proveedor" : "Registrar Nuevo Proveedor"}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormInput
              label="Nombre"
              name="prov_nom"
              value={form.prov_nom}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormInput
              label="Apellido"
              name="prov_ape"
              value={form.prov_ape}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormInput
              label="Cédula"
              name="prov_cedula"
              value={form.prov_cedula}
              onChange={handleChange}
              required
              disabled={!!editData}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormInput
              label="Teléfono"
              name="prov_tel"
              value={form.prov_tel}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormInput
              label="Finca"
              name="prov_finca"
              value={form.prov_finca}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormInput
              label="Vereda"
              name="prov_vereda"
              value={form.prov_vereda}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <FormActions
          onCancel={onClose}
          textoGuardar={editData ? "Actualizar Proveedor" : "Guardar Proveedor"}
        />
      </form>
    </BaseDialog>
  );
};
