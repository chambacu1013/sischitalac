import React from "react";
import { View, Text } from "react-native";

import useUsuarioSesion from "../../hooks/useUsuarioSesion";
import styles from "./styles";

export default function UsuarioHeader() {
  const { usuario } = useUsuarioSesion();

  const nombre = usuario
    ? `${usuario.usu_nombre} ${usuario.usu_apellido}`
    : "Sin sesión";

  return (
    <View style={styles.usuarioContainer}>
      <Text style={styles.usuarioNombre}>👤 {nombre}</Text>
    </View>
  );
}
