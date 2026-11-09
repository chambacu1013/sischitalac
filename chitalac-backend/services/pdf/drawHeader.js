const path = require("path");

const layout = require("./config/pdfLayout");
const FONTS = require("./config/pdfFonts");

function drawHeader(doc, factura) {
  const logoPath = path.join(__dirname, "../../assets/logo.png");
  /*
   * LOGO
   */

  doc.image(logoPath, layout.logo.x, layout.logo.y, {
    width: layout.logo.width,
  });

  /*
   * TITULO
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(FONTS.HEADER)
    .text(
      "DOCUMENTO EQUIVALENTE A LA FACTURA",
      layout.titulo.x,
      layout.titulo.y,
      {
        width: 240,
        align: "center",
      },
    );

  /*
   * EMPRESA + FACTURA
   */

  doc
    .moveDown(0.8)
    .fontSize(FONTS.SUBTITLE)
    .text(`CHITALAC     No ${factura.numero}`, {
      width: 240,
      align: "center",
    });

  /*
   * NIT
   */

  doc.font("Helvetica").fontSize(FONTS.NORMAL).text("NIT. 1098665670-6", {
    width: 240,
    align: "center",
  });

  /*
   * DIRECCION
   */

  doc.text("Calle 2 No. 7-90 vía principal Chitagá", {
    width: 240,
    align: "center",
  });
}

module.exports = drawHeader;
