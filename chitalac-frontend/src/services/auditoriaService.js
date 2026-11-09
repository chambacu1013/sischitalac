import { API_URL } from "../config/api";
const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/*=========================================================
OBTENER AUDITORÍAS
=========================================================*/

export const obtenerAuditorias = async (filtros = {}) => {
  const params = new URLSearchParams();

  if (filtros.fechaInicio) params.append("fechaInicio", filtros.fechaInicio);

  if (filtros.fechaFin) params.append("fechaFin", filtros.fechaFin);

  if (filtros.usuario) params.append("usuario", filtros.usuario);

  if (filtros.accion) params.append("accion", filtros.accion);

  if (filtros.proveedor) params.append("proveedor", filtros.proveedor);

  const response = await fetch(`${API_URL}/auditorias?${params.toString()}`, {
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "Error al consultar las auditorías.");
  }

  return data;
};

/*=========================================================
OBTENER USUARIOS PARA FILTRO
=========================================================*/

export const obtenerUsuariosAuditoria = async () => {
  const response = await fetch(`${API_URL}/auditorias/usuarios`, {
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "Error al obtener usuarios.");
  }

  return data;
};
/*=========================================================
OBTENER PROVEEDORES PARA FILTRO
=========================================================*/

export const obtenerProveedoresAuditoria = async () => {
  const response = await fetch(`${API_URL}/auditorias/proveedores`, {
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "Error al obtener proveedores.");
  }

  return data;
};
/*=========================================================
EXPORTAR EXCEL
=========================================================*/

export const exportarAuditoriasExcel = async (filtros) => {
  const limpiarFiltros = (filtros) => ({
    usuario: filtros.usuario || null,
    proveedor: filtros.proveedor || null,
    accion: filtros.accion === "Todas" ? null : filtros.accion,
    fechaInicio: filtros.fechaInicio || null,
    fechaFin: filtros.fechaFin || null,
  });
  const filtrosLimpios = limpiarFiltros(filtros);
  const params = new URLSearchParams();

  Object.entries(filtrosLimpios).forEach(([key, value]) => {
    if (value !== null && value !== "") {
      params.append(key, value);
    }
  });

  const response = await fetch(
    `${API_URL}/auditorias/exportar?${params.toString()}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Error al exportar Excel");
  }

  return await response.blob();
};
