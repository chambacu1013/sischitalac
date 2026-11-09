const pedidoModel = require("../models/pedidoModel");

const liquidacionService = require("./liquidacionService");

const { obtenerPeriodoQuincenal } = require("../utils/quincenaHelper");

const { calcularSubtotalPedido } = require("../utils/calculosLiquidacion");

/**
 * Registrar un nuevo pedido o deducción
 */
async function registrarPedido(datos) {
  const { quin_id, fecha, descripcion, unidad, cantidad, valor_unitario } =
    datos;

  // Obtener el día de la fecha
  const { dia } = obtenerPeriodoQuincenal(fecha);

  // Calcular subtotal en el backend
  const subtotal = calcularSubtotalPedido(cantidad, valor_unitario);

  // Registrar pedido
  const nuevoPedido = await pedidoModel.create({
    quin_id,
    fecha,
    dia,
    descripcion,
    unidad,
    cantidad,
    valor_unitario,
    subtotal,
  });
  await liquidacionService.recalcularLiquidacion(quin_id);
  return {
    mensaje: "Pedido registrado correctamente",
    id_pedido: nuevoPedido.ped_id,
    quincena_id: quin_id,
    subtotal,
  };
}

/**
 * Listar pedidos de una liquidación
 */
async function listarPedidos(quin_id) {
  return await pedidoModel.findByQuincena(quin_id);
}

async function editarPedido(ped_id, datos) {
  const pedido = await pedidoModel.findById(ped_id);

  if (!pedido) {
    throw new Error("Pedido no encontrado");
  }

  await liquidacionService.validarLiquidacionAbierta(pedido.quin_id);

  const subtotal = calcularSubtotalPedido(datos.cantidad, datos.valor_unitario);

  await pedidoModel.update(ped_id, {
    ...datos,
    subtotal,
  });

  await liquidacionService.recalcularLiquidacion(pedido.quin_id);
  return {
    mensaje: "Pedido actualizado correctamente",
  };
}
/**
 * Eliminar pedido
 */
async function eliminarPedido(ped_id) {
  const pedido = await pedidoModel.findById(ped_id);

  if (!pedido) {
    throw new Error("Pedido no encontrado");
  }
  await liquidacionService.validarLiquidacionAbierta(pedido.quin_id);
  await pedidoModel.delete(ped_id);

  await liquidacionService.recalcularLiquidacion(pedido.quin_id);
  return {
    mensaje: "Pedido eliminado correctamente",

    quin_id: pedido.quin_id,
  };
}
/**
 * Listar pedidos de un proveedor en una quincena
 */
async function listarPedidosProveedor(quin_id, prov_id) {
  return await pedidoModel.findByProveedor(
    quin_id,

    prov_id,
  );
}
module.exports = {
  registrarPedido,
  editarPedido,
  listarPedidos,
  listarPedidosProveedor,
  eliminarPedido,
};
