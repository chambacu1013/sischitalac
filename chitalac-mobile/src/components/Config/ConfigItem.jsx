import React from "react";
import { Pressable, View, Text } from "react-native";

import styles from "./styles";

export default function ConfigItem({ titulo, subtitulo, icono, onPress }) {
  return (
    <Pressable style={styles.itemContainer} onPress={onPress}>
      <View style={styles.itemIzquierda}>
        <Text style={styles.itemIcono}>{icono}</Text>

        <View style={styles.itemTexto}>
          <Text style={styles.itemTitulo}>{titulo}</Text>

          {subtitulo ? (
            <Text style={styles.itemSubtitulo}>{subtitulo}</Text>
          ) : null}
        </View>
      </View>

      <Text style={styles.itemFlecha}>›</Text>
    </Pressable>
  );
}
