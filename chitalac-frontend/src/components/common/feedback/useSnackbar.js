import { useState } from "react";

export default function useSnackbar() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const mostrarSuccess = (message) => {
    setSnackbar({
      open: true,
      severity: "success",
      message,
    });
  };

  const mostrarError = (message) => {
    setSnackbar({
      open: true,
      severity: "error",
      message,
    });
  };

  const mostrarWarning = (message) => {
    setSnackbar({
      open: true,
      severity: "warning",
      message,
    });
  };

  const mostrarInfo = (message) => {
    setSnackbar({
      open: true,
      severity: "info",
      message,
    });
  };

  const cerrarSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return {
    snackbar,
    mostrarSuccess,
    mostrarError,
    mostrarWarning,
    mostrarInfo,
    cerrarSnackbar,
  };
}
