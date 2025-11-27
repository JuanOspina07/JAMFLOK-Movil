import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    width: "95%",
  },
  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 25,
    elevation: 5,
    width: "100%",
  },
  label: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 6,
    fontWeight: "300",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 15,
    color: colors.textSecundary,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    elevation: 3,
  },
  saveText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  profileWrapper: {
    alignSelf: "center",
    marginTop: 0,
    marginBottom: 25,
    position: "relative",
  },
  editIconSmall: {
    position: "absolute",
    bottom: 8,
    right: 12,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignSelf: "flex-start",
    marginTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
