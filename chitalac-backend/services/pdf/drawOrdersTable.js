const layout = require("./config/pdfLayout");
const FONTS = require("./config/pdfFonts");
const { drawTableCell } = require("./pdfUtils");
function drawHeader(doc, table) {
  let y = table.y;

  drawTableCell(doc, {
    x: table.x,
    y,
    width: table.columns.dia,
    height: table.rowHeight,
    text: "Día",
    bold: true,
  });

  drawTableCell(doc, {
    x: table.x + table.columns.dia,
    y,
    width: table.columns.cantidad,
    height: table.rowHeight,
    text: "Cantidad",
    bold: true,
  });

  drawTableCell(doc, {
    x: table.x + table.columns.dia + table.columns.cantidad,
    y,
    width: table.columns.descripcion,
    height: table.rowHeight,
    text: "Pedido",
    bold: true,
  });

  drawTableCell(doc, {
    x:
      table.x +
      table.columns.dia +
      table.columns.cantidad +
      table.columns.descripcion,
    y,
    width: table.columns.valor,
    height: table.rowHeight,
    text: "Valor",
    bold: true,
  });
}

function drawRow(doc, table, pedido, y) {
  drawTableCell(doc, {
    x: table.x,
    y,
    width: table.columns.dia,
    height: table.rowHeight,
    text: String(pedido.dia),
  });

  drawTableCell(doc, {
    x: table.x + table.columns.dia,
    y,
    width: table.columns.cantidad,
    height: table.rowHeight,
    text: `${pedido.cantidad} ${pedido.unidad}`,
  });

  drawTableCell(doc, {
    x: table.x + table.columns.dia + table.columns.cantidad,
    y,
    width: table.columns.descripcion,
    height: table.rowHeight,
    text: pedido.descripcion,
    align: "center",
  });

  drawTableCell(doc, {
    x:
      table.x +
      table.columns.dia +
      table.columns.cantidad +
      table.columns.descripcion,
    y,
    width: table.columns.valor,
    height: table.rowHeight,
    text: `$ ${pedido.subtotal.toLocaleString("es-CO")}`,
  });
}
function drawOrdersTable(doc, factura) {
  const table = layout.ordersTable;
  /*
    -------------------------------------
    Primera página
    -------------------------------------
    */
  drawHeader(doc, table);
  let y = table.y + table.rowHeight;
  const primeraPagina = factura.pedidos.slice(0, table.maxRowsFirstPage);
  const restantes = factura.pedidos.slice(table.maxRowsFirstPage);
  primeraPagina.forEach((pedido) => {
    drawRow(doc, table, pedido, y);
    y += table.rowHeight;
  });
  /*
    -------------------------------------
    Total pedidos
    -------------------------------------
    */
  drawTableCell(doc, {
    x: table.x,
    y,
    width:
      table.columns.dia + table.columns.cantidad + table.columns.descripcion,
    height: table.footerHeight,
    text: "TOTAL PEDIDOS",
    bold: true,
  });
  drawTableCell(doc, {
    x:
      table.x +
      table.columns.dia +
      table.columns.cantidad +
      table.columns.descripcion,
    y,
    width: table.columns.valor,
    height: table.footerHeight,
    text: `$ ${factura.liquidacion.totalPedidos.toLocaleString("es-CO")}`,
    bold: true,
  });
  /*
    -------------------------------------
    ¿Hay segunda página?
    -------------------------------------
    */
  if (restantes.length === 0) {
    return;
  }
  doc.addPage();
  /*
    -------------------------------------
    Título
    -------------------------------------
    */
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(
      layout.ordersTable.overflow.title,
      layout.ordersTable.overflow.x,
      layout.ordersTable.overflow.y,
      {
        width: layout.ordersTable.overflow.w,
        align: "center",
      },
    );
  /*
    -------------------------------------
    Tabla página 2
    -------------------------------------
    */
  const overflowTable = {
    ...table,
    x: layout.ordersTable.overflow.x,
    y: layout.ordersTable.overflow.y + 25,
  };
  drawHeader(doc, overflowTable);
  y = overflowTable.y + overflowTable.rowHeight;
  restantes.forEach((pedido) => {
    drawRow(doc, overflowTable, pedido, y);
    y += overflowTable.rowHeight;
  });
}
module.exports = drawOrdersTable;
