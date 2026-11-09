import React from "react";
import { Card, Button } from "react-native-paper";

import styles from "./styles";

export default function SyncCard({
  autenticado,

  onSyncCatalogo,

  onSyncDatos,
}) {
  return (
    <Card style={styles.card}>
      <Card.Title title="Sincronización" />

      <Card.Content>
        <Button
          mode="contained"
          icon="database-sync"
          style={styles.button}
          disabled={!autenticado}
          onPress={onSyncCatalogo}
        >
          Actualizar catálogo
        </Button>

        <Button
          mode="outlined"
          icon="cloud-upload"
          disabled={!autenticado}
          onPress={onSyncDatos}
        >
          Sincronizar registros
        </Button>
      </Card.Content>
    </Card>
  );
}
