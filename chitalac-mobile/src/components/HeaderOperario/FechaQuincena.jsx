import React from "react";
import { Text } from "react-native";

import styles from "./styles";

export default function FechaQuincena() {
  const fecha = new Date();

  const fechaActual = fecha.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const fechaFormateada =
    fechaActual.charAt(0).toUpperCase() + fechaActual.slice(1);

  const quincena =
    fecha.getDate() <= 15 ? "Primera quincena" : "Segunda quincena";

  return (
    <Text style={styles.fechaQuincena}>
      {fechaFormateada} • {quincena}
    </Text>
  );
}
