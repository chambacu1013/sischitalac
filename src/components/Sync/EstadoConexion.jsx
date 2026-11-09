import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import styles from "./styles";

export default function EstadoConexion({ conectado }) {
  const fadeAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.95,
        duration: 120,
        useNativeDriver: true,
      }),

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [conectado]);
  return (
    <Animated.View
      style={[
        styles.card,
        conectado ? styles.cardOnline : styles.cardOffline,

        {
          opacity: fadeAnim,
          transform: [
            {
              scale: fadeAnim,
            },
          ],
        },
      ]}
    >
      <Text style={styles.titulo}>Estado de conexión</Text>

      <View style={styles.estadoContainer}>
        <MaterialIcons
          name={conectado ? "wifi" : "wifi-off"}
          size={30}
          color={conectado ? "#22C55E" : "#EF4444"}
        />

        <View style={styles.infoContainer}>
          <View
            style={[
              styles.dot,
              conectado ? styles.dotOnline : styles.dotOffline,
            ]}
          />
          <Text
            style={[
              styles.estadoTexto,
              conectado ? styles.onlineTexto : styles.offlineTexto,
            ]}
          >
            {conectado ? "Conectado a Internet" : "Sin conexión a Internet"}
          </Text>

          <Text style={styles.descripcion}>
            {conectado
              ? "La conexión está disponible. Puede sincronizar los registros pendientes."
              : "Los registros seguirán almacenándose en el dispositivo hasta que vuelva la conexión."}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
