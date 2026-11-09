const layout = require("./config/pdfLayout");
const FONTS = require("./config/pdfFonts");

function drawMilkTable(doc, factura) {
  const milk = factura.leches;
  const first = layout.milkTable.firstColumn;
  const second = layout.milkTable.secondColumn;
  const rowHeight = layout.milkTable.rowHeight;
  drawHeader(doc, first);
  drawHeader(doc, second);
  milk.forEach((item, index) => {
    const column = index < 8 ? first : second;
    const row = index < 8 ? index + 1 : index - 7;
    const y = column.y + rowHeight * row;
    drawRow(doc, column, y, item);
  });
}
function drawHeader(doc, column) {
  doc

    .font("Helvetica-Bold")

    .fontSize(9)

    .text("Día", column.x + 8, column.y + 5);

  doc.text("Leche", column.x + 34, column.y + 5);
}
function drawRow(doc, column, y, leche) {
  doc

    .font("Helvetica")

    .fontSize(8)

    .text(
      leche.dia,

      column.x + 10,

      y + 5,
    );

  doc.text(
    leche.litros,

    column.x + 38,

    y + 5,
  );
}
module.exports = drawMilkTable;
