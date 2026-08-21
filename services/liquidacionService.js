const liquidacionModel = require("../models/liquidacionModel");
const carteraService = require("./carteraService");
const { obtenerPeriodoQuincenal } = require("../utils/quincenaHelper");
const pedidoModel = require("../models/pedidoModel");

const { calcularSaldoFinal } = require("../utils/calculosLiquidacion");

async function obtenerOCrearLiquidacion(prov_id, fecha) {
  const { quin_inicio, quin_fin } = obtenerPeriodoQuincenal(fecha);

  let liquidacion = await liquidacionModel.findLiquidacionAbierta(
    prov_id,
    fecha,
  );

  if (!liquidacion) {
    // Buscar la última liquidación anterior del proveedor
    const liquidacionAnterior =
      await liquidacionModel.obtenerUltimaLiquidacionAnterior(
        prov_id,
        quin_inicio,
      );

    let saldoPendiente = 0;

    if (liquidacionAnterior) {
      const saldoAnterior = Number(liquidacionAnterior.saldo_neto_final || 0);

      // Si la liquidación anterior terminó debiendo,
      // ese es el saldo que debe heredar la nueva quincena.
      if (saldoAnterior < 0) {
        saldoPendiente = Math.abs(saldoAnterior);
      }
    }

    console.log("DEBUG NUEVA LIQUIDACIÓN:");
    console.log("PROVEEDOR:", prov_id);
    console.log("PERÍODO:", quin_inicio, "→", quin_fin);
    console.log(
      "LIQUIDACIÓN ANTERIOR:",
      liquidacionAnterior?.quin_id || "NINGUNA",
    );
    console.log("SALDO ANTERIOR:", saldoPendiente);

    const nueva = await liquidacionModel.createLiquidacion(
      prov_id,
      quin_inicio,
      quin_fin,
      saldoPendiente,
    );

    liquidacion = await liquidacionModel.findById(nueva.quin_id);

    console.log(`Liquidación creada automáticamente (${liquidacion.quin_id})`);

    console.log(`Saldo pendiente heredado: $${saldoPendiente}`);
  }

  return liquidacion;
}
async function recalcularLiquidacion(quin_id) {
  // 1. Obtener información general

  const liquidacion = await liquidacionModel.findById(quin_id);

  if (!liquidacion) {
    throw new Error("La liquidación no existe");
  }

  // 2. Total litros

  const totalLitros = await liquidacionModel.obtenerTotalLitros(quin_id);

  // 3. Valor leche

  const valorLeche = totalLitros * Number(liquidacion.precio_unitario_litro);

  // 4. Total pedidos

  const totalPedidos = await pedidoModel.obtenerTotalPedidos(quin_id);

  // 5. Saldo final

  const saldoFinal = calcularSaldoFinal({
    valorLeche,

    descuentos: totalPedidos,

    saldoAnterior: liquidacion.saldo_pendiente_antiguo,
  });

  // 6. Actualizar BD

  await liquidacionModel.actualizarTotales({
    quin_id,

    totalLitros,

    valorLeche,

    totalPedidos,

    saldoFinal,
  });
}
/**
 * =====================================================
 * GENERAR CARTERA DESDE UNA LIQUIDACIÓN
 *
 * Si la liquidación termina con saldo negativo,
 * se registra la deuda del proveedor.
 * =====================================================
 */
async function generarCarteraDesdeLiquidacion(quin_id) {
  const liquidacion = await liquidacionModel.obtenerDatosParaCartera(quin_id);

  if (!liquidacion) {
    throw new Error("La liquidación no existe");
  }

  return await carteraService.generarCarteraDesdeLiquidacion({
    prov_id: liquidacion.prov_id,
    quin_id: liquidacion.quin_id,
    saldo_neto_final: liquidacion.saldo_neto_final,
  });
}
async function abrirLiquidacion(quin_id) {
  await liquidacionModel.cambiarEstado(
    quin_id,

    "ABIERTA",
  );
}
async function cerrarLiquidacion(quin_id) {
  // 1. Asegurar que los valores contables estén actualizados
  await recalcularLiquidacion(quin_id);

  // 2. Generar cartera si existe saldo negativo
  const cartera = await generarCarteraDesdeLiquidacion(quin_id);

  // 3. Cerrar la liquidación
  await liquidacionModel.cambiarEstado(quin_id, "LIQUIDADA");

  return {
    mensaje: "Liquidación cerrada correctamente",
    cartera,
  };
}
async function actualizarPrecioLitro(
  quin_id,

  precio,
) {
  await liquidacionModel.actualizarPrecio(
    quin_id,

    precio,
  );

  await recalcularLiquidacion(quin_id);
} /*
async function cerrarSiFinalizo(quin_id){
    const liquidacion =
        await liquidacionModel.findById(quin_id);
    if(
        new Date(liquidacion.quin_fecha_fin)
        <
        new Date()
    ){
        await cerrarLiquidacion(
            quin_id
        );
    }
}*/
async function validarLiquidacionAbierta(quin_id) {
  const estado = await liquidacionModel.obtenerEstado(quin_id);

  if (!estado) {
    throw new Error("La liquidación no existe");
  }

  if (estado.estado_contable !== "ABIERTA") {
    throw new Error("La liquidación está cerrada y no admite modificaciones.");
  }
}
async function obtenerQuincenas() {
  const quincenas = await liquidacionModel.obtenerQuincenas();

  return quincenas;
}
async function obtenerProveedoresPorQuincena(quin_id) {
  return await liquidacionModel.obtenerProveedoresPorQuincena(quin_id);
}
async function obtenerResumenQuincena(quin_id) {
  return await liquidacionModel.obtenerResumenQuincena(quin_id);
}
async function obtenerFactura(quin_id) {
  return await liquidacionModel.obtenerFacturaCompleta(quin_id);
}
module.exports = {
  obtenerQuincenas,
  obtenerProveedoresPorQuincena,
  obtenerOCrearLiquidacion,
  validarLiquidacionAbierta,
  recalcularLiquidacion,
  actualizarPrecioLitro,
  generarCarteraDesdeLiquidacion,
  abrirLiquidacion,
  cerrarLiquidacion,
  obtenerFactura,
};
