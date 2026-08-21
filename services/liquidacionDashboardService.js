const liquidacionDashboardModel = require("../models/liquidacionDashboardModel");
const liquidacionService = require("./liquidacionService");
/**
 * Obtiene los períodos (quincenas) disponibles
 * para el Dashboard de Liquidación.
 */
async function obtenerPeriodos() {
  try {
    return await liquidacionDashboardModel.obtenerPeriodos();
  } catch (error) {
    console.error("ERROR liquidacionDashboardService.obtenerPeriodos:", error);
    throw error;
  }
}

/**
 * Obtiene el resumen general de un período.
 * @param {number} periodo_id
 */
async function obtenerResumenPeriodo(periodo_id) {
  try {
    const resumen =
      await liquidacionDashboardModel.obtenerResumenPeriodo(periodo_id);

    if (!resumen) {
      throw new Error("No se encontró el período solicitado.");
    }

    return resumen;
  } catch (error) {
    console.error(
      "ERROR liquidacionDashboardService.obtenerResumenPeriodo:",
      error,
    );
    throw error;
  }
}
/**
 * Obtiene todas las liquidaciones de un período.
 * @param {number} periodo_id
 */
async function obtenerLiquidacionesPeriodo(periodo_id) {
  try {
    const liquidaciones =
      await liquidacionDashboardModel.obtenerLiquidacionesPeriodo(periodo_id);

    if (!liquidaciones) {
      throw new Error("No se encontró el período solicitado.");
    }

    return liquidaciones;
  } catch (error) {
    console.error(
      "ERROR liquidacionDashboardService.obtenerLiquidacionesPeriodo:",
      error,
    );
    throw error;
  }
}
/**
 * Obtiene el detalle completo de una liquidación.
 * @param {number} quin_id
 */
const obtenerDetalleLiquidacion = async (quin_id) => {
  try {
    const detalle =
      await liquidacionDashboardModel.obtenerDetalleLiquidacion(quin_id);

    if (!detalle || !detalle.liquidacion) {
      throw new Error("No se encontró la liquidación solicitada.");
    }

    return detalle;
  } catch (error) {
    console.error(
      "ERROR liquidacionDashboardService.obtenerDetalleLiquidacion:",
      error,
    );
    throw error;
  }
};
/**
 * Actualiza el precio por litro
 * y recalcula toda la liquidación.
 */
const actualizarPrecioLitro = async (quin_id, precio_unitario_litro) => {
  if (!precio_unitario_litro || Number(precio_unitario_litro) <= 0) {
    throw new Error("El precio por litro debe ser mayor a cero.");
  }

  const detalle =
    await liquidacionDashboardModel.obtenerDetalleLiquidacion(quin_id);

  if (!detalle || !detalle.liquidacion) {
    throw new Error("No se encontró la liquidación solicitada.");
  }

  await liquidacionService.validarLiquidacionAbierta(quin_id);

  await liquidacionDashboardModel.actualizarPrecioLitro(
    quin_id,
    precio_unitario_litro,
  );

  await liquidacionService.recalcularLiquidacion(quin_id);

  return await liquidacionDashboardModel.obtenerDetalleLiquidacion(quin_id);
};
module.exports = {
  obtenerPeriodos,
  obtenerResumenPeriodo,
  obtenerLiquidacionesPeriodo,
  obtenerDetalleLiquidacion,
  actualizarPrecioLitro,
};
