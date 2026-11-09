import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  titulo: {
    fontSize: typography.h2?.fontSize || 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
  },
});
