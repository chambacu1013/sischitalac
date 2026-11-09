import db from "../database";

class ConfiguracionRepository {
  /*
  ============================================
  GUARDAR CONFIGURACIÓN
  ============================================
  */

  guardar(clave, valor) {
    db.runSync(
      `
      INSERT OR REPLACE INTO configuracion (clave, valor)
      VALUES (?, ?);
      `,
      [clave, valor],
    );
  }

  /*
  ============================================
  OBTENER CONFIGURACIÓN
  ============================================
  */

  obtener(clave) {
    const resultado = db.getFirstSync(
      `
      SELECT valor
      FROM configuracion
      WHERE clave = ?;
      `,
      [clave],
    );

    return resultado?.valor ?? null;
  }
}

export default new ConfiguracionRepository();
