function drawBox(doc, x, y, w, h) {
  doc.rect(x, y, w, h).stroke();
}

function drawText(doc, text, x, y, options = {}) {
  doc.text(text, x, y, options);
}

function drawLine(doc, x1, y1, x2, y2) {
  doc.moveTo(x1, y1).lineTo(x2, y2).stroke();
}
/**
 * Celda tradicional
 */
function drawTableCell(
  doc,
  {
    x,
    y,
    width,
    height,

    text,

    align = "center",

    bold = false,
  },
) {
  doc.rect(x, y, width, height).stroke();

  doc
    .font(bold ? "Helvetica-Bold" : "Helvetica")
    .fontSize(8)
    .text(text, x, y + 5, {
      width,
      align,
    });
}
/**
 * Fila tipo:
 *
 * TOTAL LECHE             $2.350.000
 */
function drawSummaryRow(
  doc,
  {
    x,
    y,
    width,
    height,

    label,

    value,

    highlight = false,
  },
) {
  doc
    .lineWidth(highlight ? 1.8 : 1)
    .rect(x, y, width, height)
    .stroke();

  /*
   * Etiqueta
   */

  doc
    .font(highlight ? "Helvetica-Bold" : "Helvetica")
    .fontSize(highlight ? 9 : 8)
    .text(
      label,

      x + 6,

      y + 5,

      {
        width: width * 0.6,
        align: "left",
      },
    );

  /*
   * Valor
   */

  doc
    .font(highlight ? "Helvetica-Bold" : "Helvetica")
    .fontSize(highlight ? 9 : 8)
    .text(
      value,

      x,

      y + 5,

      {
        width: width - 6,
        align: "right",
      },
    );

  // Restaurar grosor
  doc.lineWidth(1);
}
module.exports = {
  drawBox,
  drawText,
  drawLine,
  drawTableCell,
  drawSummaryRow,
};
