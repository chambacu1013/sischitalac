const layout = require("./config/pdfLayout");

const { drawSummaryRow } = require("./pdfUtils");

function money(value) {
  return `$ ${Number(value).toLocaleString("es-CO")}`;
}

function drawSummary(doc, factura) {
  const l = factura.liquidacion;

  const summary = layout.summary;

  let y = summary.y;

  drawSummaryRow(doc, {
    x: summary.x,
    y,
    width: summary.w,
    height: summary.rowHeight,

    label: "TOTAL LITROS",

    value: `${l.totalLitros} Lt`,
  });

  y += summary.rowHeight;

  drawSummaryRow(doc, {
    x: summary.x,
    y,
    width: summary.w,
    height: summary.rowHeight,

    label: "PRECIO/LITRO",

    value: money(l.precioLitro),
  });

  y += summary.rowHeight;

  drawSummaryRow(doc, {
    x: summary.x,
    y,
    width: summary.w,
    height: summary.rowHeight,

    label: "TOTAL LECHE",

    value: money(l.valorLeche),
  });

  y += summary.rowHeight;

  drawSummaryRow(doc, {
    x: summary.x,
    y,
    width: summary.w,
    height: summary.rowHeight,

    label: "TOTAL PEDIDOS",

    value: money(l.totalPedidos),
  });

  y += summary.rowHeight;

  drawSummaryRow(doc, {
    x: summary.x,
    y,
    width: summary.w,
    height: summary.rowHeight,

    label: "SALDO ANTERIOR",

    value: money(l.saldoAnterior),
  });

  y += summary.rowHeight;

  drawSummaryRow(doc, {
    x: summary.x,
    y,
    width: summary.w,
    height: summary.rowHeight,

    label: "NETO A PAGAR",

    value: money(l.saldoNeto),

    highlight: true,
  });
}

module.exports = drawSummary;
