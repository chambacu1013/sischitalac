import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

const SAVED_USERNAME_KEY = "saved_username";
const SAVED_PASSWORD_KEY = "saved_password";

// =====================================================
// SESIÓN
// =====================================================

const guardarSesion = async (token, usuario) => {
  try {
    await AsyncStorage.multiSet([
      [TOKEN_KEY, token],
      [USER_KEY, JSON.stringify(usuario)],
    ]);
  } catch (error) {
    throw new Error("No fue posible guardar la sesión.");
  }
};

const obtenerToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    return null;
  }
};

const obtenerUsuario = async () => {
  try {
    const usuario = await AsyncStorage.getItem(USER_KEY);

    return usuario ? JSON.parse(usuario) : null;
  } catch (error) {
    return null;
  }
};

const obtenerSesion = async () => {
  try {
    const [[, token], [, usuario]] = await AsyncStorage.multiGet([
      TOKEN_KEY,
      USER_KEY,
    ]);

    return {
      token,
      usuario: usuario ? JSON.parse(usuario) : null,
    };
  } catch (error) {
    return {
      token: null,
      usuario: null,
    };
  }
};

const cerrarSesion = async () => {
  await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
};

// =====================================================
// CREDENCIALES RECORDADAS
// =====================================================

const guardarCredenciales = async (username, password) => {
  try {
    await SecureStore.setItemAsync(SAVED_USERNAME_KEY, username);

    await SecureStore.setItemAsync(SAVED_PASSWORD_KEY, password);
  } catch (error) {
    console.error("Error guardando credenciales:", error);
    throw new Error("No fue posible guardar las credenciales.");
  }
};

const obtenerCredenciales = async () => {
  try {
    const username = await SecureStore.getItemAsync(SAVED_USERNAME_KEY);

    const password = await SecureStore.getItemAsync(SAVED_PASSWORD_KEY);

    if (!username || !password) {
      return null;
    }

    return {
      username,
      password,
    };
  } catch (error) {
    console.error("Error obteniendo credenciales:", error);
    return null;
  }
};

const eliminarCredenciales = async () => {
  try {
    await SecureStore.deleteItemAsync(SAVED_USERNAME_KEY);

    await SecureStore.deleteItemAsync(SAVED_PASSWORD_KEY);
  } catch (error) {
    console.error("Error eliminando credenciales:", error);
  }
};

export default {
  guardarSesion,
  obtenerSesion,
  obtenerUsuario,
  obtenerToken,
  cerrarSesion,
  guardarCredenciales,
  obtenerCredenciales,
  eliminarCredenciales,
};
