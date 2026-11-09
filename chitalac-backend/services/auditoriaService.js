const auditoriaModel = require("../models/auditoriaModel");
const excelService = require("./excelService");
/*=====================================================
EXPORTAR AUDITORÍAS
=====================================================*/

const exportarAuditoriasExcel = async (filtros) => {
  const auditorias = await auditoriaModel.obtenerAuditorias(filtros);

  return await excelService.generarExcelAuditorias(auditorias);
};
/*=====================================================
FORMATEAR FECHA
=====================================================*/

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
/*=====================================================
CONSTRUCTORES DE DETALLE (PRIVADOS)
=====================================================*/

const construirDetalleLogin = ({ usuario, origen }) =>
  `El usuario ${usuario} inició sesión desde ${origen}.`;

const construirDetalleLogout = ({ usuario }) =>
  `El usuario ${usuario} cerró sesión.`;

const construirDetalleCreacion = ({ usuario, proveedor, litros, fecha }) =>
  `El usuario ${usuario} registró un nuevo acopio de ${litros} L para el proveedor ${proveedor} correspondiente al día ${formatearFecha(fecha)}.`;

const construirDetalleActualizacion = ({
  usuario,
  proveedor,
  litros_anteriores,
  litros_nuevos,
  fecha,
}) =>
  `El usuario ${usuario} actualizó el acopio del proveedor ${proveedor} correspondiente al día ${formatearFecha(fecha)}, cambiando ${litros_anteriores} L por ${litros_nuevos} L.`;

const construirDetalleEliminacion = ({ usuario, proveedor, litros, fecha }) =>
  `El usuario ${usuario} eliminó el registro de acopio de ${litros} L del proveedor ${proveedor} correspondiente al día ${formatearFecha(fecha)}.`;
const construirDetalleSincronizacion = ({ usuario, cantidadRegistros }) =>
  `El operario ${usuario} sincronizó correctamente ${cantidadRegistros} registros de acopio.`;
/*=====================================================
REGISTRAR AUDITORÍA
FUNCIÓN PRIVADA
=====================================================*/

const registrarAuditoria = async ({
  usu_id,
  lec_id = null,
  prov_id = null,
  aud_origen,
  aud_accion,
  litros_anteriores = null,
  litros_nuevos = null,
  aud_detalle,
}) => {
  return auditoriaModel.registrarAuditoria({
    usu_id,
    lec_id,
    prov_id,
    aud_origen,
    aud_accion,
    litros_anteriores,
    litros_nuevos,
    aud_detalle,
  });
};
const registrarCreacionAcopio = async ({
  usuario,
  proveedor,
  lec_id,
  litros,
  fecha,
  aud_origen,
}) => {
  return registrarAuditoria({
    usu_id: usuario.id,

    lec_id,

    prov_id: proveedor.id,

    aud_origen,

    aud_accion: "CREAR",

    litros_nuevos: litros,

    aud_detalle: construirDetalleCreacion({
      usuario: usuario.nombre,
      proveedor: proveedor.nombre,
      litros,
      fecha,
    }),
  });
};
const registrarActualizacionAcopio = async ({
  usuario,
  proveedor,
  lec_id,
  litros_anteriores,
  litros_nuevos,
  fecha,
  aud_origen,
}) => {
  return registrarAuditoria({
    usu_id: usuario.id,

    lec_id,

    prov_id: proveedor.id,

    aud_origen,

    aud_accion: "ACTUALIZAR",

    litros_anteriores,

    litros_nuevos,

    aud_detalle: construirDetalleActualizacion({
      usuario: usuario.nombre,

      proveedor: proveedor.nombre,

      litros_anteriores,

      litros_nuevos,
      fecha,
    }),
  });
};
const registrarEliminacionAcopio = async ({
  usuario,
  proveedor,
  lec_id,
  litros,
  fecha,
  aud_origen,
}) => {
  return registrarAuditoria({
    usu_id: usuario.id,

    lec_id,

    prov_id: proveedor.id,

    aud_origen,

    aud_accion: "ELIMINAR",

    litros_anteriores: litros,

    aud_detalle: construirDetalleEliminacion({
      usuario: usuario.nombre,

      proveedor: proveedor.nombre,

      litros,
    }),
  });
};
const registrarLogin = async ({ usuario, aud_origen }) => {
  return registrarAuditoria({
    usu_id: usuario.id,

    aud_origen,

    aud_accion: "LOGIN",

    aud_detalle: construirDetalleLogin({
      usuario: usuario.nombre,

      origen: aud_origen,
    }),
  });
};
const registrarLogout = async ({ usuario, aud_origen }) => {
  return registrarAuditoria({
    usu_id: usuario.id,

    aud_origen,

    aud_accion: "LOGOUT",

    aud_detalle: construirDetalleLogout({
      usuario: usuario.nombre,
    }),
  });
};
const registrarSincronizacion = async ({
  usuario,
  aud_origen,
  cantidadRegistros,
}) => {
  return registrarAuditoria({
    usu_id: usuario.id,

    aud_origen,

    aud_accion: "SINCRONIZAR",

    aud_detalle: construirDetalleSincronizacion({
      usuario: usuario.nombre,

      cantidadRegistros,
    }),
  });
};
const obtenerAuditorias = async (filtros) => {
  return await auditoriaModel.obtenerAuditorias(filtros);
};
const obtenerAuditoriaPorId = async (id) => {
  const auditoria = await auditoriaModel.obtenerAuditoriaPorId(id);

  if (!auditoria) {
    throw new Error("La auditoría no existe.");
  }

  return auditoria;
};

const obtenerUsuariosAuditoria = async () => {
  return await auditoriaModel.obtenerUsuariosAuditoria();
};
const obtenerProveedoresAuditoria = async () => {
  return await auditoriaModel.obtenerProveedoresAuditoria();
};
module.exports = {
  registrarCreacionAcopio,
  registrarActualizacionAcopio,
  registrarEliminacionAcopio,
  registrarLogin,
  registrarLogout,
  registrarSincronizacion,

  obtenerAuditorias,
  obtenerAuditoriaPorId,
  obtenerUsuariosAuditoria,
  obtenerProveedoresAuditoria,

  exportarAuditoriasExcel,
};
