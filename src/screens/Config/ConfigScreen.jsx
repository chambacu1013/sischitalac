import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import useAuth from "../../hooks/useAuth";

import LogoHeader from "../../components/Common/LogoHeader";

import EstadoSesionCard from "../../components/Config/EstadoSesionCard/EstadoSesionCard";
//import SystemInfoCard from "../../components/Config/SystemInfoCard/SystemInfoCard";
import LoginButton from "../../components/Config/LoginButton";
import LogoutButton from "../../components/Config/LogoutButton";

import ConfirmDialog from "../../components/ConfirmDialog";
import Snackbar from "../../components/Snackbar";
import { SNACKBAR_TYPES } from "../../constants/snackbarTypes";

import styles from "./stylesConfig";

export default function ConfigScreen() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const navigation = useNavigation();

  const { autenticado, usuario, logout } = useAuth();
  const cerrarSesion = async () => {
    setDialogVisible(false);
    await logout();
    setSnackbarVisible(true);
  };
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleLogout = () => {
    setDialogVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LogoHeader />

        <EstadoSesionCard autenticado={autenticado} usuario={usuario} />

        {/*  <SystemInfoCard appInfo={APP_INFO} /> */}

        {autenticado ? (
          <LogoutButton onPress={handleLogout} />
        ) : (
          <LoginButton onPress={handleLogin} />
        )}
      </ScrollView>

      <ConfirmDialog
        visible={dialogVisible}
        titulo="Cerrar sesión"
        mensaje="¿Está seguro de que desea cerrar la sesión?"
        textoCancelar="Cancelar"
        textoConfirmar="Cerrar sesión"
        onCancelar={() => setDialogVisible(false)}
        onConfirmar={cerrarSesion}
      />

      <Snackbar
        visible={snackbarVisible}
        mensaje="Sesión cerrada correctamente."
        tipo={SNACKBAR_TYPES.SUCCESS}
        onClose={() => setSnackbarVisible(false)}
      />
    </SafeAreaView>
  );
}
