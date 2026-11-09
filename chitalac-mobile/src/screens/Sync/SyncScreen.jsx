import { SafeAreaView, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import {
  EstadoConexion,
  ResumenSync,
  UltimaSync,
  BotonSincronizar,
} from "../../components/Sync";
import useSync from "../../hooks/useSync";
import styles from "./styles";
import Snackbar from "../../components/Snackbar";
import { SNACKBAR_TYPES } from "../../constants/snackbarTypes";

export default function SyncScreen() {
  const {
    conectado,
    pendientes,
    sincronizando,
    progreso,
    ultimaSincronizacion,
    mensajeError,
    sincronizar,
    cargarResumen,
  } = useSync();

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMensaje, setSnackbarMensaje] = useState("");
  useEffect(() => {
    if (!mensajeError) return;

    setSnackbarMensaje(mensajeError);
    setSnackbarVisible(true);
  }, [mensajeError]);
  const handleSincronizar = async () => {
    await sincronizar();
    await cargarResumen();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.titulo}>Sincronización</Text>
        <EstadoConexion conectado={conectado} />

        <ResumenSync
          pendientes={pendientes}
          sincronizando={sincronizando}
          progreso={progreso}
        />

        <UltimaSync fecha={ultimaSincronizacion} />

        <BotonSincronizar
          conectado={conectado}
          pendientes={pendientes}
          sincronizando={sincronizando}
          onPress={handleSincronizar}
        />
      </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        mensaje={snackbarMensaje}
        tipo={SNACKBAR_TYPES.ERROR}
        onClose={() => setSnackbarVisible(false)}
      />
    </SafeAreaView>
  );
}
