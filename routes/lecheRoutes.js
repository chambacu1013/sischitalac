const express = require("express");

const router = express.Router();

const lecheController = require("../controllers/lecheController");

const {
  verificarToken,
  verificarRol,
} = require("../middlewares/authMiddleware");

/**
 * =====================================================
 * REGISTRAR ACOPIO DE LECHE
 *
 * OPERARIO:
 * Registro desde aplicación móvil.
 *
 * ADMINISTRADOR:
 * Registro desde el Drawer de liquidación.
 * =====================================================
 */
router.post(
  "/",
  verificarToken,
  verificarRol(["OPERARIO", "ADMINISTRADOR"]),
  lecheController.registrarAcopio,
);

/**
 * =====================================================
 * OBTENER DETALLE DE LECHE POR QUINCENA
 * =====================================================
 */
router.get(
  "/quincena/:quin_id",
  verificarToken,
  verificarRol(["ADMINISTRADOR", "ASESOR"]),
  lecheController.obtenerDetalleQuincena,
);

/**
 * =====================================================
 * EDITAR REGISTRO DE LECHE
 *
 * Solo se permite si la liquidación está ABIERTA.
 * La validación se realiza en lecheService.
 * =====================================================
 */
router.put(
  "/:lec_id",
  verificarToken,
  verificarRol(["OPERARIO", "ADMINISTRADOR"]),
  lecheController.editarAcopio,
);

module.exports = router;
