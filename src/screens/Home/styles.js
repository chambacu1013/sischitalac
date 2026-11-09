import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  content: {
    flex: 1,
    padding: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0c0303",
  },

  empty: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 40,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  loadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
});
