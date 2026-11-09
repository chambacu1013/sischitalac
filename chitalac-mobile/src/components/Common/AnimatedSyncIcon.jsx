import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function AnimatedSyncIcon({
  animando,
  size = 30,
  color = "#2563EB",
}) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation;

    if (animando) {
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
    }

    return () => animation?.stop();
  }, [animando]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ rotate }],
      }}
    >
      <MaterialIcons name="sync" size={size} color={color} />
    </Animated.View>
  );
}
