import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  headerContainer: {
    paddingTop: 70,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.textPrimary,
    borderRadius: 16,
    width: 200,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },

  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.textSecundary,
  },
  modalOptionLogout: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 15,
  },

  modalOptionText: {
    color: colors.textSecundary,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  modalOptionTextLogout: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },

  modalOptionIcon: {
    color: colors.textSecundary,
  },
  modalOptionIconLogout: {
    color: "red",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.textSecundary,
    fontSize: 16,
    marginLeft: 20,
  },
  value: {
    color: colors.icon,
    fontSize: 15,
    marginLeft: 20,
    marginBottom: 3,
  },
  loadingText: {
    color: colors.textPrimary,
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
