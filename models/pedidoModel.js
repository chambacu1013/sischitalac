const db = require("../config/db");

const pedidoModel = {
  create: async (data) => {
    const {
      quin_id,
      fecha,
      dia,
      descripcion,
      unidad,
      cantidad,
      valor_unitario,
      subtotal,
    } = data;

    const query = `
      INSERT INTO chitalac.pedidos
      (
        quin_id,
        ped_fecha,
        ped_dia,
        ped_descripcion,
        ped_unidad,
        ped_cantidad,
        ped_valor_unitario,
        ped_subtotal
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING ped_id;
    `;

    const { rows } = await db.query(query, [
      quin_id,
      fecha,
      dia,
      descripcion,
      unidad || null,
      cantidad,
      valor_unitario,
      subtotal,
    ]);

    return rows[0];
  },

  findByQuincena: async (quin_id) => {
    const query = `
      SELECT
          ped_id,
          ped_fecha,
          ped_dia,
          ped_descripcion,
          ped_unidad,
          ped_cantidad,
          ped_valor_unitario,
          ped_subtotal
      FROM chitalac.pedidos
      WHERE quin_id=$1
      ORDER BY ped_dia ASC,ped_id ASC;
    `;

    const { rows } = await db.query(query, [quin_id]);

    return rows;
  },

  findById: async (ped_id) => {
    const query = `
        SELECT *
        FROM chitalac.pedidos
        WHERE ped_id=$1;
      `;

    const { rows } = await db.query(query, [ped_id]);

    return rows[0];
  },

  update: async (ped_id, data) => {
    const { descripcion, unidad, cantidad, valor_unitario, subtotal } = data;

    const query = `
        UPDATE chitalac.pedidos
        SET
            ped_descripcion=$1,
            ped_unidad=$2,
            ped_cantidad=$3,
            ped_valor_unitario=$4,
            ped_subtotal=$5
        WHERE ped_id=$6
      `;

    await db.query(query, [
      descripcion,
      unidad,
      cantidad,
      valor_unitario,
      subtotal,
      ped_id,
    ]);
    return true;
  },

  delete: async (ped_id) => {
    await db.query(`DELETE FROM chitalac.pedidos WHERE ped_id=$1`, [ped_id]);

    return true;
  },

  obtenerTotalPedidos: async (quin_id) => {
    const query = `
        SELECT
            COALESCE(
                SUM(ped_subtotal),
                0
            ) total
        FROM chitalac.pedidos
        WHERE quin_id=$1;
      `;
    const { rows } = await db.query(
      query,

      [quin_id],
    );
    return Number(rows[0].total);
  },
  findByProveedor: async (quin_id, prov_id) => {
    const query = `
        SELECT
            p.*
            FROM chitalac.pedidos p
            INNER JOIN chitalac.liquidaciones l
            ON l.quin_id=p.quin_id
            WHERE
            p.quin_id=$1
            AND
            l.prov_id=$2
            ORDER BY
            ped_dia ASC;
      `;
    const { rows } = await db.query(
      query,

      [quin_id, prov_id],
    );
    return rows;
  },
};

module.exports = pedidoModel;
