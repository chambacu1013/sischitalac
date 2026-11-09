const router = require("express").Router();
const { generarPDF } = require("../controllers/facturaController");
const {
  verificarToken,
  verificarRol,
} = require("../middlewares/authMiddleware");

// La emisión del documento equivalente corresponde al administrador.
router.get(
  "/:quin_id/pdf",
  verificarToken,
  verificarRol(["ADMINISTRADOR"]),
  generarPDF,
);
module.exports = router;
