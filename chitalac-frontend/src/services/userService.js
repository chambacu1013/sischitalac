import { API_URL } from "../config/api";
export const obtenerUsuarios = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/usuarios`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Error al obtener la lista de usuarios");
  return response.json();
};

export const createUsuario = async (token, data) => {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const resultado = await response.json();

  if (!response.ok) {
    throw new Error(
      resultado.error ||
        resultado.mensaje ||
        resultado.message ||
        "Error al crear el usuario",
    );
  }

  return resultado;
};
export const actualizarUsuario = async (token, id, data) => {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Error al actualizar el usuario");
  return response.json();
};
export const eliminarUsuario = async (token, id) => {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Si el backend responde con error (como el 400 de seguridad), extraemos el mensaje real
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al eliminar usuario");
  }

  return response.json();
};
