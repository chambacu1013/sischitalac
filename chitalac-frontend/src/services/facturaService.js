// Si este código va en un archivo nuevo (ej. facturaService.js),
// asegúrate de incluir estas dos constantes arriba:
import { API_URL } from "../config/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Generar y descargar Factura en PDF
 */
export const generarFacturaPDF = async (quinId) => {
  const response = await fetch(`${API_URL}/facturas/${quinId}/pdf`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    // Intentamos capturar el mensaje de error del backend, si falla el PDF
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || "Error al generar el PDF de la factura.",
    );
  }

  // En fetch, así convertimos la respuesta a un archivo binario (Blob)
  const blob = await response.blob();
  return blob;
};
