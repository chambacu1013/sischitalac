import { API_URL } from "../config/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Registrar acopio de leche
 */
export const registrarAcopio = async (datos) => {
  const response = await fetch(`${API_URL}/leche`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(datos),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "Error al registrar el acopio.");
  }

  return data;
};

/**
 * Editar acopio de leche
 */
export const editarAcopio = async (lecId, datos) => {
  const response = await fetch(`${API_URL}/leche/${lecId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(datos),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "Error al actualizar el acopio.");
  }

  return data;
};

/**
 * Obtener registros de una quincena
 */
export const obtenerDetalleQuincena = async (quinId) => {
  const response = await fetch(`${API_URL}/leche/quincena/${quinId}`, {
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "Error al consultar los registros.");
  }

  return data;
};
