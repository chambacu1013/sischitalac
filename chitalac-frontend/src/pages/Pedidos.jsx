import { useEffect, useState } from "react";

import { Box, Grid, Paper } from "@mui/material";

import CabeceraProveedor from "../components/pedidos/CabeceraProveedor";
import ToolbarPedidos from "../components/pedidos/ToolbarPedidos";
import TablaPedidos from "../components/pedidos/TablaPedidos";
import PedidoModal from "../components/pedidos/PedidoModal";
import SelectorQuincena from "../components/pedidos/SelectorQuincena";
import TabsProveedores from "../components/pedidos/TabsProveedores";
import { pedidoColumns } from "../utils/pedidoColumns";
import ConfirmDialog from "../components/common/dialogs/ConfirmDialog";
import useSnackbar from "../components/common/feedback/useSnackbar";
import AppSnackbar from "../components/common/feedback/AppSnackbar";
import {
  obtenerQuincenas,
  obtenerProveedoresPorQuincena,
  obtenerPedidos,
  eliminarPedido,
} from "../services/pedidoService";

function Pedidos() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [quincenas, setQuincenas] = useState([]);
  const [quincenaSeleccionada, setQuincenaSeleccionada] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [proveedor, setProveedor] = useState(null);
  const [liquidacion, setLiquidacion] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [modo, setModo] = useState("crear");
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const { snackbar, mostrarSuccess, mostrarError, cerrarSnackbar } =
    useSnackbar();
  const handleNuevo = () => {
    setModo("crear");

    setPedidoSeleccionado(null);

    setOpenModal(true);
  };

  const handleCerrar = () => {
    setOpenModal(false);

    setPedidoSeleccionado(null);

    setModo("crear");
  };

  const handleEditar = (pedido) => {
    setModo("editar");

    setPedidoSeleccionado(pedido);

    setOpenModal(true);
  };

  const handleEliminar = (pedido) => {
    console.log(pedido);
    setPedidoSeleccionado(pedido);

    setOpenDialog(true);
  };
  const confirmarEliminar = async () => {
    try {
      await eliminarPedido(pedidoSeleccionado.ped_id);
      mostrarSuccess("Pedido eliminado correctamente.");
      setOpenDialog(false);

      setPedidoSeleccionado(null);

      await cargarPedidos(quincenaSeleccionada, proveedorSeleccionado);

      await cargarProveedores(quincenaSeleccionada);
    } catch (error) {
      console.error(error);
      mostrarError("No fue posible eliminar el pedido.");
    }
  };
  const cargarQuincenas = async () => {
    try {
      setLoading(true);

      const response = await obtenerQuincenas();

      const data = response.data ?? [];

      setQuincenas(data);

      if (data.length > 0) {
        setQuincenaSeleccionada(data[0].quin_id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const cargarProveedores = async (quin_id) => {
    try {
      setLoading(true);

      const response = await obtenerProveedoresPorQuincena(quin_id);

      const data = response.data ?? [];

      setProveedores(data);
      if (data.length === 0) {
        setProveedor(null);

        setProveedorSeleccionado(null);

        setLiquidacion(null);

        setPedidos([]);

        return;
      }
      setProveedor(data[0]);

      setProveedorSeleccionado(data[0].prov_id);

      setLiquidacion(data[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const cargarPedidos = async (quin_id, prov_id) => {
    try {
      setLoading(true);

      const response = await obtenerPedidos(quin_id, prov_id);

      setPedidos(response.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quincenaSeleccionada || !proveedorSeleccionado) {
      return;
    }

    cargarPedidos(
      quincenaSeleccionada,

      proveedorSeleccionado,
    );
  }, [quincenaSeleccionada, proveedorSeleccionado]);
  useEffect(() => {
    cargarQuincenas();
  }, []);
  useEffect(() => {
    if (!quincenaSeleccionada) return;

    cargarProveedores(quincenaSeleccionada);
  }, [quincenaSeleccionada]);
  const columns = pedidoColumns(
    handleEditar,
    handleEliminar,
    liquidacion ? liquidacion.estado_contable : null,
  );
  const seleccionarProveedor = (prov_id) => {
    setProveedorSeleccionado(prov_id);

    const proveedorActual = proveedores.find((p) => p.prov_id === prov_id);

    if (!proveedorActual) return;

    setProveedor(proveedorActual);
    setLiquidacion(proveedorActual);
  };
  return (
    <Box sx={{ p: 1 }}>
      <SelectorQuincena
        quincenas={quincenas}
        quincenaSeleccionada={quincenaSeleccionada}
        onSeleccionarQuincena={(quin_id) => {
          setQuincenaSeleccionada(quin_id);

          setProveedorSeleccionado(null);

          setProveedor(null);

          setLiquidacion(null);

          setPedidos([]);
        }}
      />
      <TabsProveedores
        proveedores={proveedores}
        proveedorSeleccionado={proveedorSeleccionado}
        onSeleccionarProveedor={seleccionarProveedor}
      />
      {proveedor && liquidacion && (
        <CabeceraProveedor
          proveedor={proveedor}
          liquidacion={liquidacion}
          totalPedidos={pedidos.length}
          totalDescuentos={proveedor.total_descuento_pedidos}
        />
      )}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        <ToolbarPedidos
          totalPedidos={pedidos.length}
          estadoLiquidacion={liquidacion?.estado_contable}
          onNuevoPedido={handleNuevo}
        />
        <TablaPedidos pedidos={pedidos} columns={columns} loading={false} />

        <PedidoModal
          open={openModal}
          modo={modo}
          pedido={pedidoSeleccionado}
          quinId={quincenaSeleccionada}
          onClose={handleCerrar}
          onSuccess={async () => {
            await cargarPedidos(
              quincenaSeleccionada,

              proveedorSeleccionado,
            );

            await cargarProveedores(quincenaSeleccionada);
          }}
        />
      </Paper>
      <AppSnackbar snackbar={snackbar} onClose={cerrarSnackbar} />
      <ConfirmDialog
        open={openDialog}
        titulo="Eliminar pedido"
        mensaje={`¿Desea eliminar el pedido "${pedidoSeleccionado?.ped_descripcion}"?`}
        onClose={() => {
          setOpenDialog(false);
          setPedidoSeleccionado(null);
        }}
        onConfirm={confirmarEliminar}
      />
      ;
    </Box>
  );
}

export default Pedidos;
