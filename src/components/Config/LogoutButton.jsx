import React from "react";
import { Pressable, Text } from "react-native";

import styles from "./styles";

export default function LogoutButton({ onPress }) {
  return (
    <Pressable style={styles.logoutButton} onPress={onPress}>
      <Text style={styles.logoutIcon}>🚪</Text>

      <Text style={styles.logoutText}>Cerrar sesión</Text>
    </Pressable>
  );
}
