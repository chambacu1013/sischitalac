export const formatearMoneda = (valor) => {
  if (valor === null || valor === undefined) return "$ 0";

  return "$ " + Number(valor).toLocaleString("es-CO");
};

export const formatearLitros = (litros) => {
  if (litros === null || litros === undefined) return "0 Lt";

  return Number(litros).toLocaleString("es-CO") + " Lt";
};

export const formatearFecha = (fecha) => {
  if (!fecha) return "-";

  const fechaTexto = String(fecha).substring(0, 10);
  const [anio, mes, dia] = fechaTexto.split("-");

  const meses = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sept",
    "oct",
    "nov",
    "dic",
  ];

  return `${dia} de ${meses[Number(mes) - 1]} de ${anio}`;
};
export const formatearQuincena = (inicio, fin) => {
  if (!inicio || !fin) return "-";

  return `${formatearFecha(inicio)} - ${formatearFecha(fin)}`;
};
export const formatearNumero = (numero) => {
  if (numero === null || numero === undefined) return "0";

  return Number(numero).toLocaleString("es-CO");
};
export const formatearMonedaCop = (valor) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(valor || 0);
};
