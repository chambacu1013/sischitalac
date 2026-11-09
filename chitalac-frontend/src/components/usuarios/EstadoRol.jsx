import Chip from "@mui/material/Chip";

export default function EstadoRol({ rol }) {
  const config = {
    ADMINISTRADOR: {
      color: "error",
      label: "Administrador",
    },
    OPERARIO: {
      color: "primary",
      label: "Operario",
    },
    ASESOR: {
      color: "warning",
      label: "Asesor",
    },
  };

  const estado = config[rol] || {
    color: "default",
    label: rol,
  };

  return (
    <Chip
      label={estado.label}
      color={estado.color}
      size="small"
      variant="filled"
    />
  );
}
