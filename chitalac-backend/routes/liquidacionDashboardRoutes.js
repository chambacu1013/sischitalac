const express = require("express");
const router = express.Router();

const liquidacionDashboardController = require("../controllers/liquidacionDashboardController");

/**
 * ============================================================
 * DASHBOARD DE LIQUIDACIONES
 * ============================================================
 */

/**
 * Obtener períodos (quincenas)
 * GET /api/liquidacion-dashboard/periodos
 */
router.get("/periodos", liquidacionDashboardController.obtenerPeriodos);
router.get(
  "/periodos/:periodo_id/resumen",
  liquidacionDashboardController.obtenerResumenPeriodo,
);
router.get(
  "/periodos/:periodo_id/liquidaciones",
  liquidacionDashboardController.obtenerLiquidacionesPeriodo,
);
//Drawer
router.get(
  "/liquidaciones/:quin_id",
  liquidacionDashboardController.obtenerDetalleLiquidacion,
);
router.put(
  "/liquidaciones/:quin_id/precio",
  liquidacionDashboardController.actualizarPrecioLitro,
);
module.exports = router;
