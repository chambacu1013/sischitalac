const PDFDocument = require("pdfkit");

const CONFIG = require("./config/pdfConfig");
const drawHeader = require("./drawHeader");
const drawFrames = require("./drawFrames");
const drawProviderInfo = require("./drawProviderInfo");
const drawMilkTable = require("./drawMilkTable");
const drawOrdersTable = require("./drawOrdersTable");
const drawSummary = require("./drawSummary");
const drawSignatures = require("./drawSignatures");
const drawLegalText = require("./drawLegalText");

async function generarFacturaPDF(factura) {
  /*
    ----------------------------------------------
    Crear documento
    ----------------------------------------------
    */

  const doc = new PDFDocument({
    size: CONFIG.PAGE.SIZE,

    margin: CONFIG.PAGE.MARGIN,

    info: {
      Title: `Factura ${factura.numero}`,

      Author: "SISCHITALAC",

      Subject: "Liquidación",

      Creator: "SISCHITALAC",
    },
  });

  /*
    ----------------------------------------------
    Render
    ----------------------------------------------
    */

  drawHeader(doc, factura);

  drawFrames(doc);

  drawProviderInfo(doc, factura);

  drawMilkTable(doc, factura);

  drawOrdersTable(doc, factura);

  drawSummary(doc, factura);

  drawSignatures(doc);

  drawLegalText(doc);

  doc.end();

  return doc;
}

module.exports = {
  generarFacturaPDF,
};
