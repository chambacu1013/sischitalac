import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function ProveedorCard({ proveedor, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        <Text style={styles.nombre}>
          {proveedor.prov_nom} {proveedor.prov_ape}
        </Text>

        <Text style={styles.vereda}>{proveedor.prov_vereda}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.pendiente}>
          {proveedor.acopioHoy
            ? `${proveedor.acopioHoy.litros} L`
            : "Pendiente"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
