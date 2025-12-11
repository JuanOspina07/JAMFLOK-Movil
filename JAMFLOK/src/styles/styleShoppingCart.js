import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    width:"100%",
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 25,
  },

  emptyText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 60,
    opacity: 0.9,
  },

 card: {
  flexDirection: "row",
  position: "relative",
  backgroundColor: "#fff",
  width:"97%",
  borderRadius: 20,
  padding: 20,
  marginBottom: 25,
  alignItems: "center",
  borderLeftColor: colors.primary,
  borderLeftWidth: 8,
  elevation: 6,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 },
  alignSelf:"center"
},


 image: {
  width: 100,
  height: 100,
  borderRadius: 15,
},


  cardContent: {
  flex: 1,
  marginLeft: 12,
  paddingVertical: 4,
},


  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    paddingRight: 25,
    marginBottom: 4,
  },

  priceRow: {
    justifyContent: "space-between",
    marginTop: 10,
    marginRight: 6,
  },

  productPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: "#222",
  },

  subtotalRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 6,
    marginTop: 2,
  },

  subtotalLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#777",
  },

  subtotalValue: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },

  priceBlock: {
    marginTop: 4,
    marginBottom: 4,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },

  qtyButton: {
    backgroundColor: "#EFEFEF",
    padding: 6,
    borderRadius: 8,
  },

  qtyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },

  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#E63946",
    padding: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: "center",
  },

  totalText: {
    color: colors.icon,
    fontSize: 22,
    fontWeight: "900",
  },

  itemsText: {
    color: colors.icon,
    fontSize: 12,
  },

  footerButtons: {
    flexDirection: "row",
    gap: 12,
  },

  clearButton: {
    backgroundColor: "#FF3E3E",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 3,
  },

  clearButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
  },

  buyButton: {
    backgroundColor: "#28C76F",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
  },

  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10,
    color: colors.primary,
  },

  modalLabel: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },

  modalAmount: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.primary,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 18,
  },

  modalCancel: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  modalCancelText: {
    color: "#555",
    fontSize: 16,
  },

  modalConfirm: {
    backgroundColor: "#28C76F",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  modalvaciar: {
    backgroundColor: "#FF3E3E",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  modalConfirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  // Agrega estos estilos a tu archivo de estilos existente
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
},
modalContainer: {
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 24,
  width: '100%',
  maxWidth: 400,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 16,
  textAlign: 'center',
},
modalLabel: {
  fontSize: 14,
  color: '#666',
  marginBottom: 8,
},
modalAmount: {
  fontSize: 18,
  fontWeight: 'bold',
  color: colors.primary,
  marginVertical: 8,
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 24,
  gap: 12,
},
modalCancel: {
  flex: 1,
  backgroundColor: '#f5f5f5',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},
modalCancelText: {
  color: '#666',
  fontWeight: '600',
},
modalConfirm: {
  flex: 1,
  backgroundColor: colors.primary,
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},
modalConfirmText: {
  color: '#fff',
  fontWeight: '600',
},
modalInput: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 10,
  backgroundColor: '#fff',
  fontSize: 16,
},
paymentOption: {
  backgroundColor: '#f9f9f9',
  borderRadius: 12,
  padding: 16,
  borderWidth: 1,
  borderColor: '#ddd',
  marginBottom: 10,
},
paymentOptionText: {
  fontSize: 12,
  color: '#333',
  textAlign: 'center',
},
});
