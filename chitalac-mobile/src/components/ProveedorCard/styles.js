import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  nombre: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },

  vereda: {
    marginTop: 5,
    color: "#777",
  },

  right: {
    alignItems: "flex-end",
  },

  left: {
    flex: 1,
  },

  litros: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  ok: {
    marginTop: 4,
    color: "#2E7D32",
  },

  pendiente: {
    color: "#F57C00",
    fontWeight: "600",
  },
});
