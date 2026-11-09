import apiClient from "./apiClient";

const obtenerProveedores = async () => {
  try {
    const response = await apiClient.get("/proveedores");

    return response.data;
  } catch (error) {
    console.error("Error obteniendo catálogo:", error);

    throw error;
  }
};

export default {
  obtenerProveedores,
};
