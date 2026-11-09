const carteraModel = require("../models/carteraModel");

/**
 * =====================================================
 * GENERAR CARTERA DESDE UNA LIQUIDACIÓN
 * =====================================================
 */
const generarCarteraDesdeLiquidacion = async ({
  prov_id,
  quin_id,
  saldo_neto_final,
}) => {
  const saldo = Number(saldo_neto_final || 0);

  // No existe deuda
  if (saldo >= 0) {
    return null;
  }

  const montoDeuda = Math.abs(saldo);

  return await carteraModel.crearCartera({
    prov_id,
    quin_origen_id: quin_id,
    car_monto: montoDeuda,
  });
};

/**
 * =====================================================
 * OBTENER SALDO PENDIENTE
 * =====================================================
 */
const obtenerSaldoPendiente = async (prov_id) => {
  return await carteraModel.obtenerSaldoPendiente(prov_id);
};

/**
 * =====================================================
 * CANCELAR SALDO
 * =====================================================
 */
const cancelarSaldo = async ({ prov_id, mes, anio }) => {
  if (!prov_id || !mes || !anio) {
    throw new Error("Proveedor, mes y año son requeridos.");
  }

  const cartera = await carteraModel.cancelarSaldo({
    prov_id,
    mes,
    anio,
  });

  if (!cartera) {
    throw new Error(
      "No existe un saldo pendiente para este proveedor en el período seleccionado.",
    );
  }

  return cartera;
};

module.exports = {
  generarCarteraDesdeLiquidacion,
  obtenerSaldoPendiente,
  cancelarSaldo,
};
