import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  headerContainer: {
    paddingTop: 70,
    paddingHorizontal: 30,
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  headerLogo: {
    width: 110,
    height: 110,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
    color: "#ffffff",
  },

  uploadBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    height: 150,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  uploadContent: {
    alignItems: "center",
  },
  uploadText: {
    color: "#6d6d6d",
    marginTop: 6,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  previewLogo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 50,
  },
  label: {
    color: "#fff",
    marginBottom: 5,
    fontWeight: "600",
  },

  inputBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 6,
    color: colors.textSecundary,
  },
  input: {
    flex: 1,
    height: "100%",
  },

  textArea: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    height: 120,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#0d2b4c",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 17,
  },
  pickerBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
  },
  picker: {
    width: "100%",
    height: 55,
  },
});
