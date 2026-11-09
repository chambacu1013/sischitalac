import React, { useState } from "react";
import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import useProveedor from "../../hooks/useProveedores";
import HeaderOperario from "../../components/HeaderOperario";
import SearchBar from "../../components/SearchBar";
import ListaProveedores from "../../components/ListaProveedores/";
import acopioRepository from "../../database/repositories/acopioRepository";
import AcopioModal from "../../components/AcopioModal";
import useAcopios from "../../hooks/useAcopios";
import styles from "./styles";
import Snackbar from "../../components/Snackbar";
import { SNACKBAR_TYPES } from "../../constants/snackbarTypes";
import syncService from "../../services/sync/syncService";
export default function HomeScreen() {
  const [actualizandoCatalogo, setActualizandoCatalogo] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const { proveedores, loading, cargarProveedores } = useProveedor();
  const [pendientes, setPendientes] = useState(0);
  const proveedoresFiltrados = proveedores.filter((p) => {
    const nombreCompleto = `${p.prov_nom} ${p.prov_ape}`.toLowerCase();

    return nombreCompleto.includes(textoBusqueda.toLowerCase());
  });

  const actualizarPendientes = () => {
    setPendientes(acopioRepository.contarPendientes());
  };
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const seleccionarProveedor = (proveedor) => {
    setProveedorSeleccionado(proveedor);
    setModalVisible(true);
  };
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMensaje, setSnackbarMensaje] = useState("");
  const [snackbarTipo, setSnackbarTipo] = useState(SNACKBAR_TYPES.SUCCESS);
  const actualizarCatalogo = async () => {
    try {
      setActualizandoCatalogo(true);

      await syncService.descargarCatalogo();
      await cargarProveedores();

      setSnackbarMensaje("Catálogo actualizado correctamente.");
      setSnackbarTipo(SNACKBAR_TYPES.SUCCESS);
      setSnackbarVisible(true);
    } catch (error) {
      switch (error.message) {
        case "NETWORK_ERROR":
          setSnackbarMensaje(
            "No hay conexión a Internet. Puedes seguir trabajando en modo offline.",
          );
          setSnackbarTipo(SNACKBAR_TYPES.WARNING);
          break;

        case "TOKEN_EXPIRED":
          setSnackbarMensaje(
            "La sesión expiró. Debes iniciar sesión nuevamente.",
          );
          setSnackbarTipo(SNACKBAR_TYPES.ERROR);
          break;

        default:
          setSnackbarMensaje("Ocurrió un error al actualizar el catálogo.");
          setSnackbarTipo(SNACKBAR_TYPES.ERROR);
          break;
      }

      setSnackbarVisible(true);
    } finally {
      setActualizandoCatalogo(false);
    }
  };
  const { obtenerAcopioHoy } = useAcopios();
  /*
  const acopios = acopioRepository.obtenerTodos();
  console.log("Lista de acopios:", acopios);
*/
  const proveedoresConAcopio = proveedoresFiltrados.map((proveedor) => {
    const acopio = obtenerAcopioHoy(proveedor.prov_id);

    return {
      ...proveedor,
      acopioHoy: acopio,
    };
  });
  return (
    <SafeAreaView style={styles.container}>
      <HeaderOperario
        pendientes={pendientes}
        onActualizarCatalogo={actualizarCatalogo}
        cargandoCatalogo={actualizandoCatalogo}
      />

      <SearchBar value={textoBusqueda} onChangeText={setTextoBusqueda} />
      <View style={styles.content}>
        <Text style={styles.title}>PROVEEDORES ACTIVOS</Text>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" />
            <Text style={styles.loadingText}>
              Cargando catálogo de proveedores...
            </Text>
          </View>
        )}

        <ListaProveedores
          proveedores={proveedoresConAcopio}
          onSeleccionar={seleccionarProveedor}
        />
      </View>
      <AcopioModal
        visible={modalVisible}
        proveedor={proveedorSeleccionado}
        onClose={() => setModalVisible(false)}
        onGuardar={cargarProveedores}
      />
      <Snackbar
        visible={snackbarVisible}
        mensaje={snackbarMensaje}
        tipo={snackbarTipo}
        onClose={() => {
          setSnackbarVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
