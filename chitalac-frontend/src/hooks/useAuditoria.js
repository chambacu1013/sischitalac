import { useEffect, useState } from "react";
import {
  obtenerAuditorias,
  obtenerUsuariosAuditoria,
  obtenerProveedoresAuditoria,
  exportarAuditoriasExcel,
} from "../services/auditoriaService";

export const useAuditoria = () => {
  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState([]);

  const [usuarios, setUsuarios] = useState([]);

  const [proveedores, setProveedores] = useState([]);

  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    usuario: "",
    proveedor: "",
    accion: "",
  });

  /*=====================================================
  CARGAR COMBOS
  =====================================================*/

  const cargarCombos = async () => {
    try {
      const [usuariosBD, proveedoresBD] = await Promise.all([
        obtenerUsuariosAuditoria(),
        obtenerProveedoresAuditoria(),
      ]);

      setUsuarios(usuariosBD);

      setProveedores(proveedoresBD);
    } catch (error) {
      console.error(error);
    }
  };

  /*=====================================================
  CARGAR AUDITORÍAS
  =====================================================*/

  const cargarAuditorias = async () => {
    try {
      setLoading(true);

      const data = await obtenerAuditorias(filtros);

      setRows(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /*=====================================================
  FILTROS
  =====================================================*/

  const handleFiltro = ({ target }) => {
    const { name, value } = target;

    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*=====================================================
  EXPORTAR EXCEL
  =====================================================*/

  const exportarExcel = async () => {
    try {
      const blob = await exportarAuditoriasExcel(filtros);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "Auditorias.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  /*=====================================================
  EFECTOS
  =====================================================*/

  useEffect(() => {
    cargarCombos();
  }, []);

  useEffect(() => {
    cargarAuditorias();
  }, [filtros]);

  return {
    loading,
    rows,
    usuarios,
    proveedores,
    filtros,
    setFiltros,
    handleFiltro,
    exportarExcel,
    recargar: cargarAuditorias,
  };
};
