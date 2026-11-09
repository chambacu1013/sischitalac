import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";
export default StyleSheet.create({
  usuarioCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: spacing.xl,
    alignItems: "center",
    marginBottom: spacing.xl,
    elevation: 2,
  },

  avatar: {
    fontSize: 50,
    marginBottom: spacing.md,
  },

  nombre: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },

  rol: {
    marginTop: spacing.xs,
    fontSize: 15,
    color: "#6B7280",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
  },

  itemIzquierda: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  itemIcono: {
    fontSize: 22,
    marginRight: spacing.md,
  },

  itemTexto: {
    flex: 1,
  },

  itemTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },

  itemSubtitulo: {
    marginTop: 2,
    fontSize: 13,
    color: "#6B7280",
  },

  itemFlecha: {
    fontSize: 22,
    color: "#9CA3AF",
  },
  sectionContainer: {
    marginBottom: spacing.xl,
  },

  sectionTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },

  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    elevation: 2,
  },
  logoutButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: "#D32F2F",
    borderRadius: 12,
    paddingVertical: spacing.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },

  logoutText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  //login botton
  button: {
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 20,
  },

  content: {
    height: 50,
  },
});
