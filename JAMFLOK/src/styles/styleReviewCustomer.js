import { StyleSheet, Dimensions } from "react-native";
import colors from "./colors";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    alignItems: "center",
    top:60
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },

  backIcon: {
    marginRight: 10,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.textPrimary,
    textAlign: "center",
    flex: 1,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 30,
  },

  estrellasContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10,
  },

  inputComentario: {
    backgroundColor: "#F7F7F7",
    borderRadius: 15,
    padding: 20,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 25,
    minHeight: 150,
  },

  botonEnviar: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },

  botonEnviarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
