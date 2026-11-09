import React from "react";
import { FlatList } from "react-native";

import ProveedorCard from "../ProveedorCard";

export default function ListaProveedores({
  proveedores,

  onSeleccionar,
}) {
  return (
    <FlatList
      data={proveedores}
      keyExtractor={(item) => item.prov_id.toString()}
      renderItem={({ item }) => (
        <ProveedorCard proveedor={item} onPress={() => onSeleccionar(item)} />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}
