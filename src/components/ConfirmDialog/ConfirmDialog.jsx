import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

import styles from "./styles";

export default function ConfirmDialog({
  visible,
  titulo,
  mensaje,
  textoCancelar = "Cancelar",
  textoConfirmar = "Aceptar",
  onCancelar,
  onConfirmar,
}) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.titulo}>{titulo}</Text>

          <Text style={styles.mensaje}>{mensaje}</Text>

          <View style={styles.botones}>
            <Pressable style={styles.botonCancelar} onPress={onCancelar}>
              <Text style={styles.textoCancelar}>{textoCancelar}</Text>
            </Pressable>

            <Pressable style={styles.botonConfirmar} onPress={onConfirmar}>
              <Text style={styles.textoConfirmar}>{textoConfirmar}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
