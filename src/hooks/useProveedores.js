import { useCallback, useEffect, useState } from "react";
import proveedorRepository from "../database/repositories/proveedorRepository";

export default function useProveedor() {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarProveedores = useCallback(async () => {
    try {
      setLoading(true);

      const data = await proveedorRepository.obtenerProveedores();

      setProveedores(data);
    } catch (error) {
      console.error("Error cargando proveedores:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarProveedores();
  }, [cargarProveedores]);

  return {
    proveedores,

    loading,

    cargarProveedores,
  };
}
