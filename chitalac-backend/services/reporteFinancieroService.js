const pool = require("../config/db");
const carteraService = require("./carteraService");
/*=====================================================
OBTENER REPORTE FINANCIERO MENSUAL
=====================================================*/
const obtenerReporteFinanciero = async ({ mes, anio }) => {
  if (
    !Number.isInteger(mes) ||
    !Number.isInteger(anio) ||
    mes < 1 ||
    mes > 12
  ) {
    throw new Error("Mes y año no son válidos.");
  }
  // ===== KPIs =====
  const kpisQuery = `
    SELECT
      COALESCE(SUM(total_litros),0) AS total_litros,
      COALESCE(SUM(precio_total_leche),0) AS total_leche,
      COALESCE(SUM(total_descuento_pedidos),0) AS total_deducciones
    FROM chitalac.liquidaciones
    WHERE EXTRACT(MONTH FROM quin_fecha_inicio) = $1
      AND EXTRACT(YEAR FROM quin_fecha_inicio) = $2;
  `;

  const kpisResult = await pool.query(kpisQuery, [mes, anio]);
  const kpis = kpisResult.rows[0];

  // ===== PROVEEDORES =====
  const proveedoresQuery = `
  WITH liquidaciones_mes AS (
    SELECT
      l.*
    FROM chitalac.liquidaciones l
    WHERE EXTRACT(MONTH FROM l.quin_fecha_inicio) = $1
      AND EXTRACT(YEAR FROM l.quin_fecha_inicio) = $2
  ),

 saldo_inicial AS (
  SELECT DISTINCT ON (l.prov_id)
    l.prov_id,
    c.car_monto AS saldo_anterior

  FROM chitalac.liquidaciones l

  INNER JOIN chitalac.cartera_saldos c
    ON c.prov_id = l.prov_id
    AND c.quin_origen_id = l.quin_id
    AND c.car_estado = 'PENDIENTE'

  WHERE l.quin_fecha_fin < make_date(
    $2::integer,
    $1::integer,
    1
  )

  ORDER BY
    l.prov_id,
    l.quin_fecha_fin DESC
),
  resumen AS (
    SELECT
      l.prov_id,

      SUM(l.total_litros) AS litros,

      SUM(l.precio_total_leche) AS valor_leche,

      SUM(l.total_descuento_pedidos) AS deducciones

    FROM liquidaciones_mes l

    GROUP BY l.prov_id
  ),
cartera_mes AS (
  SELECT
    l.prov_id,

    CASE
      WHEN COUNT(c.car_id) FILTER (
        WHERE c.car_estado = 'PENDIENTE'
      ) > 0
      THEN 'PENDIENTE'

      WHEN COUNT(c.car_id) FILTER (
        WHERE c.car_estado = 'CANCELADO'
      ) > 0
      THEN 'CANCELADO'

      ELSE NULL
    END AS estado_cartera

  FROM chitalac.liquidaciones l

  LEFT JOIN chitalac.cartera_saldos c
    ON c.prov_id = l.prov_id
    AND c.quin_origen_id = l.quin_id

  WHERE EXTRACT(MONTH FROM l.quin_fecha_inicio) = $1
    AND EXTRACT(YEAR FROM l.quin_fecha_inicio) = $2

  GROUP BY l.prov_id
)
  SELECT
    p.prov_id,
    p.prov_nom,
    p.prov_ape,

    COALESCE(r.litros, 0) AS litros,

    COALESCE(r.valor_leche, 0) AS valor_leche,

    COALESCE(r.deducciones, 0) AS deducciones,

    COALESCE(si.saldo_anterior, 0) AS saldo_anterior,

    (
      COALESCE(r.valor_leche, 0)
      - COALESCE(r.deducciones, 0)
      - COALESCE(si.saldo_anterior, 0)
    ) AS saldo_final,

   CASE
  WHEN cm.estado_cartera = 'PENDIENTE'
    THEN 'PENDIENTE'

  WHEN cm.estado_cartera = 'CANCELADO'
    THEN 'CANCELADO'

  WHEN (
    COALESCE(r.valor_leche, 0)
    - COALESCE(r.deducciones, 0)
    - COALESCE(si.saldo_anterior, 0)
  ) < 0
    THEN 'PENDIENTE'

  ELSE 'OK'
END AS estado_saldo

  FROM resumen r

  INNER JOIN chitalac.proveedores p
    ON p.prov_id = r.prov_id

  LEFT JOIN saldo_inicial si
    ON si.prov_id = r.prov_id

  LEFT JOIN cartera_mes cm
  ON cm.prov_id = r.prov_id

  ORDER BY
    p.prov_nom,
    p.prov_ape;
`;

  const proveedoresResult = await pool.query(proveedoresQuery, [mes, anio]);

  const proveedores = proveedoresResult.rows;

  const proveedoresCriticos = proveedores.filter(
    (p) => p.estado_saldo === "PENDIENTE",
  );

  // ===== BALANCE =====
  const balanceNeto = proveedores
    .filter((p) => p.estado_saldo === "PENDIENTE")
    .reduce(
      (total, proveedor) => total + Number(proveedor.saldo_final || 0),
      0,
    );

  // ===== GRAFICA =====
  const graficaQuery = `
    SELECT
      quin_id,
      precio_total_leche AS leche,
      total_descuento_pedidos AS gastos
    FROM chitalac.liquidaciones
    WHERE EXTRACT(MONTH FROM quin_fecha_inicio) = $1
      AND EXTRACT(YEAR FROM quin_fecha_inicio) = $2
    ORDER BY quin_fecha_inicio;
  `;

  const graficaResult = await pool.query(graficaQuery, [mes, anio]);

  return {
    kpis: {
      totalLitros: Number(kpis.total_litros),
      totalLeche: Number(kpis.total_leche),
      totalDeducciones: Number(kpis.total_deducciones),
      totalGastos: 0,
      proveedoresCriticos: proveedoresCriticos.length,
      balanceNeto,
    },
    grafica: graficaResult.rows,
    proveedores,
    proveedoresCriticos,
  };
};
/*=====================================================
MARCAR SALDO COMO CANCELADO
=====================================================*/
const marcarSaldoCancelado = async ({ prov_id, mes, anio }) => {
  return await carteraService.cancelarSaldo({
    prov_id,
    mes,
    anio,
  });
};
module.exports = {
  obtenerReporteFinanciero,
  marcarSaldoCancelado,
};
