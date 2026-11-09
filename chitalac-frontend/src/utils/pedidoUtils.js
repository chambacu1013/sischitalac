export function calcularSubtotalPedido(cantidad, valorUnitario) {
  return Number(cantidad || 0) * Number(valorUnitario || 0);
}
