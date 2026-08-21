const express = require("express");
const router = express.Router();

const controller = require("../controllers/reporteFinancieroController");

// Obtener reporte
router.get("/", controller.obtenerReporteFinanciero);
router.get("/excel", controller.descargarExcel);
// Marcar saldo cancelado
router.put("/cancelar/:prov_id", controller.marcarSaldoCancelado);

module.exports = router;
