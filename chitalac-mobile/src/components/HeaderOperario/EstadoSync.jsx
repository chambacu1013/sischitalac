import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default function EstadoSync({
  estado,

  cantidad,
}) {
  const obtenerMensaje = () => {
    switch (estado) {
      case "SINCRONIZADO":
        return {
          icono: "🟢",
          mensaje: "Todos los acopios están sincronizados",
        };

      case "ERROR":
        return {
          icono: "🔴",
          mensaje: `${cantidad} acopios con error de sincronización`,
        };

      case "PENDIENTE":
      default:
        return {
          icono: " ",
          mensaje: `${cantidad} acopios pendientes por sincronizar`,
        };
    }
  };

  const info = obtenerMensaje();

  return (
    <View style={styles.estadoContainer}>
      <Text style={styles.estadoTexto}>
        {info.icono} {info.mensaje}
      </Text>
    </View>
  );
}
