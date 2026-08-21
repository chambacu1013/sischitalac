const db = require("../config/db");

const liquidacionModel = {
  findLiquidacionAbierta: async (prov_id, fecha) => {
    const query = `
      SELECT
          l.quin_id,
          l.prov_id,
          l.quin_fecha_inicio,
          l.quin_fecha_fin,
          p.prov_nom,
          p.prov_ape
      FROM chitalac.liquidaciones l
      INNER JOIN chitalac.proveedores p
          ON p.prov_id = l.prov_id
      WHERE
          l.prov_id = $1
      AND
          $2 BETWEEN l.quin_fecha_inicio
                AND l.quin_fecha_fin;
    `;
    const { rows } = await db.query(query, [prov_id, fecha]);

    return rows[0];
  },

  createLiquidacion: async (
    prov_id,
    fecha_inicio,
    fecha_fin,
    saldoPendiente = 0,
  ) => {
    const query = `
    INSERT INTO chitalac.liquidaciones
    (
      prov_id,
      quin_fecha_inicio,
      quin_fecha_fin,
      saldo_pendiente_antiguo
    )
    VALUES
    ($1, $2, $3, $4)
    RETURNING
      quin_id,
      prov_id,
      quin_fecha_inicio,
      quin_fecha_fin,
      saldo_pendiente_antiguo;
  `;

    const { rows } = await db.query(query, [
      prov_id,
      fecha_inicio,
      fecha_fin,
      saldoPendiente,
    ]);

    return rows[0];
  },
  findById: async (quin_id) => {
    const query = `
        SELECT *
        FROM chitalac.liquidaciones
        WHERE quin_id = $1
    `;

    const { rows } = await db.query(query, [quin_id]);

    return rows[0];
  },
  obtenerDatosParaCartera: async (quin_id) => {
    const query = `
    SELECT
      quin_id,
      prov_id,
      saldo_neto_final
    FROM chitalac.liquidaciones
    WHERE quin_id = $1;
  `;

    const { rows } = await db.query(query, [quin_id]);

    return rows[0] || null;
  },
  obtenerTotalLitros: async (quin_id) => {
    const query = `
        SELECT
            COALESCE(
                SUM(lec_litros),
                0
            ) total
        FROM chitalac.leche
        WHERE quin_id=$1
    `;

    const { rows } = await db.query(query, [quin_id]);

    return Number(rows[0].total);
  },
  actualizarTotales: async ({
    quin_id,
    totalLitros,
    valorLeche,
    totalPedidos,
    saldoFinal,
  }) => {
    const query = `
        UPDATE chitalac.liquidaciones
        SET
            total_litros=$1,
            precio_total_leche=$2,
            total_descuento_pedidos=$3,
            saldo_neto_final=$4
        WHERE quin_id=$5
    `;

    await db.query(query, [
      totalLitros,
      valorLeche,
      totalPedidos,
      saldoFinal,
      quin_id,
    ]);
  },
  actualizarPrecio: async (
    quin_id,

    precio,
  ) => {
    await db.query(
      `
        UPDATE chitalac.liquidaciones
        SET precio_unitario_litro=$1
        WHERE quin_id=$2
        `,
      [precio, quin_id],
    );
  },
  cambiarEstado: async (quin_id, estado) => {
    await db.query(
      `
        UPDATE chitalac.liquidaciones
        SET estado_contable=$1
        WHERE quin_id=$2
        `,
      [estado, quin_id],
    );
  },

  obtenerEstado: async (quin_id) => {
    const query = `
        SELECT estado_contable
        FROM chitalac.liquidaciones
        WHERE quin_id = $1
    `;

    const { rows } = await db.query(query, [quin_id]);

    return rows[0];
  },
  obtenerQuincenas: async () => {
    const query = `
      SELECT
          quin_id,
          quin_fecha_inicio,
          quin_fecha_fin,
          estado_contable
      FROM chitalac.liquidaciones
      ORDER BY quin_fecha_inicio DESC
  `;

    const { rows } = await db.query(query);

    return rows;
  },
  obtenerProveedoresPorQuincena: async (quin_id) => {
    const query = `
      SELECT
          p.prov_id,
          p.prov_nom,
          p.prov_ape,
          p.prov_cedula,
          p.prov_finca,
          p.prov_vereda,
          p.prov_tel,
          l.quin_id,
          l.quin_fecha_inicio,
          l.quin_fecha_fin,
          l.estado_contable,
          l.total_descuento_pedidos
      FROM chitalac.liquidaciones l
      INNER JOIN chitalac.proveedores p
          ON p.prov_id = l.prov_id
      WHERE l.quin_id = $1;
  `;
    const { rows } = await db.query(query, [quin_id]);
    return rows;
  },
  obtenerFacturaCompleta: async (quin_id) => {
    /*
    -------------------------------------------------
    Cabecera
    -------------------------------------------------
    */

    const cabecera = await db.query(
      `
        SELECT
            l.*,
            p.prov_nom,
            p.prov_ape,
            p.prov_cedula,
            p.prov_tel,
            p.prov_finca,
            p.prov_vereda
        FROM chitalac.liquidaciones l
        INNER JOIN chitalac.proveedores p
            ON p.prov_id = l.prov_id
        WHERE l.quin_id = $1 `,
      [quin_id],
    );
    if (cabecera.rows.length === 0) {
      return null;
    }

    /*
    -------------------------------------------------
    Leche
    -------------------------------------------------
    */

    const leche = await db.query(
      `SELECT
            lec_dia,
            lec_fecha,
            lec_litros
        FROM chitalac.leche
        WHERE quin_id=$1
        ORDER BY lec_dia
        `,
      [quin_id],
    );

    /*
    -------------------------------------------------
    Pedidos
    -------------------------------------------------
    */
    const pedidos = await db.query(
      `SELECT
          ped_dia,
          ped_fecha,
          ped_descripcion,
          ped_unidad,
          ped_cantidad,
          ped_valor_unitario,
          ped_subtotal
      FROM chitalac.pedidos
      WHERE quin_id = $1
      ORDER BY ped_dia; `,
      [quin_id],
    );
    return {
      liquidacion: cabecera.rows[0],
      proveedor: {
        nombre: `${cabecera.rows[0].prov_nom} ${cabecera.rows[0].prov_ape}`,
        documento: cabecera.rows[0].prov_cedula,
        telefono: cabecera.rows[0].prov_tel,
        finca: cabecera.rows[0].prov_finca,
        vereda: cabecera.rows[0].prov_vereda,
      },
      leches: leche.rows,
      pedidos: pedidos.rows,
    };
  },
  obtenerUltimaLiquidacionAnterior: async (prov_id, fechaInicio) => {
    const query = `
    SELECT
      quin_id,
      prov_id,
      quin_fecha_inicio,
      quin_fecha_fin,
      saldo_neto_final,
      estado_contable
    FROM chitalac.liquidaciones
    WHERE prov_id = $1
      AND quin_fecha_fin < $2
    ORDER BY quin_fecha_fin DESC
    LIMIT 1
  `;

    const { rows } = await db.query(query, [prov_id, fechaInicio]);

    return rows[0];
  },
};
module.exports = liquidacionModel;
