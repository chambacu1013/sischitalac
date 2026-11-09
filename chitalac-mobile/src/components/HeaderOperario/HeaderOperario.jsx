import React from "react";
import { View } from "react-native";

import EstadoSync from "./EstadoSync";
import UsuarioHeader from "./UsuarioHeader";
import BotonActualizarCatalogo from "./BotonActualizarCatalogo";
import FechaQuincena from "./FechaQuincena";
import styles from "./styles";

export default function HeaderOperario({
  estado,
  pendientes,
  onActualizarCatalogo,
  cargandoCatalogo,
}) {
  return (
    <View style={styles.container}>
      <EstadoSync estado={estado} cantidad={pendientes} />

      <View style={styles.row}>
        <UsuarioHeader />

        <BotonActualizarCatalogo
          onPress={onActualizarCatalogo}
          cargando={cargandoCatalogo}
        />
      </View>

      <FechaQuincena />
    </View>
  );
}
