import React from "react";
import { View, TextInput } from "react-native";
import styles from "./styles";

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar proveedor..."
        style={styles.input}
      />
    </View>
  );
}
