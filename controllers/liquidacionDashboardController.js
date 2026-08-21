const liquidacionDashboardService = require("../services/liquidacionDashboardService");

/**
 * Obtiene los períodos (quincenas) disponibles
 * para el Dashboard de Liquidación.
 */
const obtenerPeriodos = async (req, res) => {
  try {
    const periodos = await liquidacionDashboardService.obtenerPeriodos();

    return res.status(200).json({
      ok: true,
      mensaje: "Períodos obtenidos correctamente.",
      data: periodos,
    });
  } catch (error) {
    console.error(
      "ERROR liquidacionDashboardController.obtenerPeriodos:",
      error,
    );

    return res.status(500).json({
      ok: false,
      mensaje: "Error al obtener los períodos.",
      error: error.message,
    });
  }
};
/**
 * Obtiene el resumen general de un período.
 */
const obtenerResumenPeriodo = async (req, res) => {
  try {
    const { periodo_id } = req.params;

    const resumen =
      await liquidacionDashboardService.obtenerResumenPeriodo(periodo_id);

    return res.status(200).json({
      ok: true,
      mensaje: "Resumen del período obtenido correctamente.",
      data: resumen,
    });
  } catch (error) {
    console.error(
      "ERROR liquidacionDashboardController.obtenerResumenPeriodo:",
      error,
    );

    // Si el período no existe
    if (error.message === "No se encontró el período solicitado.") {
      return res.status(404).json({
        ok: false,
        mensaje: error.message,
      });
    }

    return res.status(500).json({
      ok: false,
      mensaje: "Error al obtener el resumen del período.",
      error: error.message,
    });
  }
};
/**
 * Obtiene todas las liquidaciones de un período.
 */
const obtenerLiquidacionesPeriodo = async (req, res) => {
  try {
    const { periodo_id } = req.params;

    const liquidaciones =
      await liquidacionDashboardService.obtenerLiquidacionesPeriodo(periodo_id);

    return res.status(200).json({
      ok: true,
      mensaje: "Liquidaciones del período obtenidas correctamente.",
      data: liquidaciones,
    });
  } catch (error) {
    console.error(
      "ERROR liquidacionDashboardController.obtenerLiquidacionesPeriodo:",
      error,
    );

    if (error.message === "No se encontró el período solicitado.") {
      return res.status(404).json({
        ok: false,
        mensaje: error.message,
      });
    }

    return res.status(500).json({
      ok: false,
      mensaje: "Error al obtener las liquidaciones del período.",
      error: error.message,
    });
  }
};
/**
 * Obtiene el detalle completo de una liquidación.
 */
const obtenerDetalleLiquidacion = async (req, res) => {
  try {
    const { quin_id } = req.params;

    const detalle =
      await liquidacionDashboardService.obtenerDetalleLiquidacion(quin_id);

    return res.status(200).json({
      ok: true,
      mensaje: "Detalle de la liquidación obtenido correctamente.",
      data: detalle,
    });
  } catch (error) {
    console.error(
      "ERROR liquidacionDashboardController.obtenerDetalleLiquidacion:",
      error,
    );

    if (error.message === "No se encontró la liquidación solicitada.") {
      return res.status(404).json({
        ok: false,
        mensaje: error.message,
      });
    }

    return res.status(500).json({
      ok: false,
      mensaje: "Error al obtener el detalle de la liquidación.",
      error: error.message,
    });
  }
};
/**
 * Actualizar precio por litro.
 */
const actualizarPrecioLitro = async (req, res) => {
  try {
    const { quin_id } = req.params;

    const { precio_unitario_litro } = req.body;

    const detalle = await liquidacionDashboardService.actualizarPrecioLitro(
      quin_id,
      precio_unitario_litro,
    );

    return res.status(200).json({
      ok: true,
      mensaje: "Precio por litro actualizado correctamente.",
      data: detalle,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "No se encontró la liquidación solicitada.") {
      return res.status(404).json({
        ok: false,
        mensaje: error.message,
      });
    }

    return res.status(400).json({
      ok: false,
      mensaje: error.message,
    });
  }
};
module.exports = {
  obtenerPeriodos,
  obtenerResumenPeriodo,
  obtenerLiquidacionesPeriodo,
  obtenerDetalleLiquidacion,
  actualizarPrecioLitro,
};
