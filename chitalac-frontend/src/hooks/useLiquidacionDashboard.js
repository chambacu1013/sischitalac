import { useEffect, useState } from "react";
import {
  obtenerPeriodos,
  obtenerResumenPeriodo,
  obtenerLiquidacionesPeriodo,
  obtenerDetalleLiquidacion,
} from "../services/liquidacionDashboardService";
const useLiquidacionDashboard = () => {
  // ==========================
  // Estados
  // ==========================
  const [periodos, setPeriodos] = useState([]);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("");
  const [resumen, setResumen] = useState(null);
  const [liquidaciones, setLiquidaciones] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // ==========================
  // Cargar períodos
  // ==========================

  const cargarPeriodos = async () => {
    try {
      setLoading(true);
      const response = await obtenerPeriodos();

      if (response.ok) {
        setPeriodos(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Cargar resumen
  // ==========================

  const cargarResumen = async (periodoId) => {
    try {
      const response = await obtenerResumenPeriodo(periodoId);
      if (response.ok) {
        setResumen(response.data[0] || null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  // Cargar tabla
  // ==========================

  const cargarLiquidaciones = async (periodoId) => {
    try {
      const response = await obtenerLiquidacionesPeriodo(periodoId);

      if (response.ok) {
        setLiquidaciones(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // ==========================
  // Refrescar Dashboard
  // ==========================

  const refrescarDashboard = async () => {
    if (!periodoSeleccionado) return;

    try {
      setLoading(true);

      await Promise.all([
        cargarResumen(periodoSeleccionado),
        cargarLiquidaciones(periodoSeleccionado),
      ]);
    } catch (error) {
      console.error("Error al refrescar el dashboard:", error);
    } finally {
      setLoading(false);
    }
  };
  // ==========================
  // Cargar Drawer
  // ==========================

  const cargarDetalle = async (quinId) => {
    try {
      const response = await obtenerDetalleLiquidacion(quinId);

      if (response.ok) {
        setDetalle(response.data);
        setDrawerOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  // Cerrar Drawer
  // ==========================

  const cerrarDrawer = () => {
    setDrawerOpen(false);
    setDetalle(null);
  };

  // ==========================
  // Primera carga
  // ==========================

  useEffect(() => {
    cargarPeriodos();
  }, []);
  useEffect(() => {
    if (!periodoSeleccionado) return;

    cargarResumen(periodoSeleccionado);
    cargarLiquidaciones(periodoSeleccionado);
  }, [periodoSeleccionado]);
  return {
    loading,

    periodos,
    periodoSeleccionado,
    setPeriodoSeleccionado,

    resumen,
    liquidaciones,

    detalle,

    drawerOpen,

    cargarResumen,

    cargarLiquidaciones,
    refrescarDashboard,
    cargarDetalle,

    cerrarDrawer,
  };
};

export default useLiquidacionDashboard;
