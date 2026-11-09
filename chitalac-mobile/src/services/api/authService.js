// src/services/api/authService.js

import apiClient from "./apiClient";

const login = async (username, password) => {
  try {
    const response = await apiClient.post(
      "/auth/login",
      {
        username,
        password,
      },
      {
        timeout: 90000,
      },
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.mensaje || "Credenciales incorrectas.",
      );
    }

    throw new Error("No fue posible conectar con el servidor.");
  }
};

export default {
  login,
};
