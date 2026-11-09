import React, { createContext, useEffect, useState, useCallback } from "react";

import authService from "../services/api/authService";
import apiClient, {
  configurarLogoutAutomatico,
} from "../services/api/apiClient";

import usuarioRepository from "../repositories/usuarioRepository";
import usuarioSesionRepository from "../database/repositories/usuarioSesionRepository";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);

  const restaurarSesion = async () => {
    try {
      const sesion = await usuarioRepository.obtenerSesion();

      if (sesion?.token && sesion?.usuario) {
        setToken(sesion.token);
        setUsuario(sesion.usuario);
      }
    } finally {
      setCargando(false);
    }
  };

  const logout = useCallback(async () => {
    try {
      await usuarioRepository.cerrarSesion();
      await usuarioSesionRepository.eliminarUsuario();
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    } finally {
      setToken(null);
      setUsuario(null);
    }
  }, []);

  useEffect(() => {
    restaurarSesion();
  }, []);

  useEffect(() => {
    configurarLogoutAutomatico(logout);

    return () => {
      configurarLogoutAutomatico(null);
    };
  }, [logout]);

  const login = async (username, password, recordarCredenciales = false) => {
    const respuesta = await authService.login(username, password);

    await usuarioRepository.guardarSesion(respuesta.token, respuesta.usuario);

    if (recordarCredenciales) {
      await usuarioRepository.guardarCredenciales(username, password);
    } else {
      await usuarioRepository.eliminarCredenciales();
    }

    await usuarioSesionRepository.guardarUsuario({
      ...respuesta.usuario,
      token: respuesta.token,
    });

    setToken(respuesta.token);
    setUsuario(respuesta.usuario);

    return respuesta.usuario;
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        cargando,
        autenticado: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
