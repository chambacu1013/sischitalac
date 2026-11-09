import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";

import acopioRepository from "../database/repositories/acopioRepository";
import syncService from "../services/sync/syncService";

export default function useSync() {
  /*
  ====================================================
  ESTADOS
  ====================================================
  */
  const [mensajeError, setMensajeError] = useState(null);
  const [conectado, setConectado] = useState(false);

  const [pendientes, setPendientes] = useState(0);

  const [sincronizando, setSincronizando] = useState(false);

  const [progreso, setProgreso] = useState({
    enviados: 0,
    total: 0,
  });

  const [ultimaSincronizacion, setUltimaSincronizacion] = useState(null);

  /*
  ====================================================
  CARGAR RESUMEN
  ====================================================
  */

  const cargarResumen = useCallback(async () => {
    try {
      const estadoRed = await NetInfo.fetch();

      setConectado(estadoRed.isConnected);

      const total = await acopioRepository.contarPendientes();
      setPendientes(total);

      const ultima = await syncService.obtenerUltimaSincronizacion();

      setUltimaSincronizacion(ultima);
    } catch (error) {
      console.error(error);
    }
  }, []);

  /*
  ====================================================
  SINCRONIZAR
  ====================================================
  */

  const sincronizar = useCallback(async () => {
    try {
      setMensajeError(null);
      setSincronizando(true);
      const resultado = await syncService.sincronizarTodo();
      setPendientes(resultado.pendientes);

      setUltimaSincronizacion(resultado.ultimaSincronizacion);

      setProgreso({
        enviados: resultado.enviados,
        total: resultado.enviados + resultado.errores,
      });

      return resultado;
    } catch (error) {
      let mensaje;

      switch (error.message) {
        case "TOKEN_EXPIRED":
          mensaje = "Debe iniciar sesión para sincronizar.";
          break;

        case "NETWORK_ERROR":
          mensaje = "No hay conexión a Internet.";
          break;

        case "SYNC_ERROR":
          mensaje = "Ocurrió un error durante la sincronización.";
          break;

        default:
          mensaje = error.message;
      }

      setMensajeError(mensaje);
    } finally {
      setSincronizando(false);
    }
  }, []);

  /*
  ====================================================
  EFECTOS
  ====================================================
  */

  useFocusEffect(
    useCallback(() => {
      cargarResumen();
    }, [cargarResumen]),
  );

  /*
  ====================================================
  EXPORTAR
  ====================================================
  */

  return {
    conectado,
    mensajeError,
    pendientes,
    sincronizando,
    progreso,
    ultimaSincronizacion,
    cargarResumen,
    sincronizar,
  };
}
