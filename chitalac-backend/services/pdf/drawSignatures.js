const path = require("path");
const layout = require("./config/pdfLayout");
const FONTS = require("./config/pdfFonts");
const fs = require("fs");
function drawSignatures(doc) {
  const sign = layout.signatures;
  /*
   * Línea proveedor
   */

  doc
    .moveTo(sign.left.x, sign.y)
    .lineTo(sign.left.x + sign.lineWidth, sign.y)
    .stroke();

  /*
   * Línea empresa
   */

  doc
    .moveTo(sign.right.x, sign.y)
    .lineTo(sign.right.x + sign.lineWidth, sign.y)
    .stroke();

  /*
   * Firma empresa (opcional)
   */

  const firma = path.join(__dirname, "../../assets/firmaD.jpg");

  if (fs.existsSync(firma)) {
    doc.image(firma, sign.image.x, sign.image.y, {
      width: sign.image.width,
    });
  }
  /*
   * Texto proveedor
   */

  doc
    .font("Helvetica")
    .fontSize(FONTS.NORMAL)
    .text(
      sign.left.text,

      sign.left.x,

      sign.y + 6,

      {
        width: sign.lineWidth,

        align: "center",
      },
    );

  /*
   * Texto empresa
   */

  doc.text(
    sign.right.text,

    sign.right.x,

    sign.y + 6,

    {
      width: sign.lineWidth,

      align: "center",
    },
  );
}

module.exports = drawSignatures;
