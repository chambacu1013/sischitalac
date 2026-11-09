// src/services/proveedorService.js
import { API_URL } from "../config/api";
export const obtenerProveedores = async () => {
  const token = localStorage.getItem("token"); // Recuperamos el token guardado en el Login

  const response = await fetch(`${API_URL}/proveedores`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Necesario para que el backend autorice
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener la lista de proveedores");
  }

  return response.json();
};
export const createProveedor = async (token, data) => {
  const response = await fetch(`${API_URL}/proveedores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Error al crear proveedor");
  return response.json();
};

export const actualizarProveedor = async (token, id, data) => {
  const response = await fetch(`${API_URL}/proveedores/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el proveedor");
  }

  return response.json();
};
export const eliminarProveedor = async (token, id) => {
  const response = await fetch(`${API_URL}/proveedores/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const resultado = await response.json();

  if (!response.ok) {
    throw new Error(
      resultado.error ||
        resultado.mensaje ||
        resultado.message ||
        "Error al eliminar el proveedor",
    );
  }

  return resultado;
};
