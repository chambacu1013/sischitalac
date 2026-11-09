import React from "react";
import { Button } from "react-native-paper";

import styles from "./styles";

const LoginButton = ({ onPress }) => {
  return (
    <Button
      mode="contained"
      icon="login"
      style={styles.button}
      contentStyle={styles.content}
      onPress={onPress}
    >
      Iniciar sesión
    </Button>
  );
};

export default LoginButton;
