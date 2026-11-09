import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function EstadoSyncIcon({ sincronizando, size = 30 }) {
  const [completado, setCompletado] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation;

    if (sincronizando) {
      animation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );

      animation.start();
    } else {
      rotateAnim.stopAnimation();
      rotateAnim.setValue(0);

      setCompletado(true);

      const timer = setTimeout(() => {
        setCompletado(false);
      }, 1000);

      return () => clearTimeout(timer);
    }

    return () => animation?.stop();
  }, [sincronizando]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (sincronizando) {
    return (
      <Animated.View
        style={{
          transform: [{ rotate }],
        }}
      >
        <MaterialIcons name="sync" size={size} color="#2563EB" />
      </Animated.View>
    );
  }

  if (completado) {
    return <MaterialIcons name="cloud-done" size={size} color="#22C55E" />;
  }

  return <MaterialIcons name="cloud-upload" size={size} color="#2563EB" />;
}
