// screens/ShoppingCartScreen.js
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { CartContext } from "../../context/cartContext";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "../../hooks/gradientBackground";
import styles from "../../styles/styleShoppingCart";
import Toast from "react-native-toast-message";
import { formatPrice } from "../../utils/formPrice";
import { useNavigation } from "@react-navigation/native";

// Importar lógica
import {
  calculateTotalLogic,
  calculateSubtotalLogic,
  processPaymentLogic,
  validateCreditCardLogic,
  generateBankTransferDataLogic,
} from "../../logic/ShoppingCartLogic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/authContext";

export default function ShoppingCart() {
  const navigation = useNavigation();
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } = useContext(CartContext);
  const { user, loading: authLoading } = useContext(AuthContext); // OBTÉN EL USUARIO DEL CONTEXTO
  
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalClearOpen, setModalClearOpen] = useState(false);
  const [modalPaymentMethodsOpen, setModalPaymentMethodsOpen] = useState(false);
  const [modalPaymentDetailsOpen, setModalPaymentDetailsOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Estados para datos de pago
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    shippingAddress: "",
    userNotes: "",
  });
  
  const [bankTransferData, setBankTransferData] = useState(null);

  // Calcular total usando la lógica
  const total = calculateTotalLogic(cart);

  const handleConfirmPurchase = () => {
    // Verificar si el usuario está autenticado antes de proceder
    if (!user || !user.idUsuario) {
      Alert.alert(
        "Inicia sesión",
        "Debes iniciar sesión para realizar una compra",
        [
          { text: "Cancelar", style: "cancel" },
          { 
            text: "Iniciar sesión", 
            onPress: () => {
              setModalConfirmOpen(false);
              navigation.navigate("Login");
            }
          }
        ]
      );
      return;
    }
    
    setModalConfirmOpen(false);
    setModalPaymentMethodsOpen(true);
  };

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setModalPaymentMethodsOpen(false);
    
    if (method === "bank_transfer") {
      const bankData = generateBankTransferDataLogic();
      setBankTransferData(bankData);
    }
    
    setModalPaymentDetailsOpen(true);
  };

  const handleProcessPayment = async () => {
    try {
     

      // Validar datos según el método seleccionado
      if (selectedMethod === "credit_card") {
        const validation = validateCreditCardLogic(
          paymentDetails.cardNumber,
          paymentDetails.expiry,
          paymentDetails.cvv
        );
        
        if (!validation.isValid) {
          Alert.alert("Error de validación", validation.errors.join("\n"));
          return;
        }
      }

      // Validar dirección de envío
      if (!paymentDetails.shippingAddress.trim() && selectedMethod !== "cash") {
        Alert.alert("Dirección requerida", "Por favor ingresa una dirección de envío");
        return;
      }

      // Verificar que haya productos en el carrito
      if (cart.length === 0) {
        Alert.alert("Carrito vacío", "No hay productos en el carrito");
        return;
      }

      console.log("Procesando pago para usuario ID:", user.idUsuario);
      
      await processPaymentLogic(
        cart,
        selectedMethod,
        paymentDetails.shippingAddress,
        paymentDetails.userNotes,
        user.idUsuario, // USAR EL ID DEL CONTEXTO
        setProcessing,
        clearCart,
        navigation
      );

      // Cerrar modales y limpiar estado
      setModalPaymentDetailsOpen(false);
      setSelectedMethod(null);
      setPaymentDetails({
        cardNumber: "",
        expiry: "",
        cvv: "",
        shippingAddress: "",
        userNotes: "",
      });
      setBankTransferData(null);
      
    } catch (error) {
      console.error("Error en el pago:", error);
      
      // Mostrar Toast específico para errores de stock
      if (error.message && error.message.toLowerCase().includes("stock")) {
        // Extraer nombre del producto del mensaje de error
        let productName = "el producto";
        const match = error.message.match(/para\s+(.+?)\s+/i);
        if (match) {
          productName = match[1];
        }
        
        Toast.show({
          type: "error",
          text1: "Stock insuficiente",
          text2: `No hay suficiente stock disponible para ${productName}`,
          position: "bottom",
          visibilityTime: 4000,
        });
      } else if (error.message && error.message.includes("Unknown column")) {
        // Error de base de datos
        Toast.show({
          type: "error",
          text1: "Error del sistema",
          text2: "Hay un problema técnico. Por favor, contacta al soporte.",
          position: "bottom",
          visibilityTime: 4000,
        });
      } else {
        // Error general
        Toast.show({
          type: "error",
          text1: "Error en el pago",
          text2: error.message || "No se pudo procesar el pago. Intenta de nuevo.",
          position: "bottom",
          visibilityTime: 3000,
        });
      }
    }
  };
  // Usar las funciones DIRECTAMENTE del contexto
  const handleIncreaseQty = (productId) => {
    increaseQty(productId); // Función directa del contexto
  };

  const handleDecreaseQty = (productId) => {
    decreaseQty(productId); // Función directa del contexto
  };

  const handleRemoveProduct = (productId) => {
    removeFromCart(productId); // Función directa del contexto
    Toast.show({
      type: "success",
      text1: "Producto eliminado",
      text2: "El producto ha sido removido del carrito",
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const formatCardNumber = (text) => {
    // Formatear como XXXX XXXX XXXX XXXX
    const cleaned = text.replace(/\s/g, '').replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : '';
  };

  const formatExpiry = (text) => {
    // Formatear como MM/AA
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const renderPaymentDetails = () => {
    switch (selectedMethod) {
      case "credit_card":
        return (
          <View style={{ marginVertical: 12 }}>
            <Text style={[styles.modalLabel, { marginBottom: 8 }]}>Número de tarjeta:</Text>
            <TextInput
              style={[styles.modalInput, { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }]}
              value={paymentDetails.cardNumber}
              onChangeText={(text) => setPaymentDetails(prev => ({ 
                ...prev, 
                cardNumber: formatCardNumber(text) 
              }))}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              maxLength={19}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={[styles.modalLabel, { marginBottom: 8 }]}>Expiración:</Text>
                <TextInput
                  style={[styles.modalInput, { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }]}
                  value={paymentDetails.expiry}
                  onChangeText={(text) => setPaymentDetails(prev => ({ 
                    ...prev, 
                    expiry: formatExpiry(text) 
                  }))}
                  placeholder="MM/AA"
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={[styles.modalLabel, { marginBottom: 8 }]}>CVV:</Text>
                <TextInput
                  style={[styles.modalInput, { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }]}
                  value={paymentDetails.cvv}
                  onChangeText={(text) => setPaymentDetails(prev => ({ ...prev, cvv: text.replace(/\D/g, '') }))}
                  placeholder="123"
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>
            
            <Text style={[styles.modalLabel, { marginTop: 12, marginBottom: 8 }]}>Dirección de envío:</Text>
            <TextInput
              style={[styles.modalInput, { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, minHeight: 60 }]}
              value={paymentDetails.shippingAddress}
              onChangeText={(text) => setPaymentDetails(prev => ({ ...prev, shippingAddress: text }))}
              placeholder="Ingresa tu dirección completa"
              multiline
              numberOfLines={3}
            />
            
            <Text style={[styles.modalLabel, { marginTop: 12, marginBottom: 8 }]}>Notas adicionales:</Text>
            <TextInput
              style={[styles.modalInput, { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, minHeight: 40 }]}
              value={paymentDetails.userNotes}
              onChangeText={(text) => setPaymentDetails(prev => ({ ...prev, userNotes: text }))}
              placeholder="Instrucciones especiales para la entrega"
              multiline
            />
          </View>
        );
        
      case "paypal":
        return (
          <View style={{ marginVertical: 12, alignItems: 'center' }}>
            <Ionicons name="logo-paypal" size={48} color="#0070BA" style={{ marginBottom: 12 }} />
            <Text style={[styles.modalLabel, { textAlign: 'center' }]}>Conectando con PayPal...</Text>
            <Text style={[styles.modalAmount, { textAlign: 'center', marginTop: 8 }]}>
              Serás redirigido a PayPal para completar el pago de forma segura.
            </Text>
            
            <Text style={[styles.modalLabel, { marginTop: 20, marginBottom: 8 }]}>Dirección de envío:</Text>
            <TextInput
              style={[styles.modalInput, { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, minHeight: 60 }]}
              value={paymentDetails.shippingAddress}
              onChangeText={(text) => setPaymentDetails(prev => ({ ...prev, shippingAddress: text }))}
              placeholder="Ingresa tu dirección completa"
              multiline
              numberOfLines={3}
            />
          </View>
        );
        
      case "bank_transfer":
        return (
          <View style={{ marginVertical: 12 }}>
            <Text style={[styles.modalLabel, { marginBottom: 8 }]}>Instrucciones de transferencia bancaria:</Text>
            <View style={{ backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' }}>
              <Text style={styles.modalAmount}>Banco: {bankTransferData?.bankName || "BANCO EJEMPLO"}</Text>
              <Text style={styles.modalAmount}>Cuenta: {bankTransferData?.accountNumber || "123456789"}</Text>
              <Text style={styles.modalAmount}>Titular: {bankTransferData?.accountHolder || "TIENDA ONLINE"}</Text>
              <Text style={[styles.modalAmount, { color: '#007AFF', fontWeight: 'bold' }]}>
                Referencia: {bankTransferData?.reference || "REF-123456"}
              </Text>
              <Text style={[styles.modalAmount, { fontSize: 12, color: '#666', marginTop: 8 }]}>
                Usa esta referencia en tu transferencia para identificar el pago.
              </Text>
            </View>
            
            <Text style={[styles.modalLabel, { marginTop: 20, marginBottom: 8 }]}>Dirección de envío:</Text>
            <TextInput
              style={[styles.modalInput, { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, minHeight: 60 }]}
              value={paymentDetails.shippingAddress}
              onChangeText={(text) => setPaymentDetails(prev => ({ ...prev, shippingAddress: text }))}
              placeholder="Ingresa tu dirección completa"
              multiline
              numberOfLines={3}
            />
            
            <Text style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
              Una vez realizada la transferencia, tu pedido será procesado en un plazo de 24-48 horas.
            </Text>
          </View>
        );
        
      case "cash":
        return (
          <View style={{ marginVertical: 12, alignItems: 'center' }}>
            <Ionicons name="cash-outline" size={48} color="#333" style={{ marginBottom: 12 }} />
            <Text style={[styles.modalLabel, { textAlign: 'center' }]}>Pago en efectivo</Text>
            <Text style={[styles.modalAmount, { textAlign: 'center', marginTop: 8 }]}>
              Paga al recibir tu pedido en efectivo.
            </Text>
            
            <Text style={[styles.modalLabel, { marginTop: 20, marginBottom: 8 }]}>Dirección de envío:</Text>
            <TextInput
              style={[styles.modalInput, { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, minHeight: 60, width: '100%' }]}
              value={paymentDetails.shippingAddress}
              onChangeText={(text) => setPaymentDetails(prev => ({ ...prev, shippingAddress: text }))}
              placeholder="Ingresa tu dirección completa"
              multiline
              numberOfLines={3}
            />
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Carrito de compras</Text>

        {cart.length === 0 ? (
          <Text style={styles.emptyText}>El carrito está vacío.</Text>
        ) : (
          <>
            <ScrollView style={{ marginBottom: 135 }}>
              {cart.map((p) => (
                <View key={p.ID_PRODUCTOS} style={styles.card}>
                  <Image source={{ uri: p.Imagen }} style={styles.image} />

                  <View style={styles.cardContent}>
                    <Text style={styles.productName} numberOfLines={2}>
                      {p.NombreProducto}
                    </Text>

                    <View style={styles.priceBlock}>
                      <Text style={styles.productPrice}>
                        {formatPrice(p.Precio)}
                      </Text>

                      <View style={styles.subtotalRow}>
                        <Text style={styles.subtotalLabel}>Subtotal:</Text>
                        <Text style={styles.subtotalValue}>
                          {formatPrice(calculateSubtotalLogic(p.Precio, p.cantidad))}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => handleDecreaseQty(p.ID_PRODUCTOS)}
                      >
                        <Ionicons name="remove" size={18} color="#333" />
                      </TouchableOpacity>

                      <Text style={styles.qtyText}>{p.cantidad || 1}</Text>

                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => handleIncreaseQty(p.ID_PRODUCTOS)}
                      >
                        <Ionicons name="add" size={18} color="#333" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleRemoveProduct(p.ID_PRODUCTOS)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            {/* FOOTER */}
            <View style={styles.footer}>
              <View>
                <Text style={styles.totalText}>Total: {formatPrice(total)}</Text>
                <Text style={styles.itemsText}>
                  {cart.length} artículo{cart.length > 1 ? "s" : ""}
                </Text>
              </View>

              <View style={styles.footerButtons}>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => setModalClearOpen(true)}
                >
                  <Text style={styles.clearButtonText}>Vaciar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() => setModalConfirmOpen(true)}
                >
                  <Text style={styles.buyButtonText}>Comprar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        {/* MODAL DE CONFIRMACIÓN DE COMPRA */}
        <Modal
          visible={modalConfirmOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalConfirmOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Confirmar compra</Text>
              
              <Text style={styles.modalLabel}>Total a pagar:</Text>
              <Text style={styles.modalAmount}>{formatPrice(total)}</Text>
              
              <Text style={[styles.modalLabel, { marginTop: 16 }]}>
                ¿Estás seguro de que deseas proceder con la compra?
              </Text>
              
              <View style={styles.modalButtons}>
                <Pressable
                  style={styles.modalCancel}
                  onPress={() => setModalConfirmOpen(false)}
                >
                  <Text style={styles.modalCancelText}>Cancelar</Text>
                </Pressable>
                
                <Pressable
                  style={[styles.modalConfirm, processing && { opacity: 0.7 }]}
                  onPress={handleConfirmPurchase}
                  disabled={processing}
                >
                  <Text style={styles.modalConfirmText}>
                    {processing ? "Procesando..." : "Continuar"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* MODAL DE MÉTODOS DE PAGO */}
        <Modal
          visible={modalPaymentMethodsOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalPaymentMethodsOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Selecciona método de pago</Text>
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 20 }}>
                <TouchableOpacity
                  style={[styles.paymentOption, { alignItems: 'center', width: '48%' }]}
                  onPress={() => handleSelectMethod("credit_card")}
                >
                  <Ionicons name="card-outline" size={32} color="#333" style={{ marginBottom: 8 }} />
                  <Text style={styles.paymentOptionText}>Tarjeta de Crédito</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.paymentOption, { alignItems: 'center', width: '48%' }]}
                  onPress={() => handleSelectMethod("paypal")}
                >
                  <Ionicons name="logo-paypal" size={32} color="#0070BA" style={{ marginBottom: 8 }} />
                  <Text style={styles.paymentOptionText}>PayPal</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.paymentOption, { alignItems: 'center', width: '48%', marginTop: 12 }]}
                  onPress={() => handleSelectMethod("bank_transfer")}
                >
                  <Ionicons name="business-outline" size={32} color="#333" style={{ marginBottom: 8 }} />
                  <Text style={styles.paymentOptionText}>Transferencia</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.paymentOption, { alignItems: 'center', width: '48%', marginTop: 12 }]}
                  onPress={() => handleSelectMethod("cash")}
                >
                  <Ionicons name="cash-outline" size={32} color="#333" style={{ marginBottom: 8 }} />
                  <Text style={styles.paymentOptionText}>Efectivo</Text>
                </TouchableOpacity>
              </View>
              
              <Pressable
                style={[styles.modalCancel, { alignSelf: 'center', marginTop: 10 }]}
                onPress={() => setModalPaymentMethodsOpen(false)}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* MODAL DE DETALLES DE PAGO */}
        <Modal
          visible={modalPaymentDetailsOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalPaymentDetailsOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {selectedMethod === "credit_card" ? "Pago con Tarjeta" : 
                 selectedMethod === "paypal" ? "Pago con PayPal" :
                 selectedMethod === "bank_transfer" ? "Transferencia Bancaria" :
                 selectedMethod === "cash" ? "Pago en Efectivo" : "Detalles de Pago"}
              </Text>
              
              {renderPaymentDetails()}
              
              <View style={styles.modalButtons}>
                <Pressable
                  style={styles.modalCancel}
                  onPress={() => setModalPaymentDetailsOpen(false)}
                >
                  <Text style={styles.modalCancelText}>Cancelar</Text>
                </Pressable>
                
                <Pressable
                  style={[styles.modalConfirm, processing && { opacity: 0.7 }]}
                  onPress={handleProcessPayment}
                  disabled={processing}
                >
                  <Text style={styles.modalConfirmText}>
                    {processing ? "Procesando..." : "Confirmar Pago"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* MODAL DE VACIAR CARRITO */}
        <Modal
          visible={modalClearOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalClearOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Vaciar carrito</Text>
              
              <Text style={styles.modalLabel}>
                ¿Estás seguro de que deseas eliminar todos los productos del carrito?
              </Text>
              
              <View style={styles.modalButtons}>
                <Pressable
                  style={styles.modalCancel}
                  onPress={() => setModalClearOpen(false)}
                >
                  <Text style={styles.modalCancelText}>Cancelar</Text>
                </Pressable>
                
                <Pressable
                  style={[styles.modalConfirm, { backgroundColor: '#FF3B30' }]}
                  onPress={() => {
                    clearCart();
                    setModalClearOpen(false);
                  }}
                >
                  <Text style={styles.modalConfirmText}>Vaciar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </GradientBackground>
  );
}