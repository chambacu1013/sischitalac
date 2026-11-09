const express = require("express");
const router = express.Router();
const controller = require("../controllers/reporteFinancieroController");
const {
  verificarToken,
  verificarRol,
} = require("../middlewares/authMiddleware");

// Reportes y seguimiento de saldos: acceso del asesor.
router.use(verificarToken, verificarRol(["ASESOR"]));
router.get("/", controller.obtenerReporteFinanciero);
router.get("/excel", controller.descargarExcel);
router.put("/cancelar/:prov_id", controller.marcarSaldoCancelado);
module.exports = router;
