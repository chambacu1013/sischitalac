import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export default StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.md,
  },

  estadoContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 10,
  },

  estadoTexto: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  usuarioContainer: {
    flex: 1,
  },

  usuarioNombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },

  botonActualizar: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 10,
  },

  botonTexto: {
    color: colors.white,
    fontWeight: "600",
  },
  fechaQuincena: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "500",
  },
});
