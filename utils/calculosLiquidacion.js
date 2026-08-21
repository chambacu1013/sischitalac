function calcularSubtotalPedido(
  cantidad,

  valorUnitario,
) {
  return Number(cantidad) * Number(valorUnitario);
}

function calcularValorLeche(
  litros,

  precioLitro,
) {
  return Number(litros) * Number(precioLitro);
}

function calcularSaldoFinal({
  valorLeche,

  descuentos,

  saldoAnterior,
}) {
  return Number(valorLeche) - Number(descuentos) - Number(saldoAnterior);
}

module.exports = {
  calcularSubtotalPedido,

  calcularValorLeche,

  calcularSaldoFinal,
};
