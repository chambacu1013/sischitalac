const db = require("../config/db");

const liquidacionDashboardModel = {
  /**
   * Obtiene los períodos (quincenas) disponibles
   * para mostrar en el selector del Dashboard.
   */
  obtenerPeriodos: async () => {
    const query = `
      SELECT
          MIN(quin_id) AS periodo_id,
          quin_fecha_inicio,
          quin_fecha_fin,
          COUNT(*) AS total_proveedores,
          MIN(estado_contable) AS estado_contable
      FROM chitalac.liquidaciones
      GROUP BY
          quin_fecha_inicio,
          quin_fecha_fin
      ORDER BY
          quin_fecha_inicio DESC;
    `;

    const { rows } = await db.query(query);

    return rows;
  },
  /**
   * Obtiene el resumen general de un período.
   */
  obtenerResumenPeriodo: async (periodo_id) => {
    // Obtener las fechas del período
    const periodoQuery = `
    SELECT
      quin_fecha_inicio,
      quin_fecha_fin
    FROM chitalac.liquidaciones
    WHERE quin_id = $1;
  `;

    const periodoResult = await db.query(periodoQuery, [periodo_id]);

    if (periodoResult.rows.length === 0) {
      return null;
    }

    const { quin_fecha_inicio, quin_fecha_fin } = periodoResult.rows[0];

    // Calcular el resumen del período
    const resumenQuery = `
    SELECT
      MAX(precio_unitario_litro) AS precio_unitario_litro,
      COALESCE(SUM(total_litros),0) AS total_litros,
      COALESCE(SUM(precio_total_leche),0) AS precio_total_leche,
      COALESCE(SUM(total_descuento_pedidos),0) AS total_descuento_pedidos,
      COALESCE(SUM(saldo_pendiente_antiguo),0) AS saldo_pendiente_antiguo,
      COALESCE(SUM(saldo_neto_final),0) AS saldo_neto_final
    FROM chitalac.liquidaciones
    WHERE
      quin_fecha_inicio = $1
      AND quin_fecha_fin = $2;
  `;

    const resumenResult = await db.query(resumenQuery, [
      quin_fecha_inicio,
      quin_fecha_fin,
    ]);

    return resumenResult.rows;
  },
  /**
   * Obtiene todas las liquidaciones de un período.
   */
  obtenerLiquidacionesPeriodo: async (periodo_id) => {
    // 1. Obtener las fechas del período
    const periodoResumen = `
    SELECT
        quin_fecha_inicio,
        quin_fecha_fin
        FROM chitalac.liquidaciones
        WHERE quin_id = $1;
  `;
    const periodoResult = await db.query(periodoResumen, [periodo_id]);
    if (periodoResult.rows.length === 0) {
      return null;
    }
    const { quin_fecha_inicio, quin_fecha_fin } = periodoResult.rows[0];
    // 2. Buscar todas las liquidaciones
    // pertenecientes a esas fechas
    const resumenQuery = `
    SELECT
            l.quin_id,
            p.prov_id,
            CONCAT(p.prov_nom, ' ', p.prov_ape) AS proveedor,
            p.prov_finca,
            l.total_litros,
            l.precio_total_leche,
            l.total_descuento_pedidos,
            l.saldo_pendiente_antiguo,
            l.saldo_neto_final,
            l.estado_contable
        FROM chitalac.liquidaciones l
        INNER JOIN chitalac.proveedores p
        ON p.prov_id = l.prov_id
        WHERE
            l.quin_fecha_inicio = $1
        AND
            l.quin_fecha_fin = $2
        ORDER BY
            p.prov_ape,
            p.prov_nom;
            `;
    const resumenResult = await db.query(resumenQuery, [
      quin_fecha_inicio,
      quin_fecha_fin,
    ]);
    return resumenResult.rows;
  },
  /**
   * Obtiene la información del proveedor asociado
   * a una liquidación.
   */
  obtenerProveedor: async (quin_id) => {
    const query = `
        SELECT
        p.prov_id,
        CONCAT(p.prov_nom,' ',p.prov_ape) AS proveedor,
        p.prov_cedula, 
        p.prov_finca, 
        p.prov_vereda, 
        p.prov_tel 
        FROM chitalac.liquidaciones l
        INNER JOIN chitalac.proveedores p
            ON p.prov_id = l.prov_id
        WHERE l.quin_id = $1;
    `;

    const { rows } = await db.query(query, [quin_id]);

    return rows[0] || null;
  },
  /**
   * Obtiene la liquidación.
   */
  obtenerLiquidacion: async (quin_id) => {
    const query = `
        SELECT
            quin_id,
            quin_fecha_inicio,
            quin_fecha_fin,
            precio_unitario_litro,
            total_litros,
            precio_total_leche,
            total_descuento_pedidos,
            saldo_pendiente_antiguo,
            saldo_neto_final,
            estado_contable
        FROM chitalac.liquidaciones
        WHERE quin_id = $1;
    `;
    const { rows } = await db.query(query, [quin_id]);
    return rows[0] || null;
  },
  /**
   * Obtiene los registros de leche
   * de una liquidación.
   */
  obtenerLeches: async (quin_id) => {
    const query = `
    SELECT
      lec_id,
      lec_fecha,
      lec_dia,
      lec_litros,
      lec_prueba_alcohol
    FROM chitalac.leche
    WHERE quin_id = $1
    ORDER BY lec_fecha;
  `;

    const { rows } = await db.query(query, [quin_id]);

    return rows;
  },
  /**
   * Obtiene los pedidos asociados
   * a una liquidación.
   */
  obtenerPedidos: async (quin_id) => {
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
        WHERE quin_id = $1
        ORDER BY ped_fecha;
    `;
    const { rows } = await db.query(query, [quin_id]);
    return rows;
  },
  /**
   * Obtiene toda la información
   * para el Drawer.
   */
  obtenerDetalleLiquidacion: async (quin_id) => {
    const proveedor = await liquidacionDashboardModel.obtenerProveedor(quin_id);
    const liquidacion =
      await liquidacionDashboardModel.obtenerLiquidacion(quin_id);
    const leches = await liquidacionDashboardModel.obtenerLeches(quin_id);
    const pedidos = await liquidacionDashboardModel.obtenerPedidos(quin_id);

    return {
      proveedor,
      liquidacion,
      leches,
      pedidos,
    };
  },
  /**
   * Actualiza el precio unitario por litro.
   */
  actualizarPrecioLitro: async (quin_id, precio_unitario_litro) => {
    const query = `
      UPDATE chitalac.liquidaciones
      SET
          precio_unitario_litro = $2
      WHERE quin_id = $1
      RETURNING *;
  `;

    const { rows } = await db.query(query, [quin_id, precio_unitario_litro]);

    return rows[0] || null;
  },
};

module.exports = liquidacionDashboardModel;
