const auditoriaService = require("../services/auditoriaService");
const excelService = require("../services/excelService");
/*=====================================================
OBTENER AUDITORÍAS
=====================================================*/

const obtenerAuditorias = async (req, res) => {
  try {
    const filtros = {
      usuario: req.query.usuario || null,
      proveedor: req.query.proveedor || null,
      accion: req.query.accion || null,
      fechaInicio: req.query.fechaInicio || null,
      fechaFin: req.query.fechaFin || null,
    };

    const auditorias = await auditoriaService.obtenerAuditorias(filtros);

    res.status(200).json(auditorias);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener las auditorías.",
    });
  }
};
/*=====================================================
OBTENER USUARIOS PARA FILTRO
=====================================================*/

const obtenerUsuariosAuditoria = async (req, res) => {
  try {
    const usuarios = await auditoriaService.obtenerUsuariosAuditoria();

    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener usuarios.",
    });
  }
};
/*=====================================================
OBTENER PROVEEDORES PARA FILTRO
=====================================================*/

const obtenerProveedoresAuditoria = async (req, res) => {
  try {
    const proveedores = await auditoriaService.obtenerProveedoresAuditoria();

    res.status(200).json(proveedores);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener proveedores.",
    });
  }
};
/*=====================================================
EXPORTAR EXCEL
=====================================================*/

const exportarAuditoriasExcel = async (req, res) => {
  try {
    const filtros = {
      usuario: req.query.usuario || null,
      proveedor: req.query.proveedor || null,
      accion: req.query.accion || null,
      fechaInicio: req.query.fechaInicio || null,
      fechaFin: req.query.fechaFin || null,
    };

    const data = await auditoriaService.obtenerAuditorias(filtros);
    const workbook = await excelService.generarExcelAuditorias(data, filtros);

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Auditorias.xlsx",
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al exportar Excel" });
  }
};
/*=====================================================
OBTENER AUDITORÍA POR ID
=====================================================*/

const obtenerAuditoriaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const auditoria = await auditoriaService.obtenerAuditoriaPorId(id);

    res.status(200).json(auditoria);
  } catch (error) {
    console.error(error);

    res.status(404).json({
      mensaje: error.message,
    });
  }
};

module.exports = {
  obtenerAuditorias,
  obtenerAuditoriaPorId,
  obtenerUsuariosAuditoria,
  obtenerProveedoresAuditoria,
  exportarAuditoriasExcel,
};
