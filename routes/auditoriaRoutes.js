const express = require("express");
const router = express.Router();
const auditoriaController = require("../controllers/auditoriaController");
const {
  verificarToken,
  verificarRol,
} = require("../middlewares/authMiddleware");

// Auditoría y exportación: acceso exclusivo del asesor.
router.use(verificarToken, verificarRol(["ASESOR"]));
router.get("/", auditoriaController.obtenerAuditorias);
router.get("/usuarios", auditoriaController.obtenerUsuariosAuditoria);
router.get("/proveedores", auditoriaController.obtenerProveedoresAuditoria);
router.get("/exportar", auditoriaController.exportarAuditoriasExcel);
router.get("/:id", auditoriaController.obtenerAuditoriaPorId);
module.exports = router;
