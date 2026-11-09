import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default function UsuarioCard({ usuario }) {
  return (
    <View style={styles.usuarioCard}>
      <Text style={styles.avatar}>👤</Text>

      <Text style={styles.nombre}>{usuario.nombre}</Text>

      <Text style={styles.rol}>{usuario.rol}</Text>
    </View>
  );
}
