const db = require("../config/db");

const userModel = {
  findUserByUsername: async (username) => {
    const query = `
        SELECT u.*, r.rol_nombre 
        FROM chitalac.usuarios u 
        INNER JOIN chitalac.roles r ON u.rol_id = r.rol_id 
        WHERE u.usu_username = $1 AND u.usu_estado = TRUE
    `;
    const { rows } = await db.query(query, [username]);
    return rows[0];
  },
  // Listar todos los usuarios activos
  findAll: async () => {
    const query = `
      SELECT 
        u.usu_id, 
        u.usu_nombre, 
        u.usu_apellido, 
        u.usu_cedula, 
        u.usu_username, 
        u.rol_id, 
        r.rol_nombre 
      FROM chitalac.usuarios u
      INNER JOIN chitalac.roles r ON u.rol_id = r.rol_id
      WHERE u.usu_estado = TRUE
      ORDER BY u.usu_nombre ASC;
    `;
    const { rows } = await db.query(query);
    return rows;
  },

  // Crear nuevo usuario
  create: async (data) => {
    const { nombre, apellido, cedula, username, password, rol_id } = data;
    const query = `
            INSERT INTO chitalac.usuarios (usu_nombre, usu_apellido, usu_cedula, usu_username, usu_password_hash, rol_id)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING usu_id;
        `;
    const { rows } = await db.query(query, [
      nombre,
      apellido,
      cedula,
      username,
      password,
      rol_id,
    ]);
    return rows[0];
  },

  // Actualizar usuario
  update: async (id, data) => {
    // El controlador se encargará de encriptar la clave y pasarla como 'password_hash' si el usuario digitó una nueva
    const { nombre, apellido, cedula, rol_id, username, password_hash } = data;

    if (password_hash) {
      // CASO A: El administrador digitó una NUEVA contraseña para el usuario
      const query = `
        UPDATE chitalac.usuarios 
        SET usu_nombre = $1, usu_apellido = $2, usu_cedula = $3, usu_username = $4, rol_id = $5, usu_password_hash = $6
        WHERE usu_id = $7
      `;
      await db.query(query, [
        nombre,
        apellido,
        cedula,
        username,
        rol_id,
        password_hash,
        id,
      ]);
    } else {
      // CASO B: No se digitó contraseña (se mantiene la clave actual intacta en la base de datos)
      const query = `
        UPDATE chitalac.usuarios 
        SET usu_nombre = $1, usu_apellido = $2, usu_cedula = $3, usu_username = $4, rol_id = $5
        WHERE usu_id = $6
      `;
      await db.query(query, [nombre, apellido, cedula, username, rol_id, id]);
    }

    return true;
  },
  // NUEVA: Consultar el rol del usuario que se quiere eliminar
  findById: async (id) => {
    const query =
      "SELECT usu_id, rol_id, usu_username FROM chitalac.usuarios WHERE usu_id = $1";
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },
  // Borrado lógico (no borramos de la BD, solo inactivamos)
  inactivate: async (id) => {
    const query = `UPDATE chitalac.usuarios SET usu_estado = FALSE WHERE usu_id = $1`;
    await db.query(query, [id]);
    return true;
  },
};

module.exports = userModel;
