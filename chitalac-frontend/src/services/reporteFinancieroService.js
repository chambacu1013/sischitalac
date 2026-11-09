import { API_URL } from "../config/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Obtiene el reporte financiero mensual
 */
export const obtenerReporteFinanciero = async (mes, anio) => {
  const response = await fetch(
    `${API_URL}/reportes-financieros?mes=${mes}&anio=${anio}`,
    {
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Error al obtener el reporte financiero.");
  }

  return response.json();
};
/**
 * Descarga el reporte financiero en Excel
 */
export const descargarReporteFinancieroExcel = async (mes, anio) => {
  const response = await fetch(
    `${API_URL}/reportes-financieros/excel?mes=${mes}&anio=${anio}`,
    {
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Error al descargar el reporte financiero.");
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = `reporte_financiero_${mes}_${anio}.xlsx`;

  document.body.appendChild(enlace);
  enlace.click();

  enlace.remove();
  window.URL.revokeObjectURL(url);
};

/**
 * Marca un saldo como cancelado
 */

export const cancelarSaldo = async (prov_id, mes, anio) => {
  const response = await fetch(
    `${API_URL}/reportes-financieros/cancelar/${prov_id}?mes=${mes}&anio=${anio}`,
    {
      method: "PUT",
      headers: getHeaders(),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "Error al cancelar el saldo.");
  }

  return data;
};
