const pedidoService = require("../services/pedidoService");

const { success, error } = require("../utils/responseHelper");

/**
 * Registrar un nuevo pedido
 */
const agregarPedido = async (req, res) => {
  try {
    const resultado = await pedidoService.registrarPedido(req.body);

    return success(
      res,
      resultado.mensaje,
      {
        id_pedido: resultado.id_pedido,
        quincena_id: resultado.quincena_id,
        subtotal: resultado.subtotal,
      },
      201,
    );
  } catch (err) {
    console.error("Error al registrar pedido:", err);

    return error(res, "Error al registrar pedido", err.message, 500);
  }
};

/**
 * Obtener todos los pedidos de una liquidación
 */
const listarPedidosQuincena = async (req, res) => {
  try {
    const { quin_id } = req.params;

    const pedidos = await pedidoService.listarPedidos(quin_id);

    return success(res, "Pedidos obtenidos correctamente", {
      data: pedidos,
    });
  } catch (err) {
    console.error("Error al listar pedidos:", err);

    return error(res, "Error al listar pedidos", err.message, 500);
  }
};

//editar pedido
const editarPedido = async (req, res) => {
  try {
    const resultado = await pedidoService.editarPedido(
      req.params.ped_id,
      req.body,
    );

    return success(res, resultado.mensaje);
  } catch (err) {
    console.error("Error al editar pedido:", err);

    return error(res, "Error al editar pedido", err.message, 500);
  }
};

const eliminarPedido = async (req, res) => {
  try {
    const resultado = await pedidoService.eliminarPedido(req.params.ped_id);

    return success(res, resultado.mensaje);
  } catch (err) {
    console.error("Error al eliminar pedido:", err);

    return error(res, "Error al eliminar pedido", err.message, 500);
  }
};
/**
 * Obtener pedidos de un proveedor dentro de una quincena
 */
const listarPedidosProveedor = async (req, res) => {
  try {
    const {
      quin_id,

      prov_id,
    } = req.params;

    const pedidos = await pedidoService.listarPedidosProveedor(
      quin_id,

      prov_id,
    );

    return success(
      res,

      "Pedidos obtenidos correctamente",

      {
        data: pedidos,
      },
    );
  } catch (err) {
    console.error(err);

    return error(
      res,

      "Error al obtener pedidos",

      err.message,

      500,
    );
  }
};
module.exports = {
  agregarPedido,
  listarPedidosQuincena,
  listarPedidosProveedor,
  editarPedido,
  eliminarPedido,
};
