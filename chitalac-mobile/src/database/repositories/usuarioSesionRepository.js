import db from "../database";

/**
 * Guarda el usuario autenticado.
 * Siempre elimina cualquier sesión anterior.
 */
async function guardarUsuario(usuario) {
  db.runSync("DELETE FROM usuario_sesion");

  db.runSync(
    `
    INSERT INTO usuario_sesion (
      usu_id,
      usu_nombre,
      usu_apellido,
      usu_cedula,
      usu_username,
      rol_id,
      rol_nombre,
      token,
      fecha_login
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      usuario.usu_id,
      usuario.usu_nombre,
      usuario.usu_apellido,
      usuario.usu_cedula,
      usuario.usu_username,
      usuario.rol_id,
      usuario.rol_nombre,
      usuario.token,
      new Date().toISOString(),
    ],
  );
}

/**
 * Obtiene el usuario autenticado.
 */
async function obtenerUsuario() {
  return db.getFirstSync(`
    SELECT *
    FROM usuario_sesion
    LIMIT 1
  `);
}

/**
 * Elimina la sesión local.
 */
async function eliminarUsuario() {
  db.runSync("DELETE FROM usuario_sesion");
}

export default {
  guardarUsuario,
  obtenerUsuario,
  eliminarUsuario,
};
