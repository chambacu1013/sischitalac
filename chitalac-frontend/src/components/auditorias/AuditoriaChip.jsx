import React from "react";
import { Chip } from "@mui/material";

const CONFIG_ACCIONES = {
  CREAR: {
    label: "Creación",
    color: "success",
  },

  ACTUALIZAR: {
    label: "Actualización",
    color: "warning",
  },

  SINCRONIZAR: {
    label: "Sincronización",
    color: "info",
  },

  LOGIN: {
    label: "Inicio de sesión",
    color: "default",
  },

  LOGOUT: {
    label: "Cerrar sesión",
    color: "default",
  },

  ELIMINAR: {
    label: "Eliminación",
    color: "error",
  },
};

export default function AuditoriaChip({ accion }) {
  const config = CONFIG_ACCIONES[accion] || {
    label: accion || "Desconocida",
    color: "default",
  };

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      variant="filled"
      sx={{
        minWidth: 110,
        fontWeight: 600,
      }}
    />
  );
}
