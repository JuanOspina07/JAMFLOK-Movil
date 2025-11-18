import { StyleSheet } from "react-native";
import colors from "./colors";

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
  nombreNegocio: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginTop: 20,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 10,
    resizeMode: "contain",
  },
  productosTitulo: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "bold",
  },
  cardProducto: {
    width: "100%",
    backgroundColor: colors.textPrimary,
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.primary,
    borderLeftWidth: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  imagenProducto: {
    width: 110,
    height: 110,
    borderRadius: 15,
  },
  infoProducto: {
    flex: 1,
    paddingRight: 0,
    justifyContent: "space-between",
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2F4156",
    flex: 1,
    marginRight: 10,
  },
  descripcionProducto: {
    fontSize: 14,
    color: colors.icon,
    marginVertical: 4,
  },
  precioProducto: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 5,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 5,
  },
  noData: {
    color: "#ddd",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
  verMas: {
    color: "#2F6FEE",
    fontWeight: "bold",
    marginTop: 2,
  },
  headerNegocio: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
    alignSelf: "center",
  },
  btnSmall: {
    backgroundColor: "#2F4156",
    padding: 6,
    borderRadius: 8,
  },
  infoBoxNuevo: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoTextNuevo: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 10,
    flexShrink: 1,
  },
  productosHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 10,
  },
  btnAdd: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2F4156",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  btnAddText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 14,
  },

  //Estilo de reseñas
  reseñasContainer: {
    marginTop: 30,
  },

  reseñasTitulo: {
    color: colors.textSecundary,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  cardReseña: {
    backgroundColor: colors.textPrimary,
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderLeftColor: colors.primary,
    borderLeftWidth: 6,
  },

  reseñaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  reseñaUsuario: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textSecundary,
  },

  reseñaStars: {
    flexDirection: "row",
    alignItems: "center",
  },

  reseñaComentario: {
    marginTop: 6,
    fontSize: 15,
    color: colors.icon,
  },

  reseñaFecha: {
    marginTop: 6,
    fontSize: 12,
    color: colors.icon,
    textAlign: "right",
  },
});
