import { API_URL } from "../config/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",

    Authorization: `Bearer ${token}`,
  };
};
export const obtenerQuincenas = async () => {
  const response = await fetch(
    `${API_URL}/liquidaciones`,

    {
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Error al obtener las quincenas");
  }

  return response.json();
};
export const obtenerProveedoresPorQuincena = async (quin_id) => {
  const response = await fetch(
    `${API_URL}/liquidaciones/${quin_id}/proveedores`,

    {
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Error al obtener proveedores");
  }

  return response.json();
};
export const obtenerPedidos = async (
  quin_id,

  prov_id,
) => {
  const response = await fetch(
    `${API_URL}/pedidos/quincena/${quin_id}/proveedor/${prov_id}`,

    {
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Error al obtener pedidos");
  }

  return response.json();
};
export const crearPedido = async (data) => {
  const response = await fetch(
    `${API_URL}/pedidos`,

    {
      method: "POST",

      headers: getHeaders(),

      body: JSON.stringify(data),
    },
  );
  const datos = await response.json();

  if (!response.ok) {
    throw new Error(datos.mensaje || "Error al crear pedido.");
  }

  return datos;
  return response.json();
};
export const actualizarPedido = async (
  id,

  data,
) => {
  const response = await fetch(
    `${API_URL}/pedidos/${id}`,

    {
      method: "PUT",

      headers: getHeaders(),

      body: JSON.stringify(data),
    },
  );

  const datos = await response.json();

  if (!response.ok) {
    throw new Error(datos.mensaje || "Error al actualizar el pedido.");
  }

  return datos;
};
export const eliminarPedido = async (id) => {
  const response = await fetch(
    `${API_URL}/pedidos/${id}`,

    {
      method: "DELETE",

      headers: getHeaders(),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "Error al eliminar el pedido.");
  }

  return data;
};
