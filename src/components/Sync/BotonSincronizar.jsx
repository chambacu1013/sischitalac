import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import EstadoSyncIcon from "../Common/EstadoSyncIcon";

import styles from "./styles";

export default function BotonSincronizar({
  conectado,
  pendientes,
  sincronizando,
  onPress,
}) {
  const obtenerMensaje = () => {
    if (!conectado) {
      return "Sin conexión a Internet. Los registros permanecerán almacenados hasta que vuelva la conexión.";
    }

    if (sincronizando) {
      return "Espere mientras finaliza la sincronización.";
    }

    if (pendientes === 0) {
      return "No hay registros pendientes para sincronizar.";
    }

    if (pendientes === 1) {
      return "Hay 1 registro pendiente por sincronizar.";
    }

    return `Hay ${pendientes} registros pendientes por sincronizar.`;
  };

  return (
    <View style={styles.botonContainer}>
      <TouchableOpacity
        style={[
          styles.botonSync,
          (!conectado || sincronizando) && styles.botonDeshabilitado,
        ]}
        disabled={!conectado || sincronizando}
        activeOpacity={0.85}
        onPress={onPress}
      >
        <EstadoSyncIcon
          sincronizando={sincronizando}
          huboSincronizacion={false}
          size={22}
        />

        <Text style={styles.textoBoton}>
          {!conectado
            ? "Sin conexión"
            : sincronizando
              ? "Sincronizando..."
              : "Sincronizar ahora"}
        </Text>
      </TouchableOpacity>

      <View style={styles.indicadorContainer}>
        <Text style={styles.mensajeBoton}>{obtenerMensaje()}</Text>
      </View>
    </View>
  );
}
