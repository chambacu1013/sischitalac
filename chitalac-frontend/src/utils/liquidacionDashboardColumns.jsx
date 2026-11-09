import AccionesLiquidacion from "../components/liquidacionDashboard/AccionesLiquidacion";
import Chip from "@mui/material/Chip";
const formatearMoneda = (valor) =>
  `$ ${Number(valor ?? 0).toLocaleString("es-CO")}`;

const formatearLitros = (valor) => Number(valor ?? 0).toLocaleString("es-CO");

const liquidacionDashboardColumns = (cargarDetalle) => [
  {
    field: "acciones",
    headerName: "Acciones",
    sortable: false,
    filterable: false,
    width: 80,
    renderCell: (params) => (
      <AccionesLiquidacion row={params.row} cargarDetalle={cargarDetalle} />
    ),
  },
  {
    field: "estado_contable",
    headerName: "Estado",
    width: 120,
    align: "center",
    headerAlign: "center",

    renderCell: ({ value }) => (
      <Chip
        label={value}
        color={value === "ABIERTA" ? "success" : "error"}
        size="small"
        variant="filled"
      />
    ),
  },
  {
    field: "proveedor",
    headerName: "Proveedor",
    flex: 2,
    minWidth: 200,
  },
  {
    field: "prov_finca",
    headerName: "Finca",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "total_litros",
    headerName: "Litros",
    flex: 1,
    minWidth: 80,
    valueFormatter: (params) => formatearLitros(params),
  },
  {
    field: "precio_total_leche",
    headerName: "Valor leche",
    flex: 1.2,
    minWidth: 130,
    valueFormatter: (params) => formatearMoneda(params),
  },
  {
    field: "total_descuento_pedidos",
    headerName: "Descuentos",
    flex: 1.2,
    minWidth: 130,
    valueFormatter: (params) => formatearMoneda(params),
  },
  {
    field: "saldo_pendiente_antiguo",
    headerName: "Saldo anterior",
    flex: 1.2,
    minWidth: 150,
    valueFormatter: (params) => formatearMoneda(params),
  },
  {
    field: "saldo_neto_final",
    headerName: "Saldo neto",
    flex: 1.2,
    minWidth: 150,
    valueFormatter: (params) => formatearMoneda(params),
  },
];

export default liquidacionDashboardColumns;
