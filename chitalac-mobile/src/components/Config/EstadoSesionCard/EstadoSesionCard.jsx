import React from "react";
import { View } from "react-native";
import { Card, Chip, Divider, Text } from "react-native-paper";

import styles from "./styles";

export default function EstadoSesionCard({ autenticado, usuario }) {
  return (
    <Card style={styles.card}>
      <Card.Title title="Estado de la sesión" titleVariant="titleMedium" />

      <Card.Content>
        <Chip
          icon={autenticado ? "check-circle" : "close-circle"}
          style={[
            styles.chip,
            autenticado ? styles.chipSuccess : styles.chipError,
          ]}
        >
          {autenticado ? "Autenticado" : "Sin autenticar"}
        </Chip>

        <Divider style={styles.divider} />

        {autenticado ? (
          <View>
            <Text variant="labelMedium">Nombre</Text>

            <Text variant="bodyLarge">
              {usuario?.usu_nombre} {usuario?.usu_apellido}
            </Text>

            <Text variant="labelMedium" style={styles.label}>
              Usuario
            </Text>

            <Text variant="bodyLarge">{usuario?.usu_username}</Text>

            <Text variant="labelMedium" style={styles.label}>
              Rol
            </Text>

            <Text variant="bodyLarge">{usuario?.rol_nombre}</Text>
          </View>
        ) : (
          <Text style={styles.descripcion}>
            Debe autenticarse para sincronizar el catálogo y enviar la
            información almacenada en el dispositivo.
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}
