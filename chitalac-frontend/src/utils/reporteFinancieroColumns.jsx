import { Chip, Tooltip } from "@mui/material";

/* =====================================================
   FORMATEADORES
===================================================== */

const formatearMoneda = (valor) => {
  if (valor === null || valor === undefined) {
    return "$ 0";
  }

  return Number(valor).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
};

const formatearLitros = (valor) => {
  if (valor === null || valor === undefined) {
    return "-";
  }

  return `${Number(valor).toFixed(2)} L`;
};

/* =====================================================
   COLUMNAS DEL REPORTE FINANCIERO
===================================================== */

export const reporteFinancieroColumns = ({
  onCancelar,
  cancelando = false,
} = {}) => [
  /* ---------------------------------------------------
     PROVEEDOR
  --------------------------------------------------- */
  {
    field: "proveedor",
    headerName: "Proveedor",
    flex: 1,
    minWidth: 160,

    valueGetter: (_, row) =>
      `${row.prov_nom ?? ""} ${row.prov_ape ?? ""}`.trim(),
  },

  /* ---------------------------------------------------
     LITROS
  --------------------------------------------------- */
  {
    field: "litros",
    headerName: "Litros",
    width: 100,
    align: "right",
    headerAlign: "right",

    valueFormatter: (value) => formatearLitros(value),
  },

  /* ---------------------------------------------------
     VALOR LECHE
  --------------------------------------------------- */
  {
    field: "valor_leche",
    headerName: "Valor Leche",
    width: 160,
    align: "right",
    headerAlign: "right",

    valueFormatter: (value) => formatearMoneda(value),
  },

  /* ---------------------------------------------------
     DEDUCCIONES
  --------------------------------------------------- */
  {
    field: "deducciones",
    headerName: "Deducciones",
    width: 160,
    align: "right",
    headerAlign: "right",

    valueFormatter: (value) => formatearMoneda(value),
  },

  /* ---------------------------------------------------
     SALDO
  --------------------------------------------------- */
  {
    field: "saldo_final",
    headerName: "Saldo",
    width: 160,
    align: "right",
    headerAlign: "right",

    renderCell: (params) => {
      const saldo = Number(params.value || 0);
      const negativo = saldo < 0;

      return (
        <span
          style={{
            fontWeight: 700,
            color: negativo ? "#dc2626" : "#15803d",
          }}
        >
          {formatearMoneda(saldo)}
        </span>
      );
    },
  },

  /* ---------------------------------------------------
     ESTADO
  --------------------------------------------------- */
  {
    field: "estado_saldo",
    headerName: "Estado",
    width: 150,
    align: "center",
    headerAlign: "center",

    renderCell: (params) => {
      const estado = params.value || "OK";

      let color = "success";

      if (estado === "PENDIENTE") {
        color = "warning";
      }

      if (estado === "CANCELADO") {
        color = "info";
      }

      return (
        <Chip
          label={estado}
          color={color}
          size="small"
          sx={{
            minWidth: 95,
            fontWeight: 700,
          }}
        />
      );
    },
  },

  /* ---------------------------------------------------
     ACCIÓN
  --------------------------------------------------- */
  {
    field: "accion",
    headerName: "Acción",
    width: 140,
    align: "center",
    headerAlign: "center",

    sortable: false,
    filterable: false,

    renderCell: (params) => {
      const estado = params.row.estado_saldo;

      if (estado !== "PENDIENTE") {
        return (
          <span
            style={{
              color: "#94a3b8",
              fontSize: 18,
            }}
          >
            —
          </span>
        );
      }

      return (
        <Tooltip title="Marcar saldo como cancelado">
          <button
            type="button"
            disabled={cancelando}
            onClick={() => onCancelar?.(params.row.prov_id)}
            style={{
              padding: "6px 12px",
              border: "1px solid #fecaca",
              borderRadius: "6px",
              background: "#ffffff",
              color: "#dc2626",
              fontSize: "12px",
              fontWeight: 600,
              cursor: cancelando ? "not-allowed" : "pointer",
            }}
          >
            {cancelando ? "Procesando..." : "Cancelar"}
          </button>
        </Tooltip>
      );
    },
  },
];
