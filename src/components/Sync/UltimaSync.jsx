import React from "react";
import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import styles from "./styles";

export default function UltimaSync({ fecha }) {
  const formatearFecha = (fechaISO) => {
    if (!fechaISO) {
      return "Nunca sincronizado";
    }

    return new Date(fechaISO).toLocaleString("es-CO", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Última sincronización</Text>

      <View style={styles.estadoContainer}>
        <MaterialIcons name="cloud-done" size={30} color="#2563EB" />

        <View style={styles.infoContainer}>
          <Text style={styles.fechaTexto}>{formatearFecha(fecha)}</Text>

          <Text style={styles.descripcion}>
            {fecha
              ? "Última sincronización realizada correctamente."
              : "Todavía no se ha realizado ninguna sincronización."}
          </Text>
        </View>
      </View>
    </View>
  );
}
