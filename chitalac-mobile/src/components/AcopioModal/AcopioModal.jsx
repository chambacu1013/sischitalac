import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  Switch,
  ActivityIndicator,
} from "react-native";

import acopioRepository from "../../database/repositories/acopioRepository";
import useAcopios from "../../hooks/useAcopios";
import Snackbar from "../../components/Snackbar";
import { SNACKBAR_TYPES } from "../../constants/snackbarTypes";
import styles from "./styles";

export default function AcopioModal({ visible, proveedor, onClose }) {
  const [guardando, setGuardando] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMensaje, setSnackbarMensaje] = useState("");
  const [snackbarTipo, setSnackbarTipo] = useState(SNACKBAR_TYPES.SUCCESS);

  const [litros, setLitros] = useState("");

  // null = todavía no se ha realizado/seleccionado la prueba
  // 0 = negativa
  // 1 = positiva
  const [pruebaAlcohol, setPruebaAlcohol] = useState(null);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [acopioActual, setAcopioActual] = useState(null);

  const snackbarTimeoutRef = useRef(null);

  const { guardarAcopio, actualizarAcopio } = useAcopios();

  useEffect(() => {
    if (!visible || !proveedor) return;

    // Ocultar cualquier Snackbar anterior
    setSnackbarVisible(false);
    setSnackbarMensaje("");
    setSnackbarTipo(SNACKBAR_TYPES.SUCCESS);

    // Cancelar timeout anterior
    if (snackbarTimeoutRef.current) {
      clearTimeout(snackbarTimeoutRef.current);
      snackbarTimeoutRef.current = null;
    }

    const acopio = acopioRepository.obtenerAcopioHoy(proveedor.prov_id);

    if (acopio) {
      setModoEdicion(true);
      setAcopioActual(acopio);

      setLitros(String(acopio.litros));

      // Mantener el valor real guardado
      setPruebaAlcohol(
        acopio.prueba_alcohol === null || acopio.prueba_alcohol === undefined
          ? null
          : Number(acopio.prueba_alcohol),
      );
    } else {
      limpiarFormulario();
    }

    return () => {
      if (snackbarTimeoutRef.current) {
        clearTimeout(snackbarTimeoutRef.current);
        snackbarTimeoutRef.current = null;
      }
    };
  }, [visible, proveedor]);

  const limpiarFormulario = () => {
    setModoEdicion(false);
    setAcopioActual(null);

    setLitros("");

    // Nuevo acopio: todavía no hay resultado de alcohol
    setPruebaAlcohol(null);
  };

  const cerrarModal = () => {
    if (snackbarTimeoutRef.current) {
      clearTimeout(snackbarTimeoutRef.current);
      snackbarTimeoutRef.current = null;
    }

    setSnackbarVisible(false);

    limpiarFormulario();
    onClose();
  };

  const mostrarSnackbar = (mensaje, tipo) => {
    setSnackbarMensaje(mensaje);
    setSnackbarTipo(tipo);
    setSnackbarVisible(true);
  };

  const guardar = async () => {
    if (guardando) return;

    if (!litros || Number(litros) <= 0) {
      mostrarSnackbar(
        "Ingrese una cantidad válida de litros.",
        SNACKBAR_TYPES.WARNING,
      );

      return;
    }

    if (pruebaAlcohol === null) {
      mostrarSnackbar(
        "Seleccione el resultado de la prueba de alcohol.",
        SNACKBAR_TYPES.WARNING,
      );

      return;
    }

    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const fechahoy = `${year}-${month}-${day}`;

    const datos = {
      proveedor_id: proveedor.prov_id,
      litros: Number(litros),
      prueba_alcohol: pruebaAlcohol,
      fecha: fechahoy,
      hora: new Date().toLocaleTimeString("es-CO"),
      estado_sync: "PENDIENTE",
    };

    try {
      setGuardando(true);

      if (modoEdicion) {
        await actualizarAcopio(acopioActual.id, datos);

        mostrarSnackbar(
          "Acopio actualizado correctamente.",
          SNACKBAR_TYPES.SUCCESS,
        );
      } else {
        await guardarAcopio(datos);

        mostrarSnackbar(
          "Acopio registrado correctamente.",
          SNACKBAR_TYPES.SUCCESS,
        );
      }
      // La operación ya terminó correctamente
      setGuardando(false);
      // Cerrar automáticamente después de mostrar la confirmación
      snackbarTimeoutRef.current = setTimeout(() => {
        snackbarTimeoutRef.current = null;
        cerrarModal();
      }, 1200);
    } catch (error) {
      console.error("Error guardando acopio:", error);

      setGuardando(false);

      if (
        error?.message?.includes("UNIQUE constraint failed") ||
        error?.message?.includes("acopios.proveedor_id, acopios.fecha")
      ) {
        mostrarSnackbar(
          "Este proveedor ya tiene un acopio registrado para hoy.",
          SNACKBAR_TYPES.WARNING,
        );
      } else {
        mostrarSnackbar(
          "No fue posible guardar el acopio.",
          SNACKBAR_TYPES.ERROR,
        );
      }
    }
  };

  if (!proveedor) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={cerrarModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>
            {modoEdicion ? "Actualizar Acopio" : "Registrar Acopio"}
          </Text>

          <Text style={styles.nombre}>
            {proveedor.prov_nom} {proveedor.prov_ape}
          </Text>

          <Text>{proveedor.prov_vereda}</Text>

          <Text style={styles.label}>LITROS ENTREGADOS</Text>

          <TextInput
            style={styles.inputLitros}
            value={litros}
            onChangeText={setLitros}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#9E9E9E"
            textAlign="center"
            maxLength={6}
          />

          <View style={styles.switchContainer}>
            <View>
              <Text style={styles.label}>Prueba de alcohol</Text>

              <Text
                style={[
                  styles.estadoAlcohol,
                  pruebaAlcohol === null && {
                    color: "#757575",
                  },
                ]}
              >
                {pruebaAlcohol === null
                  ? "NO REALIZADA"
                  : pruebaAlcohol
                    ? "POSITIVA"
                    : "NEGATIVA"}
              </Text>
            </View>

            <Switch
              value={pruebaAlcohol === 1}
              onValueChange={(value) => setPruebaAlcohol(value ? 1 : 0)}
              trackColor={{
                false: "#D32F2F",
                true: "#26A69A",
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.botonesContainer}>
            <Pressable
              style={[
                styles.boton,
                styles.botonCancelar,
                guardando && styles.botonDeshabilitado,
              ]}
              onPress={cerrarModal}
              disabled={guardando}
            >
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </Pressable>

            <Pressable
              style={[
                styles.boton,
                styles.botonGuardar,
                guardando && styles.botonDeshabilitado,
              ]}
              onPress={guardar}
              disabled={guardando}
            >
              {guardando ? (
                <>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.textoGuardar}>Guardando...</Text>
                </>
              ) : (
                <Text style={styles.textoGuardar}>
                  {modoEdicion ? "Actualizar" : "Guardar"}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>

      <Snackbar
        visible={snackbarVisible}
        mensaje={snackbarMensaje}
        tipo={snackbarTipo}
        onClose={() => setSnackbarVisible(false)}
      />
    </Modal>
  );
}
