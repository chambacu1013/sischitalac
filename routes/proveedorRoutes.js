const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/proveedorController");
const {
  verificarToken,
  verificarRol,
} = require("../middlewares/authMiddleware");

// El operario necesita consultar esta lista para registrar la leche
router.get("/", verificarToken, proveedorController.getProveedores);

// Solo el admin debería poder crear nuevos campesinos en el sistema
router.post("/", verificarToken, proveedorController.createProveedor);

router.delete(
  "/:id",
  verificarToken,
  verificarRol(["ADMINISTRADOR"]),
  proveedorController.deleteProveedor,
);
router.put(
  "/:id",
  verificarToken,
  verificarRol(["ADMINISTRADOR"]),
  proveedorController.updateProveedor,
);
module.exports = router;
