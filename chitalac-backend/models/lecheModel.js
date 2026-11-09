const db = require("../config/db");

const lecheModel = {
  // =====================================================
  // CREAR REGISTRO DE LECHE
  // =====================================================
  createAcopio: async (data) => {
    const {
      offline_id = null,
      quin_id,
      fecha,
      dia,
      litros,
      prueba_alcohol,
    } = data;

    const query = `
      INSERT INTO chitalac.leche
      (
        offline_id,
        quin_id,
        lec_fecha,
        lec_dia,
        lec_litros,
        lec_prueba_alcohol
      )
      VALUES ($1, $2, $3, $4, $5, $6)

      RETURNING
        lec_id,
        offline_id,
        quin_id,
        lec_fecha,
        lec_dia,
        lec_litros,
        lec_prueba_alcohol;
    `;

    const { rows } = await db.query(query, [
      offline_id,
      quin_id,
      fecha,
      dia,
      litros,
      prueba_alcohol,
    ]);

    return rows[0];
  },

  // =====================================================
  // OBTENER DETALLE DE LA QUINCENA
  // =====================================================
  findDetalleQuincena: async (quin_id) => {
    const query = `
      SELECT
        li.quin_id,
        li.quin_fecha_inicio,
        li.quin_fecha_fin,
        li.precio_unitario_litro,
        li.estado_contable,

        p.prov_nom,
        p.prov_ape,
        p.prov_cedula,
        p.prov_finca,
        p.prov_vereda,

        le.lec_id,
        le.lec_fecha,
        le.lec_dia,
        le.lec_litros,
        le.lec_prueba_alcohol

      FROM chitalac.liquidaciones li

      INNER JOIN chitalac.proveedores p
        ON li.prov_id = p.prov_id

      LEFT JOIN chitalac.leche le
        ON li.quin_id = le.quin_id

      WHERE li.quin_id = $1

      ORDER BY le.lec_fecha ASC;
    `;

    const { rows } = await db.query(query, [quin_id]);

    return rows;
  },

  // =====================================================
  // BUSCAR REGISTRO DE LECHE POR ID
  // =====================================================
  findById: async (lec_id) => {
    const query = `
      SELECT
        l.lec_id,
        l.offline_id,
        l.quin_id,
        l.lec_fecha,
        l.lec_dia,
        l.lec_litros,
        l.lec_prueba_alcohol,

        p.prov_id,
        p.prov_nom,
        p.prov_ape
    FROM chitalac.leche l
    INNER JOIN chitalac.liquidaciones li
        ON li.quin_id = l.quin_id
    INNER JOIN chitalac.proveedores p
        ON p.prov_id = li.prov_id
    WHERE l.lec_id = $1;
    `;
    const { rows } = await db.query(query, [lec_id]);
    return rows[0];
  },

  // =====================================================
  // ACTUALIZAR REGISTRO DE LECHE
  // =====================================================
  update: async (lec_id, datos) => {
    const { fecha, dia, litros, prueba_alcohol } = datos;

    const query = `
      UPDATE chitalac.leche

      SET
        lec_fecha = $1,
        lec_dia = $2,
        lec_litros = $3,
        lec_prueba_alcohol = $4

      WHERE lec_id = $5

      RETURNING
        lec_id,
        offline_id,
        quin_id,
        lec_fecha,
        lec_dia,
        lec_litros,
        lec_prueba_alcohol;
    `;

    const { rows } = await db.query(query, [
      fecha,
      dia,
      litros,
      prueba_alcohol,
      lec_id,
    ]);

    return rows[0];
  },
  // Obtener datos básicos de una liquidación
  findLiquidacionById: async (quin_id) => {
    const query = `
   SELECT
    l.quin_id,
    l.prov_id,
    l.quin_fecha_inicio,
    l.quin_fecha_fin,
    l.estado_contable,
    p.prov_nom,
    p.prov_ape
FROM chitalac.liquidaciones l
INNER JOIN chitalac.proveedores p
    ON p.prov_id = l.prov_id
WHERE l.quin_id = $1;
  `;

    const { rows } = await db.query(query, [quin_id]);

    return rows[0];
  },
  checkDuplicadoDia: async (quin_id, dia) => {
    // Usamos quin_id y lec_dia según la estructura actual de tu BD
    const query = `
      SELECT lec_id FROM chitalac.leche 
      WHERE quin_id = $1 AND lec_dia = $2
    `;
    const { rows } = await db.query(query, [quin_id, dia]);
    return rows[0]; // Retornará el registro si existe, o undefined si no existe nada
  },
  checkDuplicadoDiaEdicion: async (quin_id, dia, lec_id) => {
    const query = `
      SELECT lec_id FROM chitalac.leche 
      WHERE quin_id = $1 AND lec_dia = $2 AND lec_id != $3;
    `;
    const { rows } = await db.query(query, [quin_id, dia, lec_id]);
    return rows[0]; // Retorna conflicto si encuentra OTRO registro en ese día
  },
};

module.exports = lecheModel;
