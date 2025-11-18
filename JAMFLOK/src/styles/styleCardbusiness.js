import { StyleSheet } from "react-native";
import colors from "./colors";
import fonts from "./fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
    width: "100%",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#000",
  },

  title: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.textPrimary,
    marginVertical: 10,
    textAlign: "center",
  },
  scroll: {
    marginBottom: 0,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "rgba(66, 87, 111, 0.3)",
    width: "100%",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "rgba(47, 65, 86, 0.7)",
  },
  mainImage: {
    width: "100%",
    height: 140,
    borderBottomWidth: 20,
    resizeMode: "cover",
  },
  starsContainer: {
    position: "absolute",
    top: 8,
    right: 10,
    flexDirection: "row",
    zIndex: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 12,
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 10,

    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",

    resizeMode: "contain",
  },
  infoContainer: {
    paddingTop: 20,
    paddingHorizontal: 12,
    paddingBottom: 12,

    borderTopWidth: 2,
    borderTopColor: "rgba(47, 65, 86, 0.7)",
  },
  nombre: {
    fontWeight: "900",
    color: colors.textPrimary,
    fontSize: 16,
    marginBottom: 5,
  },
  categoria: {
    color: "#404040",
    fontSize: 13,
    marginBottom: 5,
  },
  descripcion: {
    color: colors.textPrimary,
    fontSize: 15,
    marginBottom: 10,
  },
  noData: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 30,
    opacity: 0.8,
  },
});
