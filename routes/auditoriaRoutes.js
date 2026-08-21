const express = require("express");
const router = express.Router();

const auditoriaController = require("../controllers/auditoriaController");

/*=====================================================
CONSULTAS
=====================================================*/

// Listado de auditorías (con filtros opcionales)
router.get("/", auditoriaController.obtenerAuditorias);

// Combos de filtros
router.get("/usuarios", auditoriaController.obtenerUsuariosAuditoria);

router.get("/proveedores", auditoriaController.obtenerProveedoresAuditoria);

// Exportar Excel
router.get("/exportar", auditoriaController.exportarAuditoriasExcel);

// Detalle de una auditoría
router.get("/:id", auditoriaController.obtenerAuditoriaPorId);

module.exports = router;
