const lecheService = require("../services/lecheService");

const { success, error } = require("../utils/responseHelper");

/**
 * =====================================================
 * REGISTRAR ACOPIO DE LECHE
 *
 * APP MÓVIL:
 * - prov_id
 * - fecha
 * - litros
 * - prueba_alcohol
 * - offline_id
 *
 * WEB:
 * - quin_id
 * - fecha
 * - litros
 * - prueba_alcohol
 * =====================================================
 */
const registrarAcopio = async (req, res) => {
  try {
    const resultado = await lecheService.registrarAcopio(req.body, req.usuario);

    return success(
      res,
      resultado.mensaje,
      {
        id_acopio: resultado.id_acopio,

        quincena_id: resultado.quincena_id,
      },
      201,
    );
  } catch (err) {
    console.error("Error al registrar leche:", err);

    /*
     * Estos errores corresponden a reglas
     * de negocio o datos enviados por el cliente.
     */
    const erroresValidacion = [
      "La fecha del acopio es obligatoria",
      "La cantidad de litros no puede ser negativa",
      "El proveedor es obligatorio",
      "La liquidación seleccionada no existe",
    ];

    const esErrorValidacion =
      erroresValidacion.includes(err.message) ||
      err.message.includes("La fecha del acopio debe estar comprendida") ||
      err.message.includes("Ya se registró leche");

    const status = esErrorValidacion ? 400 : 500;

    return error(res, "Error al registrar leche", err.message, status);
  }
};

/**
 * =====================================================
 * EDITAR ACOPIO
 * =====================================================
 */
const editarAcopio = async (req, res) => {
  try {
    const resultado = await lecheService.editarAcopio(
      req.params.lec_id,
      req.body,
      req.usuario,
    );

    return success(res, resultado.mensaje, {
      acopio: resultado.acopio,
    });
  } catch (err) {
    console.error("Error al editar acopio:", err);

    if (err.message === "El acopio no existe") {
      return error(res, err.message, err.message, 404);
    }

    const esErrorValidacion =
      err.message === "La cantidad de litros no puede ser negativa" ||
      err.message === "La fecha del acopio es obligatoria" ||
      err.message.includes("La fecha del acopio debe estar comprendida") ||
      err.message.includes("ya existe un registro de leche");

    const status = esErrorValidacion ? 400 : 500;

    return error(res, "Error al editar acopio", err.message, status);
  }
};

/**
 * =====================================================
 * OBTENER DETALLE DE UNA QUINCENA
 * =====================================================
 */
const obtenerDetalleQuincena = async (req, res) => {
  try {
    const detalle = await lecheService.obtenerDetalleQuincena(
      req.params.quin_id,
    );

    return success(res, "Detalle de la liquidación obtenido correctamente", {
      data: detalle,
    });
  } catch (err) {
    console.error("Error al consultar liquidación:", err);

    const status =
      err.message === "Quincena o liquidación no encontrada" ? 404 : 500;

    return error(res, err.message, err.message, status);
  }
};

module.exports = {
  registrarAcopio,

  editarAcopio,

  obtenerDetalleQuincena,
};
