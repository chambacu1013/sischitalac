import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default function ConfigSection({ titulo, children }) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitulo}>{titulo}</Text>

      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}
