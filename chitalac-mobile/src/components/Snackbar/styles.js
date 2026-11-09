import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",

    // Antes estaba en 25
    bottom: 120,

    left: 16,
    right: 16,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingVertical: 14,

    borderRadius: 12,

    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  icono: {
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  texto: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
