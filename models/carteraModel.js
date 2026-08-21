const pool = require("../config/db");

/**
 * =====================================================
 * CREAR O ACTUALIZAR CARTERA DE UNA LIQUIDACIÓN
 * =====================================================
 */
const crearCartera = async ({ prov_id, quin_origen_id, car_monto }) => {
  const query = `
    INSERT INTO chitalac.cartera_saldos (
      prov_id,
      quin_origen_id,
      car_monto,
      car_estado
    )
    VALUES ($1, $2, $3, 'PENDIENTE')
    ON CONFLICT (prov_id, quin_origen_id)
    DO UPDATE SET
      car_monto = EXCLUDED.car_monto,
      car_estado = 'PENDIENTE',
      car_fecha_pago = NULL
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    prov_id,
    quin_origen_id,
    car_monto,
  ]);

  return rows[0];
};

/**
 * =====================================================
 * BUSCAR CARTERA PENDIENTE DE UN PROVEEDOR
 * =====================================================
 */
const obtenerSaldoPendiente = async (prov_id) => {
  const query = `
    SELECT
      car_id,
      prov_id,
      quin_origen_id,
      car_monto,
      car_estado,
      car_fecha_creacion,
      car_fecha_pago
    FROM chitalac.cartera_saldos
    WHERE prov_id = $1
      AND car_estado = 'PENDIENTE'
    ORDER BY car_fecha_creacion DESC
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [prov_id]);

  return rows[0] || null;
};
const cancelarSaldo = async ({ prov_id, mes, anio }) => {
  const query = `
    UPDATE chitalac.cartera_saldos c
    SET
      car_estado = 'CANCELADO',
      car_fecha_pago = CURRENT_TIMESTAMP
    WHERE c.car_id = (
      SELECT c2.car_id
      FROM chitalac.cartera_saldos c2
      WHERE c2.prov_id = $1
        AND c2.car_estado = 'PENDIENTE'
      ORDER BY c2.car_fecha_creacion DESC
      LIMIT 1
    )
    AND EXISTS (
      SELECT 1
      FROM chitalac.liquidaciones l
      WHERE l.prov_id = $1
        AND EXTRACT(MONTH FROM l.quin_fecha_inicio) = $2
        AND EXTRACT(YEAR FROM l.quin_fecha_inicio) = $3
        AND l.saldo_neto_final < 0
    )
    RETURNING
      c.car_id,
      c.prov_id,
      c.quin_origen_id,
      c.car_monto,
      c.car_estado,
      c.car_fecha_creacion,
      c.car_fecha_pago;
  `;

  const { rows } = await pool.query(query, [prov_id, mes, anio]);

  return rows[0] || null;
};
module.exports = {
  crearCartera,
  obtenerSaldoPendiente,
  cancelarSaldo,
};
