import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import EstadoSyncIcon from "../Common/EstadoSyncIcon";
export default function ResumenSync({ pendientes, sincronizando, progreso }) {
  const [sincronizacionCompleta, setSincronizacionCompleta] = useState(false);
  useEffect(() => {
    if (!sincronizando && progreso.total > 0) {
      setSincronizacionCompleta(true);

      const timer = setTimeout(() => {
        setSincronizacionCompleta(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [sincronizando, progreso.total]);

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Resumen de sincronización</Text>

      <View style={styles.iconoContainer}>
        <EstadoSyncIcon
          sincronizando={sincronizando}
          huboSincronizacion={progreso.total > 0}
        />
        <View style={styles.infoContainer}>
          {!sincronizando ? (
            <>
              <Text style={styles.resumenTitulo}>
                {pendientes} registros pendientes
              </Text>

              <Text style={styles.descripcion}>
                Estos registros están almacenados en el dispositivo y se
                enviarán al servidor cuando inicie la sincronización.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.resumenTitulo}>Sincronizando...</Text>

              <Text style={styles.descripcion}>
                {progreso.enviados} de {progreso.total} registros procesados.
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
