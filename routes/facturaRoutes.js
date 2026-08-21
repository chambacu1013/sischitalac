const router = require("express").Router();

const { generarPDF } = require("../controllers/facturaController");

router.get("/:quin_id/pdf", generarPDF);

module.exports = router;
