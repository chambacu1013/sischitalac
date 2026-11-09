const liquidacionService = require("../services/liquidacionService");

const { success, error } = require("../utils/responseHelper");

/**
 * Obtener todas las liquidaciones (quincenas)
 */
const obtenerQuincenas = async (req, res) => {
  try {
    const data = await liquidacionService.obtenerQuincenas();
    res.json({
      ok: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

/**
 * Obtener proveedores pertenecientes a una quincena
 */
const obtenerProveedoresPorQuincena = async (req, res) => {
  try {
    const data = await liquidacionService.obtenerProveedoresPorQuincena(
      req.params.quin_id,
    );
    res.json({
      ok: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

module.exports = {
  obtenerQuincenas,
  obtenerProveedoresPorQuincena,
};
