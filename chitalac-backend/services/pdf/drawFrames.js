const layout = require("./config/pdfLayout");

function drawFrames(doc) {
  /*
   * ===========================
   * INFORMACIÓN DEL PROVEEDOR
   * ===========================
   */
  doc
    .rect(
      layout.provider.quincena.x,
      layout.provider.quincena.y,
      layout.provider.quincena.w,
      layout.provider.quincena.h,
    )
    .stroke();

  doc
    .rect(
      layout.provider.fechaPago.x,
      layout.provider.fechaPago.y,
      layout.provider.fechaPago.w,
      layout.provider.fechaPago.h,
    )
    .stroke();

  doc
    .rect(
      layout.provider.finca.x,
      layout.provider.finca.y,
      layout.provider.finca.w,
      layout.provider.finca.h,
    )
    .stroke();

  doc
    .rect(
      layout.provider.proveedor.x,
      layout.provider.proveedor.y,
      layout.provider.proveedor.w,
      layout.provider.proveedor.h,
    )
    .stroke();
  doc
    .rect(
      layout.provider.documento.x,
      layout.provider.documento.y,
      layout.provider.documento.w,
      layout.provider.documento.h,
    )
    .stroke();

  doc
    .rect(
      layout.provider.telefono.x,
      layout.provider.telefono.y,
      layout.provider.telefono.w,
      layout.provider.telefono.h,
    )
    .stroke();
  /*
   * ===========================
   * TABLA LECHE
   * ===========================
   */
  doc
    .rect(
      layout.milkTable.x,
      layout.milkTable.y,
      layout.milkTable.w,
      layout.milkTable.h,
    )
    .stroke();

  /*
   * ===========================
   * TABLA PEDIDOS
   * ===========================
   */

  doc
    .rect(
      layout.ordersTable.x,
      layout.ordersTable.y,
      layout.ordersTable.w,
      layout.ordersTable.h,
    )
    .stroke();

  /*
   * ===========================
   * RESUMEN CONTABLE
   * ===========================
   */

  doc
    .rect(
      layout.summary.x,
      layout.summary.y,
      layout.summary.w,
      layout.summary.h,
    )
    .stroke();

  /*
   * ===========================
   * FIRMAS
   * ===========================
   */

  doc.moveTo(35, 550).lineTo(145, 550).stroke();

  doc.moveTo(245, 550).lineTo(355, 550).stroke();
}
module.exports = drawFrames;
