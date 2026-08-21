const reporteFinancieroService = require("../services/reporteFinancieroService");
const {
  generarExcelReporteFinanciero,
} = require("../services/reporteFinancieroExcelService");
/*=====================================================
OBTENER REPORTE FINANCIERO MENSUAL
=====================================================*/

const obtenerReporteFinanciero = async (req, res) => {
  try {
    let { mes, anio } = req.query;

    // ===== VALIDACIÓN =====
    if (!mes || !anio) {
      return res.status(400).json({
        mensaje: "Debe enviar mes y año",
      });
    }

    mes = parseInt(mes);
    anio = parseInt(anio);

    if (isNaN(mes) || isNaN(anio)) {
      return res.status(400).json({
        mensaje: "Mes y año deben ser numéricos",
      });
    }

    // ===== LLAMADO AL SERVICE =====
    const reporte = await reporteFinancieroService.obtenerReporteFinanciero({
      mes,
      anio,
    });

    res.status(200).json(reporte);
  } catch (error) {
    console.error("Error en reporte financiero:", error);

    res.status(500).json({
      mensaje: "Error al obtener el reporte financiero",
    });
  }
};
const descargarExcel = async (req, res) => {
  try {
    const { mes, anio } = req.query;

    const data = await reporteFinancieroService.obtenerReporteFinanciero({
      mes: parseInt(mes),
      anio: parseInt(anio),
    });

    const workbook = await generarExcelReporteFinanciero(data.proveedores, {
      mes,
      anio,
      balanceNeto: data.kpis.balanceNeto,
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=reporte_${mes}_${anio}.xlsx`,
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error generando Excel" });
  }
};

/*=====================================================
MARCAR SALDO COMO CANCELADO
=====================================================*/
const marcarSaldoCancelado = async (req, res) => {
  try {
    const { prov_id } = req.params;
    const { mes, anio } = req.query;

    if (!prov_id || !mes || !anio) {
      return res.status(400).json({
        mensaje: "Proveedor, mes y año son requeridos",
      });
    }

    await reporteFinancieroService.marcarSaldoCancelado({
      prov_id: Number(prov_id),
      mes: Number(mes),
      anio: Number(anio),
    });

    res.status(200).json({
      mensaje: "Saldo marcado como CANCELADO correctamente",
    });
  } catch (error) {
    console.error("Error al cancelar saldo:", error);

    res.status(500).json({
      mensaje: error.message || "Error al actualizar estado del saldo",
    });
  }
};

module.exports = {
  obtenerReporteFinanciero,
  marcarSaldoCancelado,
  descargarExcel,
};
