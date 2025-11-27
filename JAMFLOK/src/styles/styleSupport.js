import { StyleSheet } from "react-native";
import colors from "./colors";
import fonts from "./fonts";
export default StyleSheet.create({
  bigCard: {
    width: "92%",
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: colors.primary, // Azul del borde real
    borderRadius: 20,
    alignSelf: "center",
    paddingVertical: 25,
    paddingHorizontal: 15,
  },

  bigTitle: {
    fontSize: 26,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginBottom: 25,
    color: colors.primary, // Azul grisáceo del título
  },

  sectionHeader: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#1F2D3D", // Gris oscuro como en los botones
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#1F2D3D",
  },

  subContent: {
    marginBottom: 20,
    marginTop: -5,
  },

  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: "#1F2D3D",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },

  questionText: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#1F2D3D",
  },

  answerBox: {
    backgroundColor: "#F1F3F5",
    padding: 12,
    borderWidth: 2,
    borderColor: "#1F2D3D",
    borderRadius: 12,
    marginBottom: 10,
  },

  answerText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#1F2D3D",
  },

  subText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    color: colors.icon, // Gris real del texto
    fontFamily: "Poppins-Medium",
  },

  contactBtn: {
    marginTop: 15,
    backgroundColor: "#1E324D", // Azul real del botón
    paddingVertical: 14,
    borderRadius: 20,
    alignSelf: "center",
    width: "60%",
  },

  contactText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
});