import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },

  container: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
  },

  titulo: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },

  mensaje: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: spacing.lg,
  },

  botones: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  botonCancelar: {
    marginRight: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },

  botonConfirmar: {
    backgroundColor: "#D32F2F",
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },

  textoCancelar: {
    fontWeight: "600",
    color: colors.text,
  },

  textoConfirmar: {
    color: colors.white,
    fontWeight: "700",
  },
});
