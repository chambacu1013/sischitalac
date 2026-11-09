import { useContext, useCallback, useEffect, useState } from "react";
import usuarioSesionRepository from "../database/repositories/usuarioSesionRepository";

import { AuthContext } from "../context/AuthContext";
export default function useUsuarioSesion() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { usuario: usuarioAuth } = useContext(AuthContext);
  const cargarUsuario = useCallback(async () => {
    try {
      const data = await usuarioSesionRepository.obtenerUsuario();

      setUsuario(data);
    } catch (error) {
      console.error("Error cargando usuario:", error);
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarUsuario();
  }, [usuarioAuth, cargarUsuario]);

  return {
    usuario,
    cargando,
    cargarUsuario,
  };
}
