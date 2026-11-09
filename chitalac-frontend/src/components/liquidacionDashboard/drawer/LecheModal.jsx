import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";

const estadoInicial = {
  lec_fecha: "",
  lec_litros: "",
  lec_prueba_alcohol: true,
};

const LecheModal = ({
  open,
  onClose,
  lecheSeleccionada,
  quinId,
  fechaInicio,
  fechaFin,
  onGuardar,
  mostrarError,
}) => {
  const [formData, setFormData] = useState(estadoInicial);
  const [guardando, setGuardando] = useState(false);
  const esEdicion = Boolean(lecheSeleccionada?.lec_id);

  useEffect(() => {
    if (!open) return;

    if (lecheSeleccionada) {
      setFormData({
        lec_fecha: lecheSeleccionada.lec_fecha?.split("T")[0] || "",
        lec_litros: lecheSeleccionada.lec_litros || "",
        lec_prueba_alcohol: lecheSeleccionada.lec_prueba_alcohol ?? true,
      });
    } else {
      setFormData(estadoInicial);
    }
  }, [open, lecheSeleccionada]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePruebaAlcohol = (event) => {
    setFormData((prev) => ({
      ...prev,
      lec_prueba_alcohol: event.target.checked,
    }));
  };
  const handleSubmit = async () => {
    if (!formData.lec_fecha) {
      mostrarError("Debe seleccionar una fecha.");
      return;
    }
    if (Number(formData.lec_litros) < 0) {
      mostrarError("La cantidad de litros NO debe ser negativo");
      return;
    }
    try {
      setGuardando(true);
      const datos = {
        quin_id: quinId,
        fecha: formData.lec_fecha,
        litros: Number(formData.lec_litros),
        prueba_alcohol: formData.lec_prueba_alcohol,
      };
      await onGuardar(datos);
    } finally {
      setGuardando(false);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {esEdicion ? "Editar registro de leche" : "Agregar registro de leche"}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: "16px !important",
        }}
      >
        <TextField
          label="Fecha"
          name="lec_fecha"
          type="date"
          value={formData.lec_fecha}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: fechaInicio,
            max: fechaFin,
          }}
          fullWidth
          required
        />

        <TextField
          label="Litros"
          name="lec_litros"
          type="number"
          value={formData.lec_litros}
          onChange={handleChange}
          inputProps={{
            min: 0.01,
            step: 0.01,
          }}
          fullWidth
          required
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.lec_prueba_alcohol}
              onChange={handlePruebaAlcohol}
            />
          }
          label={
            formData.lec_prueba_alcohol
              ? "Prueba de alcohol aprobada"
              : "Prueba de alcohol rechazada"
          }
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>

        <Button variant="contained" onClick={handleSubmit} disabled={guardando}>
          {guardando
            ? "Guardando..."
            : esEdicion
              ? "Guardar cambios"
              : "Agregar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LecheModal;
