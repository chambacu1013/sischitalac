import { useEffect, useState } from "react";
import {
  obtenerReporteFinanciero,
  cancelarSaldo,
} from "../services/reporteFinancieroService";

export const useReporteFinanciero = (mes, anio) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelando, setCancelando] = useState(false);

  const cargar = async () => {
    try {
      setLoading(true);

      const res = await obtenerReporteFinanciero(mes, anio);

      setData(res);
    } catch (error) {
      console.error("Error al cargar reporte financiero:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelar = async (prov_id) => {
    try {
      setCancelando(true);

      await cancelarSaldo(prov_id, mes, anio);

      // Actualiza KPIs, tabla y críticos
      await cargar();
    } catch (error) {
      console.error("Error al cancelar saldo:", error);
      throw error;
    } finally {
      setCancelando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, [mes, anio]);

  return {
    data,
    loading,
    cancelando,
    cancelar,
  };
};
