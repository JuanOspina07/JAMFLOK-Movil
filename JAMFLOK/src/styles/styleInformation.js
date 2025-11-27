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
    maxWidth: 328,
    backgroundColor: "#ede9e6",
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 18,
    marginTop: 85,
    marginBottom: 80,
  },
  scrollViewContainer: {
    width: "100%",
    flexDirection: "row",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  // Barra de scroll personalizada
  scrollBarContainer: {
    width: 6,
    backgroundColor: "rgba(41, 58, 80, 0.1)", // Color de fondo de la barra (muy claro)
    borderRadius: 3,
    marginLeft: 8,
    marginVertical: 5,
  },
  scrollBarThumb: {
    width: 6,
    backgroundColor: "#293a50", // Color de la barra (igual al texto)
    borderRadius: 3,
    position: "absolute",
    left: 0,
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
    color: "#293a50",
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
    color: "#293a50",
    marginBottom: 8,
    textAlign: "left",
    fontWeight: "600",
  },
  sectionContent: {
    fontFamily: typography.regular,
    fontSize: 14,
    textAlign: "left",
    color: "#293a50",
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