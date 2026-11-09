import apiClient from "./apiClient";

const registrarAcopio = async (acopio) => {
  try {
    const response = await apiClient.post("/leche", acopio);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.mensaje || "No fue posible registrar el acopio.",
      );
    }

    throw new Error("No fue posible conectar con el servidor.");
  }
};

const obtenerDetalleQuincena = async (quinId) => {
  try {
    const response = await apiClient.get(`/leche/quincena/${quinId}`);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.mensaje || "No fue posible consultar la quincena.",
      );
    }

    throw new Error("No fue posible conectar con el servidor.");
  }
};

const editarAcopio = async (lecId, datos) => {
  try {
    const response = await apiClient.put(`/leche/${lecId}`, datos);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.mensaje || "No fue posible actualizar el acopio.",
      );
    }

    throw new Error("No fue posible conectar con el servidor.");
  }
};

export default {
  registrarAcopio,
  obtenerDetalleQuincena,
  editarAcopio,
};
