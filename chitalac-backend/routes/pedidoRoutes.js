const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");
const {
  verificarToken,
  verificarRol,
} = require("../middlewares/authMiddleware");

// Registrar un encargo (Solo Admin)
router.post(
  "/",
  verificarToken,
  verificarRol(["ADMINISTRADOR"]),
  pedidoController.agregarPedido,
);

// Ver los encargos de una quincena (Admin y Asesor)
router.get(
  "/quincena/:quin_id",
  verificarToken,
  verificarRol(["ADMINISTRADOR", "ASESOR"]),
  pedidoController.listarPedidosQuincena,
);

router.get(
  "/quincena/:quin_id/proveedor/:prov_id",

  verificarToken,

  verificarRol(["ADMINISTRADOR", "ASESOR"]),

  pedidoController.listarPedidosProveedor,
);
router.put(
  "/:ped_id",
  verificarToken,
  verificarRol(["ADMINISTRADOR"]),
  pedidoController.editarPedido,
);
// Eliminar un encargo (Solo Admin)
router.delete(
  "/:ped_id",
  verificarToken,
  verificarRol(["ADMINISTRADOR"]),
  pedidoController.eliminarPedido,
);

module.exports = router;
