const express = require("express");
const router = express.Router();

const liquidacionController = require("../controllers/liquidacionController");

const {
  verificarToken,
  verificarRol,
} = require("../middlewares/authMiddleware");

// ======================================================
// CONSULTAS
// ======================================================

// Obtener todas las quincenas
router.get(
  "/",
  verificarToken,
  verificarRol(["ADMINISTRADOR", "ASESOR"]),
  liquidacionController.obtenerQuincenas,
);

// Obtener los proveedores pertenecientes a una quincena
router.get(
  "/:quin_id/proveedores",
  verificarToken,
  verificarRol(["ADMINISTRADOR", "ASESOR"]),
  liquidacionController.obtenerProveedoresPorQuincena,
);

module.exports = router;
