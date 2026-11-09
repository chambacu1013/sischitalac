import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import TablaLeche from "./drawer/TablaLeche";
import LecheModal from "./drawer/LecheModal";
import { registrarAcopio, editarAcopio } from "../../services/lecheService";
import { actualizarPrecioLitro } from "../../services/liquidacionDashboardService";
import drawerPedidoColumns from "../../utils/drawerPedidoColumns";
import AppSnackbar from "../common/feedback/AppSnackbar";
import useSnackbar from "../common/feedback/useSnackbar";
import TablaPedidos from "./drawer/TablaPedidos";
import ToolbarPedidos from "./drawer/ToolbarPedidos";
import PedidoModal from "./drawer/PedidoModal";
import ConfirmDialog from "../common/dialogs/ConfirmDialog";
import { eliminarPedido } from "../../services/pedidoService";
import ResumenContable from "./drawer/ResumenContable";
import { generarFacturaPDF } from "../../services/facturaService";
const DrawerLiquidacion = ({
  open,
  onClose,
  detalle,
  loading = false,
  onActualizarDetalle,
  onActualizarDashboard,
}) => {
  const { snackbar, mostrarSuccess, mostrarError, cerrarSnackbar } =
    useSnackbar();
  const proveedor = detalle?.proveedor;
  const liquidacion = detalle?.liquidacion;

  const liquidacionAbierta = liquidacion?.estado_contable === "ABIERTA";
  const [lecheModalOpen, setLecheModalOpen] = useState(false);

  const [lecheSeleccionada, setLecheSeleccionada] = useState(null);
  const [pedidoModalOpen, setPedidoModalOpen] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [confirmEliminarOpen, setConfirmEliminarOpen] = useState(false);
  const [pedidoEliminar, setPedidoEliminar] = useState(null);
  const [modoPedido, setModoPedido] = useState("crear");
  const [precioLitro, setPrecioLitro] = useState("");
  const [generandoFactura, setGenerandoFactura] = useState(false);
  const [confirmFacturaOpen, setConfirmFacturaOpen] = useState(false);
  useEffect(() => {
    setPrecioLitro(liquidacion?.precio_unitario_litro ?? "");
  }, [liquidacion]);
  const refrescarDetalle = async () => {
    await onActualizarDetalle(liquidacion.quin_id);
  };
  const handleGuardarPrecio = async () => {
    try {
      await actualizarPrecioLitro(liquidacion.quin_id, precioLitro);
      await onActualizarDetalle(liquidacion.quin_id);
      await onActualizarDashboard();
      mostrarSuccess("Precio por litro actualizado correctamente.");
    } catch (error) {
      mostrarError(
        error.message || "No fue posible actualizar el precio por litro.",
      );
      console.error(error);
    }
  };

  const handleAgregarLeche = () => {
    if (!liquidacionAbierta) return;

    setLecheSeleccionada(null);
    setLecheModalOpen(true);
  };

  const handleEditarLeche = (leche) => {
    if (!liquidacionAbierta) return;

    setLecheSeleccionada(leche);
    setLecheModalOpen(true);
  };

  const handleCerrarLecheModal = () => {
    setLecheModalOpen(false);
    setLecheSeleccionada(null);
  };
  const handleGuardarLeche = async (datos) => {
    try {
      if (lecheSeleccionada) {
        await editarAcopio(lecheSeleccionada.lec_id, datos);

        mostrarSuccess("Registro de leche actualizado correctamente.");
      } else {
        await registrarAcopio(datos);

        mostrarSuccess("Registro de leche agregado correctamente.");
      }

      await refrescarDetalle();
      await onActualizarDashboard();

      handleCerrarLecheModal();
    } catch (error) {
      mostrarError(error.message || "No fue posible guardar el registro.");

      console.error(error);
    }
  };
  const handleNuevoPedido = () => {
    setModoPedido("crear");
    setPedidoSeleccionado(null);
    setPedidoModalOpen(true);
  };
  const handleEditarPedido = (pedido) => {
    setModoPedido("editar");
    setPedidoSeleccionado(pedido);
    setPedidoModalOpen(true);
  };
  const handleCerrarPedidoModal = () => {
    setPedidoModalOpen(false);
    setPedidoSeleccionado(null);
  };
  const handleEliminarPedido = (pedido) => {
    setPedidoEliminar(pedido);
    setConfirmEliminarOpen(true);
  };
  const handleCerrarConfirmacion = () => {
    setConfirmEliminarOpen(false);
    setPedidoEliminar(null);
  };
  const handleConfirmarEliminarPedido = async () => {
    try {
      await eliminarPedido(pedidoEliminar.ped_id);

      await refrescarDetalle();
      await onActualizarDashboard();
      mostrarSuccess("Pedido eliminado correctamente.");

      handleCerrarConfirmacion();
    } catch (error) {
      mostrarError(error.message || "No fue posible eliminar el pedido.");
    }
  };

  const generarFactura = async () => {
    try {
      setGenerandoFactura(true);

      const blob = await generarFacturaPDF(liquidacion.quin_id);

      const url = window.URL.createObjectURL(blob);

      window.open(url, "_blank");

      mostrarSuccess("Factura generada correctamente.");

      await refrescarDetalle();
      await onActualizarDashboard();
    } catch (error) {
      mostrarError(error.message || "No fue posible generar la factura.");
    } finally {
      setGenerandoFactura(false);
    }
  };

  const handleGenerarFactura = () => {
    if (liquidacion?.estado_contable === "LIQUIDADA") {
      generarFactura();
      return;
    }

    setConfirmFacturaOpen(true);
  };

  const handleConfirmarFactura = async () => {
    setConfirmFacturaOpen(false);

    await generarFactura();
  };

  const handleCerrarConfirmFactura = () => {
    setConfirmFacturaOpen(false);
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: {
            xs: "100%",
            sm: 500,
            md: 600,
          },
        },
      }}
    >
      {/* CABECERA */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Detalle de la liquidación
          </Typography>

          {liquidacion && (
            <Typography variant="body2" color="text.secondary">
              Liquidación #{liquidacion.quin_id}
            </Typography>
          )}
        </Box>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      {/* CONTENIDO */}
      <Box
        sx={{
          p: 2,
          overflowY: "auto",
          flex: 1,
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 5,
            }}
          >
            <CircularProgress />
          </Box>
        ) : !detalle ? (
          <Typography color="text.secondary">
            No hay información disponible.
          </Typography>
        ) : (
          <>
            {/* PROVEEDOR */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Proveedor
              </Typography>

              <Typography variant="h6" fontWeight="bold">
                {proveedor?.proveedor || "Sin información"}
              </Typography>

              {proveedor?.prov_cedula && (
                <Typography variant="body2">
                  C.C. {proveedor.prov_cedula}
                </Typography>
              )}

              {proveedor?.prov_finca && (
                <Typography variant="body2">
                  Finca: {proveedor.prov_finca}
                </Typography>
              )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* ESTADO */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Estado de la liquidación
              </Typography>

              <Typography
                fontWeight="bold"
                color={liquidacionAbierta ? "success.main" : "error.main"}
              >
                {liquidacion?.estado_contable || "Sin estado"}
              </Typography>
            </Box>
            {/* PRECIO POR LITRO */}

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Precio por litro
              </Typography>

              {liquidacionAbierta ? (
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Precio"
                    type="number"
                    size="small"
                    value={precioLitro}
                    onChange={(e) => setPrecioLitro(e.target.value)}
                    inputProps={{
                      min: 1,
                      step: 1,
                    }}
                  />

                  <Button variant="contained" onClick={handleGuardarPrecio}>
                    Guardar
                  </Button>
                </Box>
              ) : (
                <Typography variant="h6" fontWeight="bold">
                  {Number(
                    liquidacion?.precio_unitario_litro ?? 0,
                  ).toLocaleString("es-CO")}
                </Typography>
              )}
            </Box>
            <Divider sx={{ mb: 3 }} />

            {/* AQUÍ IRÁ LA TABLA DE LECHE */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6">Registro de leche</Typography>

              <TablaLeche
                leches={detalle?.leches || []}
                liquidacionAbierta={liquidacionAbierta}
                onAgregar={handleAgregarLeche}
                onEditar={handleEditarLeche}
              />
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* AQUÍ IRÁN LOS PEDIDOS */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Pedidos / Deducciones
              </Typography>

              <ToolbarPedidos
                totalPedidos={detalle?.pedidos?.length || 0}
                estadoLiquidacion={liquidacion?.estado_contable}
                onNuevoPedido={handleNuevoPedido}
              />

              <Box sx={{ mt: 2 }}>
                <TablaPedidos
                  pedidos={detalle?.pedidos || []}
                  loading={false}
                  columns={drawerPedidoColumns({
                    estadoLiquidacion: liquidacion?.estado_contable,
                    onEditar: handleEditarPedido,
                    onEliminar: handleEliminarPedido,
                  })}
                />
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* AQUÍ IRÁ EL RESUMEN */}
            <Box>
              <ResumenContable liquidacion={liquidacion} />
            </Box>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                disabled={generandoFactura}
                onClick={handleGenerarFactura}
                startIcon={
                  generandoFactura ? <CircularProgress size={18} /> : null
                }
              >
                {generandoFactura ? "Generando..." : "Generar factura"}
              </Button>
            </Box>
          </>
        )}
      </Box>
      <LecheModal
        open={lecheModalOpen}
        onClose={handleCerrarLecheModal}
        lecheSeleccionada={lecheSeleccionada}
        quinId={liquidacion?.quin_id}
        onGuardar={handleGuardarLeche}
        mostrarError={mostrarError}
      />
      <PedidoModal
        open={pedidoModalOpen}
        onClose={handleCerrarPedidoModal}
        modo={modoPedido}
        pedido={pedidoSeleccionado}
        quinId={liquidacion?.quin_id}
        onSuccess={async () => {
          await refrescarDetalle();
          await onActualizarDashboard();
        }}
        mostrarSuccess={mostrarSuccess}
        mostrarError={mostrarError}
      />
      <ConfirmDialog
        open={confirmEliminarOpen}
        onClose={handleCerrarConfirmacion}
        onConfirm={handleConfirmarEliminarPedido}
        titulo="Eliminar pedido"
        mensaje={`¿Está seguro de eliminar el pedido "${
          pedidoEliminar?.ped_descripcion ?? ""
        }"?`}
        textoConfirmar="Eliminar"
      />
      <ConfirmDialog
        open={confirmFacturaOpen}
        onClose={handleCerrarConfirmFactura}
        onConfirm={handleConfirmarFactura}
        titulo="Generar factura"
        mensaje="Esta acción cerrará la liquidación y 
    generará la factura en PDF. Después solo podrá reimprimirse. 
    ¿Desea continuar?"
        textoConfirmar="Generar factura"
      />
      <AppSnackbar snackbar={snackbar} onClose={cerrarSnackbar} />
    </Drawer>
  );
};

export default DrawerLiquidacion;
