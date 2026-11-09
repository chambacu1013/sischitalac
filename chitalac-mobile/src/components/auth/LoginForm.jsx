import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Card,
  Checkbox,
  HelperText,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import useAuth from "../../hooks/useAuth";
import usuarioRepository from "../../repositories/usuarioRepository";

const LoginForm = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recordarCredenciales, setRecordarCredenciales] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensajeCarga, setMensajeCarga] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    const cargarCredencialesGuardadas = async () => {
      const credenciales = await usuarioRepository.obtenerCredenciales();

      if (!activo || !credenciales) return;

      setUsername(credenciales.username);
      setPassword(credenciales.password);
      setRecordarCredenciales(true);
    };

    cargarCredencialesGuardadas();

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setMensajeCarga("");
      return;
    }

    const timer = setTimeout(() => {
      setMensajeCarga(
        "Conectando con el servidor. Puede tardar unos segundos mientras el servicio se activa...",
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [loading]);

  const handleLogin = async () => {
    if (loading) return;

    setError("");
    setMensajeCarga("");

    if (!username.trim()) {
      setError("Ingrese el usuario.");
      return;
    }

    if (!password.trim()) {
      setError("Ingrese la contraseña.");
      return;
    }

    try {
      setLoading(true);

      await login(username.trim(), password, recordarCredenciales);

      navigation.goBack();
    } catch (err) {
      setError(err?.message || "No fue posible iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="headlineSmall" style={styles.titulo}>
          Iniciar sesión
        </Text>

        <TextInput
          label="Usuario"
          mode="outlined"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          left={<TextInput.Icon icon="account" />}
          style={styles.input}
        />

        <TextInput
          label="Contraseña"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!mostrarPassword}
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon
              icon={mostrarPassword ? "eye-off" : "eye"}
              onPress={() => setMostrarPassword(!mostrarPassword)}
            />
          }
          style={styles.input}
        />

        <View style={styles.recordarContainer}>
          <Checkbox
            status={recordarCredenciales ? "checked" : "unchecked"}
            onPress={() => setRecordarCredenciales((actual) => !actual)}
          />
          <Text
            onPress={() => setRecordarCredenciales((actual) => !actual)}
            style={styles.recordarTexto}
          >
            Recordar credenciales
          </Text>
        </View>

        {!!error && (
          <HelperText type="error" visible>
            {error}
          </HelperText>
        )}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating size="large" />
            {!!mensajeCarga && (
              <Text style={styles.mensajeCarga}>{mensajeCarga}</Text>
            )}
          </View>
        ) : (
          <Button mode="contained" onPress={handleLogin} style={styles.boton}>
            Iniciar sesión
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    paddingVertical: 10,
  },
  titulo: {
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 25,
  },
  recordarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10,
    marginBottom: 10,
  },
  recordarTexto: {
    flex: 1,
  },
  boton: {
    marginTop: 25,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  mensajeCarga: {
    marginTop: 12,
    textAlign: "center",
  },
});

export default LoginForm;
