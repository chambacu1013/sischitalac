import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";

import styles from "./styles";

export default function BotonActualizarCatalogo({ onPress, cargando }) {
  return (
    <Pressable
      style={styles.botonActualizar}
      onPress={onPress}
      disabled={cargando}
    >
      {cargando ? (
        <>
          <ActivityIndicator size="small" />
          <Text style={styles.botonTexto}>Actualizando...</Text>
        </>
      ) : (
        <Text style={styles.botonTexto}>Actualizar catálogo</Text>
      )}
    </Pressable>
  );
}
