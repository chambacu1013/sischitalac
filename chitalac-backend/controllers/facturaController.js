const facturaService = require("../services/facturaService");

const generarPDF = async (req, res) => {
  try {
    const { quin_id } = req.params;

    const pdf = await facturaService.generarFactura(quin_id);

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `inline; filename=factura_${quin_id}.pdf`,
    );

    pdf.pipe(res);
  } catch (error) {
    console.error("ERROR GENERANDO FACTURA PDF:", error);
    console.error("quin_id:", req.params.quin_id);
    console.error("Stack:", error.stack);
    res.status(500).json({
      ok: false,

      mensaje: error.message,
    });
  }
};

module.exports = {
  generarPDF,
};
