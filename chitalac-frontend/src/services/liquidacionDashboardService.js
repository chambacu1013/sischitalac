import { API_URL } from "../config/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Obtiene los períodos.
 */
export const obtenerPeriodos = async () => {
  const response = await fetch(`${API_URL}/liquidacion-dashboard/periodos`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error al obtener los períodos.");
  }

  return response.json();
};

/**
 * Obtiene el resumen del período.
 */
export const obtenerResumenPeriodo = async (periodoId) => {
  const response = await fetch(
    `${API_URL}/liquidacion-dashboard/periodos/${periodoId}/resumen`,
    {
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Error al obtener el resumen.");
  }

  return response.json();
};

/**
 * Obtiene la tabla de liquidaciones.
 */
export const obtenerLiquidacionesPeriodo = async (periodoId) => {
  const response = await fetch(
    `${API_URL}/liquidacion-dashboard/periodos/${periodoId}/liquidaciones`,
    {
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Error al obtener las liquidaciones.");
  }

  return response.json();
};

/**
 * Obtiene el detalle de una liquidación.
 */
export const obtenerDetalleLiquidacion = async (quinId) => {
  const response = await fetch(
    `${API_URL}/liquidacion-dashboard/liquidaciones/${quinId}`,
    {
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Error al obtener el detalle de la liquidación.");
  }

  return response.json();
};
/**
 * Actualiza el precio unitario por litro
 * de una liquidación.
 */
export const actualizarPrecioLitro = async (quinId, precioUnitarioLitro) => {
  const response = await fetch(
    `${API_URL}/liquidacion-dashboard/liquidaciones/${quinId}/precio`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        precio_unitario_litro: Number(precioUnitarioLitro),
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "Error al actualizar el precio por litro.");
  }

  return data;
};
