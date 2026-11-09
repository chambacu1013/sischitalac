function success(
  res,

  mensaje,

  data = {},

  status = 200,
) {
  return res.status(status).json({
    ok: true,

    mensaje,

    ...data,
  });
}

function error(
  res,

  mensaje,

  detalle = null,

  status = 500,
) {
  return res.status(status).json({
    ok: false,

    mensaje,

    detalle,
  });
}

module.exports = {
  success,

  error,
};
