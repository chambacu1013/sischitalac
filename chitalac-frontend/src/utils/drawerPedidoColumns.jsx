import AccionesPedido from "../components/liquidacionDashboard/drawer/AccionesPedido";
import { formatearMoneda } from "./formatters";

const drawerPedidoColumns = ({ estadoLiquidacion, onEditar, onEliminar }) => [
  {
    field: "ped_dia",
    headerName: "Día",
    width: 50,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "ped_descripcion",
    headerName: "Descripción",
    width: 190,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "ped_unidad",
    headerName: "Unidad",
    width: 90,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "ped_cantidad",
    headerName: "Cantidad",
    width: 80,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "ped_valor_unitario",
    headerName: "Vr. Unitario",
    width: 110,
    align: "right",
    headerAlign: "right",
    renderCell: (params) => formatearMoneda(params.value),
  },
  {
    field: "ped_subtotal",
    headerName: "Subtotal",
    width: 130,
    align: "right",
    headerAlign: "right",
    renderCell: (params) => formatearMoneda(params.value),
  },
  {
    field: "acciones",
    headerName: "Acciones",
    width: 120,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }) => (
      <AccionesPedido
        pedido={row}
        estadoLiquidacion={estadoLiquidacion}
        onEditar={onEditar}
        onEliminar={onEliminar}
      />
    ),
  },
];

export default drawerPedidoColumns;
