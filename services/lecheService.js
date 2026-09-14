const lecheModel = require("../models/lecheModel");
const liquidacionService = require("./liquidacionService");
const auditoriaService = require("./auditoriaService");
const { obtenerPeriodoQuincenal } = require("../utils/quincenaHelper");

/**
 * =====================================================
 * VALIDAR QUE LA FECHA PERTENEZCA A LA LIQUIDACIÓN
 * =====================================================
 */
async function validarFechaLiquidacion(quin_id, fecha) {
  if (!fecha) {
    throw new Error("La fecha del acopio es obligatoria");
  }

  const liquidacion = await lecheModel.findLiquidacionById(quin_id);

  if (!liquidacion) {
    throw new Error("La liquidación seleccionada no existe");
  }

  /*
   * Convertimos las fechas a YYYY-MM-DD.
   * Al ser fechas ISO, podemos compararlas directamente
   * sin introducir problemas de zona horaria.
   */
  const fechaRegistro = fecha.split("T")[0];

  const fechaInicio = liquidacion.quin_fecha_inicio.toISOString().split("T")[0];

  const fechaFin = liquidacion.quin_fecha_fin.toISOString().split("T")[0];

  if (fechaRegistro < fechaInicio || fechaRegistro > fechaFin) {
    throw new Error(
      `La fecha del acopio debe estar comprendida entre ${fechaInicio} y ${fechaFin}`,
    );
  }

  return liquidacion;
}

/**
 * =====================================================
 * REGISTRAR ACOPIO
 *
 * Puede ser utilizado por:
 * - Aplicación móvil
 * - Aplicación web
 * =====================================================
 */
async function registrarAcopio(datos, usuario) {
  const { prov_id, quin_id, fecha, litros, prueba_alcohol, offline_id } = datos;

  if (!fecha) {
    throw new Error("La fecha del acopio es obligatoria");
  }

  if (Number(litros) < 0) {
    throw new Error("La cantidad de litros debe ser mayor a cero");
  }

  let liquidacion;

  /**
   * ===============================================
   * REGISTRO DESDE WEB
   *
   * El Drawer ya conoce la liquidación.
   * ===============================================
   */
  if (quin_id) {
    await liquidacionService.validarLiquidacionAbierta(quin_id);

    liquidacion = await validarFechaLiquidacion(quin_id, fecha);
  } else {
    /**
     * ===============================================
     * REGISTRO DESDE APP MÓVIL
     *
     * La aplicación envía proveedor + fecha.
     * El backend obtiene o crea la liquidación.
     * ===============================================
     */
    if (!prov_id) {
      throw new Error("El proveedor es obligatorio");
    }

    liquidacion = await liquidacionService.obtenerOCrearLiquidacion(
      prov_id,
      fecha,
    );
  }

  /**
   * El día se obtiene automáticamente
   * desde la fecha.
   */
  const dia = new Date(`${fecha}T00:00:00`).getDate();

  // === NUEVA VALIDACIÓN: PREVENIR DUPLICADOS ===
  const registroExistente = await lecheModel.checkDuplicadoDia(
    liquidacion.quin_id,
    dia,
  );

  if (registroExistente) {
    throw new Error(`Ya se registró leche para este 
        proveedor ${prov_id} en el día ${dia}. Por favor, edite el registro existente.`);
  }

  const nuevoAcopio = await lecheModel.createAcopio({
    // Móvil envía offline_id.
    // Web registra NULL.
    offline_id: offline_id || null,

    quin_id: liquidacion.quin_id,

    fecha,

    dia,

    litros,

    prueba_alcohol: prueba_alcohol ?? true,
  });
  const acopioConProveedor = await lecheModel.findById(nuevoAcopio.lec_id);
  await liquidacionService.recalcularLiquidacion(liquidacion.quin_id);
  const aud_origen = offline_id ? "APP_MOVIL" : "WEB";
  await auditoriaService.registrarCreacionAcopio({
    usuario: {
      id: usuario.usu_id,
      nombre: `${usuario.usu_nombre} ${usuario.usu_apellido}`,
    },

    proveedor: {
      id: acopioConProveedor.prov_id,
      nombre: `${acopioConProveedor.prov_nom} ${acopioConProveedor.prov_ape}`,
    },

    lec_id: nuevoAcopio.lec_id,
    litros,
    fecha,
    aud_origen,
  });
  /**
   * Recalcular valores contables.
   */

  return {
    mensaje: "Acopio registrado exitosamente",

    id_acopio: nuevoAcopio.lec_id,

    quincena_id: liquidacion.quin_id,
  };
}

/**
 * =====================================================
 * EDITAR ACOPIO
 * =====================================================
 */
async function editarAcopio(lec_id, datos, usuario) {
  const { fecha, litros, prueba_alcohol } = datos;

  const acopio = await lecheModel.findById(lec_id);

  if (!acopio) {
    throw new Error("El acopio no existe");
  }
  const litros_anteriores = acopio.lec_litros;
  /**
   * La liquidación debe seguir ABIERTA.
   */
  await liquidacionService.validarLiquidacionAbierta(acopio.quin_id);

  /**
   * La nueva fecha debe pertenecer
   * a la misma liquidación.
   */
  await validarFechaLiquidacion(acopio.quin_id, fecha);

  if (Number(litros) < 0) {
    throw new Error("La cantidad de litros No debe ser negativo");
  }

  /**
   * Calcular nuevamente el día.
   */
  const dia = new Date(`${fecha}T00:00:00`).getDate();
  // === NUEVA VALIDACIÓN CONTROL DE DUPLICADOS EN EDICIÓN ===
  const conflictoEdicion = await lecheModel.checkDuplicadoDiaEdicion(
    acopio.quin_id,
    dia,
    lec_id,
  );

  if (conflictoEdicion) {
    throw new Error(
      `No se puede cambiar a este día porque ya existe un registro de leche para el día ${dia}.`,
    );
  }
  const acopioActualizado = await lecheModel.update(
    lec_id,

    {
      fecha,
      dia,
      litros,
      prueba_alcohol: prueba_alcohol ?? true,
    },
  );

  /**
   * Recalcular liquidación.
   */
  await liquidacionService.recalcularLiquidacion(acopio.quin_id);
  const aud_origen = "WEB";

  await auditoriaService.registrarActualizacionAcopio({
    usuario: {
      id: usuario.usu_id,
      nombre: `${usuario.usu_nombre} ${usuario.usu_apellido}`,
    },

    proveedor: {
      id: acopio.prov_id,
      nombre: `${acopio.prov_nom} ${acopio.prov_ape}`,
    },
    lec_id,
    litros_anteriores,
    litros_nuevos: acopioActualizado.lec_litros,
    fecha,
    aud_origen,
  });
  return {
    mensaje: "Acopio actualizado correctamente",

    acopio: acopioActualizado,
  };
}

/**
 * =====================================================
 * OBTENER DETALLE DE QUINCENA
 * =====================================================
 */
async function obtenerDetalleQuincena(quin_id) {
  const rows = await lecheModel.findDetalleQuincena(quin_id);

  if (rows.length === 0) {
    throw new Error("Quincena o liquidación no encontrada");
  }

  return {
    quincena_id: rows[0].quin_id,

    estado_contable: rows[0].estado_contable,

    periodo: `${rows[0].quin_fecha_inicio.toISOString().split("T")[0]} al ${
      rows[0].quin_fecha_fin.toISOString().split("T")[0]
    }`,

    precio_litro_pactado: rows[0].precio_unitario_litro,

    proveedor: {
      nombre_completo: `${rows[0].prov_nom} ${rows[0].prov_ape}`,

      cedula: rows[0].prov_cedula,

      finca: rows[0].prov_finca,

      vereda: rows[0].prov_vereda,
    },

    registros_leche: rows

      .map((r) => ({
        lec_id: r.lec_id,

        dia: r.lec_dia,

        fecha: r.lec_fecha ? r.lec_fecha.toISOString().split("T")[0] : null,

        litros: r.lec_litros,

        calidad_alcohol: r.lec_prueba_alcohol,
      }))

      .filter((r) => r.lec_id !== null),
  };
}

module.exports = {
  registrarAcopio,

  editarAcopio,

  obtenerDetalleQuincena,
};
