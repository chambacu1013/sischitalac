import { Box, Typography, Paper } from "@mui/material";

import useLiquidacionDashboard from "../hooks/useLiquidacionDashboard";

import SelectorPeriodo from "../components/liquidacionDashboard/SelectorPeriodo";
import ResumenPeriodo from "../components/liquidacionDashboard/ResumenPeriodo";
import TablaLiquidaciones from "../components/liquidacionDashboard/TablaLiquidaciones";
import DrawerLiquidacion from "../components/liquidacionDashboard/DrawerLiquidacion";
const LiquidacionDashboard = () => {
  const {
    periodos,
    periodoSeleccionado,
    setPeriodoSeleccionado,
    resumen,
    liquidaciones,
    cargarDetalle,
    drawerOpen,
    detalle,
    refrescarDashboard,
    cerrarDrawer,
    loading,
  } = useLiquidacionDashboard();
  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Dashboard de Liquidaciones
      </Typography>

      <Paper sx={{ p: 2 }}>
        <SelectorPeriodo
          periodos={periodos}
          periodoSeleccionado={periodoSeleccionado}
          setPeriodoSeleccionado={setPeriodoSeleccionado}
        />
      </Paper>
      <Box mt={3}>
        <ResumenPeriodo resumen={resumen} />
      </Box>
      <Box mt={3}>
        <TablaLiquidaciones
          liquidaciones={liquidaciones}
          cargarDetalle={cargarDetalle}
          loading={loading}
        />
      </Box>
      <DrawerLiquidacion
        open={drawerOpen}
        onClose={cerrarDrawer}
        detalle={detalle}
        loading={false}
        onActualizarDetalle={cargarDetalle}
        onActualizarDashboard={refrescarDashboard}
      />
    </Box>
  );
};

export default LiquidacionDashboard;
