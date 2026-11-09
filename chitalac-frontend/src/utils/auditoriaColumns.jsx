import { Chip, Tooltip } from "@mui/material";

import AuditoriaChip from "../components/auditorias/AuditoriaChip";

const formatearFecha = (fecha) => {
  if (!fecha) return "-";

  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",

    month: "2-digit",

    year: "numeric",

    hour: "2-digit",

    minute: "2-digit",
  }).format(new Date(fecha));
};

const formatearLitros = (valor) => {
  if (valor === null || valor === undefined) return "-";

  return `${Number(valor).toFixed(2)} L`;
};

export const auditoriaColumns = [
  {
    field: "aud_timestamp",
    headerName: "Fecha",
    width: 170,
    valueFormatter: (value) => formatearFecha(value),
  },

  {
    field: "usuario",

    headerName: "Usuario",

    flex: 1,

    minWidth: 220,

    valueGetter: (_, row) =>
      `${row.usu_nombre ?? ""} ${row.usu_apellido ?? ""}`.trim(),
  },

  {
    field: "proveedor",
    headerName: "Proveedor",
    flex: 1,
    minWidth: 220,

    valueGetter: (_, row) =>
      `${row.prov_nom ?? ""} ${row.prov_ape ?? ""}`.trim(),
  },

  {
    field: "aud_accion",
    headerName: "Acción",
    width: 150,
    align: "center",
    headerAlign: "center",

    renderCell: (params) => <AuditoriaChip accion={params.value} />,
  },

  {
    field: "litros_anteriores",
    headerName: "Antes",
    width: 120,
    align: "right",
    headerAlign: "right",
    valueFormatter: (value) => formatearLitros(value),
  },

  {
    field: "litros_nuevos",
    headerName: "Después",
    width: 120,
    align: "right",
    headerAlign: "right",
    valueFormatter: (value) => formatearLitros(value),
  },

  {
    field: "aud_detalle",
    headerName: "Detalle",
    flex: 2,
    minWidth: 350,

    renderCell: (params) => (
      <Tooltip title={params.value || ""}>
        <span
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            width: "100%",
            display: "block",
          }}
        >
          {params.value}
        </span>
      </Tooltip>
    ),
  },
];
