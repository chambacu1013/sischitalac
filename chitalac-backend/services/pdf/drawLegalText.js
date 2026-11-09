const layout = require("./config/pdfLayout");
const FONTS = require("./config/pdfFonts");
const { LEGAL_TEXT } = require("./config/pdfConstants");

function drawLegalText(doc) {
  doc

    .font("Helvetica")

    .fontSize(FONTS.LEGAL)

    .text(
      LEGAL_TEXT.trim(),

      layout.legal.x,

      layout.legal.y,

      {
        width: layout.legal.width,

        align: "center",
      },
    );
}

module.exports = drawLegalText;
