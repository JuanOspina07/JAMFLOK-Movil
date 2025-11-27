import { StyleSheet, Dimensions } from "react-native";
import colors from "./colors";
import typography from "./fonts";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  mainContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 28,
    paddingVertical: 35,
    paddingHorizontal: 26,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  logo: {
    width: 115,
    height: 115,
    marginBottom: 18,
    resizeMode: "contain",
  },

  title: {
    fontFamily: typography.bold,
    fontSize: 26,
    color: colors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontFamily: typography.regular,
    fontSize: 15,
    textAlign: "center",
    color: colors.textPrimary,
    opacity: 0.85,
    lineHeight: 22,
    marginBottom: 35,
    paddingHorizontal: 10,
  },

  inputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 14,
    height: 52,
    justifyContent: "center",
    paddingHorizontal: 18,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },

  input: {
    fontFamily: typography.regular,
    fontSize: 16,
    color: "#000",
  },

  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },

  button: {
    width: "70%", 
    height: 52, 
    borderRadius: 26, 
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  buttonText: {
    color: "#fff",
    fontFamily: typography.bold,
    fontSize: 18,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  backLink: {
    marginTop: 12,
  },

  backText: {
    fontFamily: typography.regular,
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
  },

footer: {
  position: "absolute",
  bottom: 35,
  left: 20,
  right: 20,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.18)",
  paddingVertical: 14,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.35)",
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 6 },
  elevation: 8,
},

footerText: {
  fontFamily: typography.medium,
  fontSize: 17,
  color: "#3a495aff",
  fontWeight: "600",
},

footerSeparator: {
  fontSize: 20,
  color: "rgba(255,255,255,0.7)",
  marginHorizontal: 18,
},

});