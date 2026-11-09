import db from "../database";
import * as Crypto from "expo-crypto";

class AcopioRepository {
  guardar(acopio) {
    const offlineId = Crypto.randomUUID();
    db.runSync(
      `
      INSERT INTO acopios
      (
        offline_id,
        proveedor_id,
        litros,
        prueba_alcohol,
        fecha,
        hora,
        estado_sync,
        fecha_sync,
        error_sync
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        offlineId,
        acopio.proveedor_id,
        acopio.litros,
        acopio.prueba_alcohol,
        acopio.fecha,
        acopio.hora,
        "PENDIENTE",
        null,
        null,
      ],
    );

    return offlineId;
  }
  actualizarAcopio(id, datos) {
    // La edición conserva la fecha del acopio original.
    db.runSync(
      `
    UPDATE acopios
    SET
      litros = ?,
      prueba_alcohol = ?,
      fecha = ?,
      hora = ?,
      estado_sync = 'PENDIENTE',
      fecha_sync = NULL,
      error_sync = NULL
    WHERE id = ?;
    `,
      [datos.litros, datos.prueba_alcohol, datos.fecha, datos.hora, id],
    );
  }
  obtenerTodos() {
    return db.getAllSync(`
      SELECT *
      FROM acopios
      ORDER BY fecha DESC, hora DESC;
    `);
  }

  obtenerPendientes() {
    const acopios = db.getAllSync(`
    SELECT *
    FROM acopios
    WHERE estado_sync IN ('PENDIENTE','ERROR')
    ORDER BY fecha ASC, hora ASC, id ASC;
  `);
    // console.table(acopios);

    return acopios;
  }
  marcarSincronizado(id) {
    db.runSync(
      `
    UPDATE acopios
    SET
      estado_sync='SINCRONIZADO',
      fecha_sync=CURRENT_TIMESTAMP,
      error_sync=NULL
    WHERE id=?;
    `,
      [id],
    );
  }

  registrarError(id, mensaje) {
    db.runSync(
      `
    UPDATE acopios
    SET
      estado_sync='ERROR',
      error_sync=?,
      fecha_sync=NULL
    WHERE id=?;
    `,
      [mensaje, id],
    );
  }

  obtenerPorOfflineId(offlineId) {
    return db.getFirstSync(
      `
      SELECT *
      FROM acopios
      WHERE offline_id=?;
      `,
      [offlineId],
    );
  }
  obtenerAcopioHoy(proveedorId) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, se suma 1
    const day = String(date.getDate()).padStart(2, "0");
    const hoy = `${year}-${month}-${day}`;

    return db.getFirstSync(
      `
    SELECT *
    FROM acopios
    WHERE proveedor_id = ?
      AND fecha = ?
    LIMIT 1;
    `,
      [proveedorId, hoy],
    );
  }
  eliminarTodos() {
    db.runSync(`
      DELETE FROM acopios;
    `);
  }
  obtenerPorId(id) {
    return db.getFirstSync(
      `
    SELECT *
    FROM acopios
    WHERE id=?;
    `,
      [id],
    );
  }
  contarPendientes() {
    const resultado = db.getFirstSync(`
    SELECT COUNT(*) AS total
    FROM acopios
    WHERE estado_sync IN ('PENDIENTE','ERROR');
  `);

    return resultado.total;
  }
  obtenerResumenSync() {
    const pendientes = db.getFirstSync(`
    SELECT COUNT(*) AS total
    FROM acopios
    WHERE estado_sync IN ('PENDIENTE','ERROR');
  `);

    const sincronizados = db.getFirstSync(`
    SELECT COUNT(*) AS total
    FROM acopios
    WHERE estado_sync='SINCRONIZADO';
  `);

    return {
      pendientes: pendientes.total,

      sincronizados: sincronizados.total,
    };
  }
}

export default new AcopioRepository();
