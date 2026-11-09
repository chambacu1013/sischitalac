const db = require("../config/db");

const proveedorModel = {
  // Listar todos los proveedores activos (para la app móvil)
  findAll: async () => {
    const query = `
      SELECT 
        prov_id, 
        prov_nom, 
        prov_ape, 
        prov_cedula, 
        prov_finca, 
        prov_vereda, 
        prov_tel 
      FROM chitalac.proveedores 
      WHERE prov_estado = TRUE
      ORDER BY prov_nom ASC;
    `;
    const { rows } = await db.query(query);
    return rows;
  },

  // Registrar nuevo proveedor
  create: async (data) => {
    const { nombre, apellido, cedula, finca, vereda, telefono } = data;
    const query = `
            INSERT INTO chitalac.proveedores (prov_nom, prov_ape, prov_cedula, prov_finca, prov_vereda, prov_tel)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING prov_id;
        `;
    const { rows } = await db.query(query, [
      nombre,
      apellido,
      cedula,
      finca,
      vereda,
      telefono,
    ]);
    return rows[0];
  },

  // Actualizar datos
  update: async (id, data) => {
    const { nombre, apellido, finca, vereda, telefono } = data;
    const query = `
            UPDATE chitalac.proveedores 
            SET prov_nom = $1, prov_ape = $2, prov_finca = $3, prov_vereda = $4, prov_tel = $5
            WHERE prov_id = $6
        `;
    await db.query(query, [nombre, apellido, finca, vereda, telefono, id]);
    return true;
  },
  // Validar si tiene quincenas asociadas
  hasLiquidaciones: async (id) => {
    // Verificamos en la tabla de liquidaciones si el ID aparece
    const query =
      "SELECT COUNT(*) FROM chitalac.liquidaciones WHERE prov_id = $1";
    const { rows } = await db.query(query, [id]);
    return parseInt(rows[0].count) > 0;
  },

  // NUEVA: Borrado Lógico (Desactivar)
  inactivate: async (id) => {
    const query =
      "UPDATE chitalac.proveedores SET prov_estado = FALSE WHERE prov_id = $1";
    await db.query(query, [id]);
  },
};

module.exports = proveedorModel;
