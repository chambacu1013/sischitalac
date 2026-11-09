import React, { useEffect } from "react";
import { Animated, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { SNACKBAR_TYPES } from "../../constants/snackbarTypes";

export default function Snackbar({
  visible,

  mensaje,

  tipo = SNACKBAR_TYPES.INFO,

  onClose,
}) {
  function obtenerConfiguracion(tipo) {
    switch (tipo) {
      case SNACKBAR_TYPES.SUCCESS:
        return {
          color: "#106d14",
          icono: "check-circle",
        };

      case SNACKBAR_TYPES.WARNING:
        return {
          color: "#F57C00",
          icono: "warning",
        };

      case SNACKBAR_TYPES.ERROR:
        return {
          color: "#D32F2F",
          icono: "error",
        };

      case SNACKBAR_TYPES.INFO:
      default:
        return {
          color: "#1976D2",
          icono: "info",
        };
    }
  }

  const translateY = React.useRef(new Animated.Value(120)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!visible) return;

    translateY.setValue(120);
    opacity.setValue(0);

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 120,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onClose?.();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  const configuracion = obtenerConfiguracion(tipo);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: configuracion.color,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <MaterialIcons
        name={configuracion.icono}
        size={24}
        color="#FFF"
        style={styles.icono}
      />

      <View style={styles.textContainer}>
        <Text style={styles.texto}>{mensaje}</Text>
      </View>
    </Animated.View>
  );
}
