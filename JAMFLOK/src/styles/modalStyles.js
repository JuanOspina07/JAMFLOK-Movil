import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },

  text: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btnCancel: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#bbb",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  btnOk: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#2F4156",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
