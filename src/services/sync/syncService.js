import apiClient from "../api/apiClient";

import proveedorRepository from "../../database/repositories/proveedorRepository";
import acopioRepository from "../../database/repositories/acopioRepository";
import configuracionRepository from "../../database/repositories/configuracionRepository";

class SyncService {
  /*
  ============================================
  DESCARGAR CATÁLOGO DE PROVEEDORES
  ============================================
  */
  async descargarCatalogo() {
    try {
      const response = await apiClient.get("/proveedores");

      proveedorRepository.guardarCatalogo(response.data);

      return true;
    } catch (error) {
      const status = error.response?.status;

      /*
============================================
SIN CONEXIÓN
============================================
*/
      if (!status) {
        throw new Error("NETWORK_ERROR");
      }
      /*
============================================
TOKEN INVÁLIDO O EXPIRADO
============================================
*/
      if (status === 401 || status === 403) {
        throw new Error("TOKEN_EXPIRED");
      }
      /*
============================================
OTROS ERRORES
============================================
*/
      throw new Error("SYNC_ERROR");
    }
  }

  /*
  ============================================
  SINCRONIZAR ACOPIOS
  ============================================
  */
  async sincronizarAcopios() {
    const pendientes = acopioRepository.obtenerPendientes();

    let sincronizados = 0;
    let errores = 0;

    for (const acopio of pendientes) {
      try {
        await apiClient.post("/leche", {
          offline_id: acopio.offline_id,
          prov_id: acopio.proveedor_id,
          fecha: acopio.fecha,
          litros: acopio.litros,
          prueba_alcohol: Boolean(acopio.prueba_alcohol),
        });

        acopioRepository.marcarSincronizado(acopio.id);
        sincronizados++;
      } catch (error) {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          throw new Error("TOKEN_EXPIRED");
        }
        acopioRepository.registrarError(
          acopio.id,
          error.response?.data?.mensaje ||
            error.message ||
            "Error de sincronización",
        );

        errores++;
      }
    }

    const totalProcesados = sincronizados + errores;

    return {
      sincronizados,
      errores,
      totalProcesados,
    };
  }
  /*
====================================================
SINCRONIZAR TODO
====================================================
*/

  async sincronizarTodo() {
    const resultadoAcopios = await this.sincronizarAcopios();
    const catalogoActualizado = await this.descargarCatalogo();
    const fecha = new Date().toISOString();
    // La fecha global solo representa una sincronización completa sin errores.
    const sincronizacionCompleta =
      resultadoAcopios.errores === 0 &&
      resultadoAcopios.sincronizados === resultadoAcopios.totalProcesados;

    if (sincronizacionCompleta) {
      await this.guardarUltimaSincronizacion(fecha);
    }

    return {
      enviados: resultadoAcopios.sincronizados,
      errores: resultadoAcopios.errores,
      totalProcesados: resultadoAcopios.totalProcesados,
      pendientes: acopioRepository.contarPendientes(),
      catalogoActualizado,
      ultimaSincronizacion: sincronizacionCompleta
        ? fecha
        : await this.obtenerUltimaSincronizacion(),
    };
  }
  /*
====================================================
GUARDAR ÚLTIMA SINCRONIZACIÓN
====================================================
*/

  async guardarUltimaSincronizacion(fecha) {
    configuracionRepository.guardar("ultima_sync", fecha);
  }

  /*
====================================================
OBTENER ÚLTIMA SINCRONIZACIÓN
====================================================
*/

  async obtenerUltimaSincronizacion() {
    return configuracionRepository.obtener("ultima_sync");
  }
}

export default new SyncService();
