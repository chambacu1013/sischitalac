import { API_URL } from "../config/api";

export const authService = {
  login: async ({ usuario, password }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usuario, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en las credenciales");
      }

      // Guardamos el carné digital y los datos en el navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      return data;
    } catch (error) {
      console.error("Error en el servicio de Auth:", error.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  },

  obtenerToken: () => {
    return localStorage.getItem("token");
  },

  obtenerUsuarioLogueado: () => {
    const user = localStorage.getItem("usuario");
    return user ? JSON.parse(user) : null;
  },
};
