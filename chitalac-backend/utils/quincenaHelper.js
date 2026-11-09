function obtenerPeriodoQuincenal(fecha) {
  const dateObj = new Date(fecha);

  const dia = dateObj.getUTCDate();
  const mes = dateObj.getUTCMonth() + 1;
  const anio = dateObj.getUTCFullYear();

  let inicio;
  let fin;

  if (dia <= 15) {
    inicio = `${anio}-${String(mes).padStart(2, "0")}-01`;

    fin = `${anio}-${String(mes).padStart(2, "0")}-15`;
  } else {
    inicio = `${anio}-${String(mes).padStart(2, "0")}-16`;

    const ultimoDia = new Date(anio, mes, 0).getDate();

    fin = `${anio}-${String(mes).padStart(2, "0")}-${ultimoDia}`;
  }

  return {
    dia,
    mes,
    anio,
    quin_inicio: inicio,
    quin_fin: fin,
  };
}

module.exports = {
  obtenerPeriodoQuincenal,
};
