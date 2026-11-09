import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";
export default StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  cardOnline: {
    borderLeftWidth: 5,
    borderLeftColor: "#22C55E",
  },

  cardOffline: {
    borderLeftWidth: 5,
    borderLeftColor: "#EF4444",
  },

  titulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 14,
  },

  estadoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },

  estadoTexto: {
    fontSize: 16,
    fontWeight: "700",
  },

  onlineTexto: {
    color: "#15803D",
  },

  offlineTexto: {
    color: "#DC2626",
  },

  descripcion: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  fechaTexto: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563EB",
  },
  resumenTitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563EB",
  },
  botonContainer: {
    marginTop: 16,
  },

  botonSync: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#2563EB",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  botonDeshabilitado: {
    backgroundColor: "#94A3B8",
  },

  textoBoton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },

  indicadorContainer: {
    marginTop: 12,
    paddingHorizontal: 8,
  },

  mensajeBoton: {
    textAlign: "center",
    fontSize: 13,
    color: "#64748B",
    lineHeight: 20,
  },
});
