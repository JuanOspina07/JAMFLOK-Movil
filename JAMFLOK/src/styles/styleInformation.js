import { StyleSheet, Dimensions } from "react-native";
import colors from "./colors";
import typography from "./fonts";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  mainContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  card: {
    width: "100%",
    maxWidth: 380, // Reducido de 400 a 380 (un poco más pequeño)
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    paddingVertical: 22, // Reducido de 25 a 22
    paddingHorizontal: 18, // Reducido de 20 a 18
    marginTop: 20,
    marginBottom: 20,
  },
  scrollContainer: {
    width: "100%",
  },
  scrollContent: {
    paddingBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontFamily: typography.bold,
    fontSize: 24,
    color: "#404040", // Cambiado a gris oscuro
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "600",
  },
  section: {
    marginBottom: 20,
    width: "100%",
  },
  sectionTitle: {
    fontFamily: typography.bold,
    fontSize: 18,
    color: "#404040", // Cambiado a gris oscuro
    marginBottom: 8,
    textAlign: "left",
    fontWeight: "600",
  },
  sectionContent: {
    fontFamily: typography.regular,
    fontSize: 14,
    textAlign: "left",
    color: "#404040", // Cambiado a gris oscuro
    opacity: 0.9,
    lineHeight: 20,
  },
  footer: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },
  footerText: {
    fontFamily: typography.medium,
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  footerSeparator: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.6)",
  },
});