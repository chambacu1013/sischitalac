import { useCallback, useEffect, useState } from "react";
import acopioRepository from "../database/repositories/acopioRepository";

export default function useAcopios() {
  const [acopios, setAcopios] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarAcopios = useCallback(async () => {
    try {
      const data = acopioRepository.obtenerTodos();

      setAcopios(data);
    } catch (error) {
      console.error("Error cargando acopios:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const guardarAcopio = async (acopio) => {
    acopioRepository.guardar(acopio);
    await cargarAcopios();
  };

  const actualizarAcopio = async (id, datos) => {
    acopioRepository.actualizarAcopio(id, datos);
    await cargarAcopios();
  };

  const obtenerPendientes = () => {
    return acopioRepository.obtenerPendientes();
  };

  const obtenerAcopioHoy = (proveedorId) => {
    return acopioRepository.obtenerAcopioHoy(proveedorId);
  };

  useEffect(() => {
    cargarAcopios();
  }, [cargarAcopios]);

  return {
    acopios,
    loading,
    guardarAcopio,
    actualizarAcopio,
    obtenerPendientes,
    obtenerAcopioHoy,
    cargarAcopios,
  };
}
