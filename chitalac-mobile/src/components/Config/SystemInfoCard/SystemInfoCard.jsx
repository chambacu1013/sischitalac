import React from "react";
import { Card, Divider, Text } from "react-native-paper";

import styles from "./styles";

export default function SystemInfoCard({ appInfo }) {
  return (
    <Card style={styles.card}>
      <Card.Title title="Información del sistema" />

      <Card.Content>
        <Text variant="labelMedium">Aplicación</Text>

        <Text>{appInfo.nombre}</Text>

        <Divider style={styles.divider} />

        <Text variant="labelMedium">Empresa</Text>

        <Text>{appInfo.empresa}</Text>

        <Divider style={styles.divider} />

        <Text variant="labelMedium">Versión</Text>

        <Text>{appInfo.version}</Text>
      </Card.Content>
    </Card>
  );
}
