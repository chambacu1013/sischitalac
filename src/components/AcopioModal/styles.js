import { StyleSheet } from "react-native";

import { colors } from "../../theme";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    marginBottom: 45,
    backgroundColor: "rgba(0,0,0,.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 15,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 35,
  },

  nombre: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 1,
  },
  label: {
    marginTop: 14,
    fontSize: 15,
    fontWeight: "700",
    color: "#424242",
    letterSpacing: 0.5,
  },

  switchContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingVertical: 4,
  },

  estadoAlcohol: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "500",
    color: "#616161",
  },

  inputLitros: {
    marginTop: 10,
    height: 55,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    color: "#212121",
    textAlign: "center",
  },
  botonesContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  boton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  botonCancelar: {
    backgroundColor: "#ECEFF1",
  },

  textoCancelar: {
    color: "#424242",
    fontSize: 16,
    fontWeight: "600",
  },
  botonGuardar: {
    backgroundColor: "#2E7D32",
  },

  textoGuardar: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
});
