const pool = require("../config/db");

/*=====================================================
REGISTRAR AUDITORÍA
=====================================================*/

const registrarAuditoria = async ({
  usu_id,
  lec_id = null,
  prov_id = null,
  aud_origen,
  aud_accion,
  litros_anteriores = null,
  litros_nuevos = null,
  aud_detalle = null,
}) => {
  const query = `
    INSERT INTO chitalac.log_auditoria
    (
      usu_id,
      lec_id,
      prov_id,
      aud_origen,
      aud_accion,
      litros_anteriores,
      litros_nuevos,
      aud_detalle
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *;
  `;

  const values = [
    usu_id,
    lec_id,
    prov_id,
    aud_origen,
    aud_accion,
    litros_anteriores,
    litros_nuevos,
    aud_detalle,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

/*=====================================================
OBTENER TODAS LAS AUDITORÍAS
=====================================================*/

const obtenerAuditorias = async ({
  usuario = null,
  proveedor = null,
  accion = null,
  fechaInicio = null,
  fechaFin = null,
} = {}) => {
  const query = `
    SELECT
      a.aud_id,
      a.aud_timestamp,
      a.aud_origen,
      a.aud_accion,
      a.litros_anteriores,
      a.litros_nuevos,
      (COALESCE(a.litros_nuevos,0)  - COALESCE(a.litros_anteriores,0)
      ) AS diferencia,

      a.aud_detalle,
      u.usu_id,
      u.usu_nombre,
      u.usu_apellido,
      r.rol_nombre,
      p.prov_id,
      p.prov_nom,
      p.prov_ape

    FROM chitalac.log_auditoria a

    LEFT JOIN chitalac.usuarios u
      ON u.usu_id = a.usu_id

    LEFT JOIN chitalac.roles r
      ON r.rol_id = u.rol_id

    LEFT JOIN chitalac.proveedores p
      ON p.prov_id = a.prov_id
    WHERE
    ($1::INT IS NULL OR a.usu_id = $1)
    AND
    ($2::INT IS NULL OR a.prov_id = $2)
    AND
    ($3::chitalac.accion_auditoria IS NULL OR a.aud_accion = $3::chitalac.accion_auditoria)
    AND
    ($4::DATE IS NULL OR a.aud_timestamp::DATE >= $4)
    AND
    ($5::DATE IS NULL OR a.aud_timestamp::DATE <= $5)
    ORDER BY a.aud_timestamp DESC
  `;
  const valores = [usuario, proveedor, accion, fechaInicio, fechaFin];
  const { rows } = await pool.query(query, valores);

  return rows;
};

/*=====================================================
OBTENER AUDITORÍA POR ID
=====================================================*/

const obtenerAuditoriaPorId = async (id) => {
  const query = `
    SELECT *
    FROM chitalac.log_auditoria
    WHERE aud_id=$1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

/*=====================================================
OBTENER USUARIOS PARA FILTRO
=====================================================*/

const obtenerUsuariosAuditoria = async () => {
  const query = `

    SELECT

      usu_id,

      CONCAT(
        usu_nombre,
        ' ',
        usu_apellido
      ) AS usu_nombre

    FROM chitalac.usuarios

    ORDER BY usu_nombre;

  `;

  const { rows } = await pool.query(query);

  return rows;
};
/*=====================================================
OBTENER PROVEEDORES PARA FILTRO
=====================================================*/

const obtenerProveedoresAuditoria = async () => {
  const query = `

    SELECT

      prov_id,

      CONCAT(
        prov_nom,
        ' ',
        prov_ape
      ) AS prov_nombre

    FROM chitalac.proveedores

    ORDER BY prov_nom;

  `;

  const { rows } = await pool.query(query);

  return rows;
};

module.exports = {
  registrarAuditoria,
  obtenerAuditorias,
  obtenerAuditoriaPorId,
  obtenerUsuariosAuditoria,
  obtenerProveedoresAuditoria,
};
