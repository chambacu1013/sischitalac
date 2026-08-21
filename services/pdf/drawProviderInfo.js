const layout = require("./config/pdfLayout");
const FONTS = require("./config/pdfFonts");

function drawLabel(doc, label, x, y) {
  doc.font("Helvetica-Bold").fontSize(6).text(label, x, y);
}

function drawValue(doc, value, x, y, width) {
  doc
    .font("Helvetica")
    .fontSize(FONTS.NORMAL)
    .text(value ?? "", x, y, {
      width,
    });
}

function drawProviderInfo(doc, factura) {
  const { proveedor, liquidacion } = factura;

  /*
    ==============================
    QUINCENA
    ==============================
    */

  drawLabel(
    doc,
    "QUINCENA",
    layout.provider.quincena.x + 4,
    layout.provider.quincena.y + 3,
  );

  drawValue(
    doc,
    `${liquidacion.fechaInicio} - ${liquidacion.fechaFin}`,
    layout.provider.quincena.x + 4,
    layout.provider.quincena.y + 14,
    layout.provider.quincena.w - 8,
  );

  /*
    ==============================
    FECHA PAGO
    ==============================
    */

  drawLabel(
    doc,
    "FECHA PAGO",
    layout.provider.fechaPago.x + 4,
    layout.provider.fechaPago.y + 3,
  );

  drawValue(
    doc,
    factura.fechaEmision,
    layout.provider.fechaPago.x + 4,
    layout.provider.fechaPago.y + 14,
    layout.provider.fechaPago.w - 8,
  );

  /*
    ==============================
    FINCA
    ==============================
    */

  drawLabel(
    doc,
    "FINCA",
    layout.provider.finca.x + 4,
    layout.provider.finca.y + 3,
  );

  drawValue(
    doc,
    proveedor.finca,
    layout.provider.finca.x + 4,
    layout.provider.finca.y + 14,
    layout.provider.finca.w - 8,
  );

  /*
    ==============================
    PROVEEDOR
    ==============================
    */

  drawLabel(
    doc,
    "PROVEEDOR",
    layout.provider.proveedor.x + 4,
    layout.provider.proveedor.y + 3,
  );

  drawValue(
    doc,
    proveedor.nombre,
    layout.provider.proveedor.x + 4,
    layout.provider.proveedor.y + 14,
    layout.provider.proveedor.w - 8,
  );

  /*
    ==============================
    DOCUMENTO
    ==============================
    */

  drawLabel(
    doc,
    "CC / NIT",
    layout.provider.documento.x + 4,
    layout.provider.documento.y + 3,
  );

  drawValue(
    doc,
    proveedor.documento,
    layout.provider.documento.x + 4,
    layout.provider.documento.y + 14,
    layout.provider.documento.w - 8,
  );

  /*
    ==============================
    TELÉFONO
    ==============================
    */

  drawLabel(
    doc,
    "TELÉFONO",
    layout.provider.telefono.x + 4,
    layout.provider.telefono.y + 3,
  );

  drawValue(
    doc,
    proveedor.telefono,
    layout.provider.telefono.x + 4,
    layout.provider.telefono.y + 14,
    layout.provider.telefono.w - 8,
  );
}

module.exports = drawProviderInfo;
