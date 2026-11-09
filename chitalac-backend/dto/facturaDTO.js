function crearFacturaDTO(datos) {
  function formatoFecha(fecha) {
    return new Date(fecha).toLocaleDateString("es-CO");
  }
  return {
    numero: datos.liquidacion.quin_id,

    fechaEmision: formatoFecha(new Date()),

    proveedor: datos.proveedor,

    liquidacion: {
      fechaInicio: formatoFecha(datos.liquidacion.quin_fecha_inicio),
      fechaFin: formatoFecha(datos.liquidacion.quin_fecha_fin),

      precioLitro: Number(datos.liquidacion.precio_unitario_litro),

      totalLitros: Number(datos.liquidacion.total_litros),

      valorLeche: Number(datos.liquidacion.precio_total_leche),

      totalPedidos: Number(datos.liquidacion.total_descuento_pedidos),

      saldoAnterior: Number(datos.liquidacion.saldo_pendiente_antiguo),

      saldoNeto: Number(datos.liquidacion.saldo_neto_final),

      estado: datos.liquidacion.estado_contable,
    },

    leches: datos.leches.map((l) => ({
      dia: Number(l.lec_dia),

      fecha: l.lec_fecha,

      litros: Number(l.lec_litros),
    })),

    pedidos: datos.pedidos.map((p) => ({
      dia: Number(p.ped_dia),

      fecha: p.ped_fecha,

      descripcion: p.ped_descripcion,

      unidad: p.ped_unidad,

      cantidad: Number(p.ped_cantidad),

      valorUnitario: Number(p.ped_valor_unitario),

      subtotal: Number(p.ped_subtotal),
    })),
  };
}

module.exports = {
  crearFacturaDTO,
};
