const { crearFacturaDTO } = require("../dto/facturaDTO");

const liquidacionService = require("./liquidacionService");
const pdfService = require("./pdf/pdfService");

async function generarFactura(quin_id) {
  const datos = await liquidacionService.obtenerFactura(quin_id);

  if (!datos) {
    throw new Error("La liquidación no existe.");
  }

  const factura = crearFacturaDTO(datos);

  /*
   * Generar el PDF.
   * Si ocurre un error NO cambia el estado.
   */
  const pdf = await pdfService.generarFacturaPDF(factura);

  /*
   * Solo la primera vez cambia el estado.
   * Las reimpresiones NO hacen UPDATE.
   */
  if (datos.liquidacion.estado_contable === "ABIERTA") {
    await liquidacionService.cerrarLiquidacion(quin_id);
  }

  return pdf;
}
async function obtenerFacturaDTO(quin_id) {
  const datos = await liquidacionService.obtenerFactura(quin_id);

  if (!datos) {
    throw new Error("La liquidación no existe.");
  }

  return crearFacturaDTO(datos);
}

module.exports = {
  obtenerFacturaDTO,
  generarFactura,
};
