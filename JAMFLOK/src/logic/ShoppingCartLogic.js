// logic/ShoppingCartLogic.js
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystemLegacy from 'expo-file-system/legacy'; // API legacy
import * as Sharing from 'expo-sharing';
import api from "../services/api";

// Función para descargar la factura en PDF (API legacy - funciona)
const downloadInvoicePDF = async (idFactura, fileName) => {
  try {
    const downloadUrl = `${api.defaults.baseURL}/facturas/${idFactura}/descargar`;
    console.log("Descargando factura desde:", downloadUrl);
    
    // Crear nombre de archivo
    const fileUri = FileSystemLegacy.documentDirectory + (fileName || `factura-${idFactura}.pdf`);
    
    console.log("Guardando en:", fileUri);
    
    // Descargar usando API legacy
    const downloadResumable = FileSystemLegacy.createDownloadResumable(
      downloadUrl,
      fileUri,
      {},
      (downloadProgress) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        console.log(`Progreso de descarga: ${progress * 100}%`);
      }
    );

    // Iniciar descarga
    const { uri } = await downloadResumable.downloadAsync();
    console.log("Factura descargada en:", uri);

    // Intentar compartir/abrir el archivo
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: 'Compartir factura',
      UTI: 'com.adobe.pdf'
    });

    return uri;
  } catch (error) {
    console.error("Error al descargar la factura:", error);
    throw new Error("No se pudo descargar la factura. Puedes descargarla más tarde desde tu historial de pedidos.");
  }
};

// Función alternativa: abrir factura en navegador/visor PDF
const openInvoiceInBrowser = async (idFactura, numeroFactura) => {
  try {
    const { Linking, Alert } = require("react-native");
    const downloadUrl = `${api.defaults.baseURL}/facturas/${idFactura}/descargar`;
    
    // Verificar si podemos abrir la URL
    const supported = await Linking.canOpenURL(downloadUrl);
    
    if (supported) {
      await Linking.openURL(downloadUrl);
      return true;
    } else {
      // Si no se puede abrir, mostrar alerta con opción para copiar URL
      Alert.alert(
        "No se puede abrir automáticamente",
        `Tu factura #${numeroFactura} está disponible en:\n\n${downloadUrl}`,
        [
          {
            text: "Copiar URL",
            onPress: () => {
              Alert.alert("URL disponible", "Pega esta URL en tu navegador");
            }
          },
          { text: "OK", style: "cancel" }
        ]
      );
      return false;
    }
  } catch (error) {
    console.error("Error al abrir factura en navegador:", error);
    throw error;
  }
};

// Procesar el pago y descargar factura
export const processPaymentLogic = async (
  cart,
  paymentMethod,
  shippingAddress,
  userNotes,
  idUsuario,
  setProcessing,
  clearCart,
  navigation
) => {
  try {
    setProcessing(true);

    if (!idUsuario) {
      throw new Error("Se requiere ID de usuario para procesar el pago");
    }

    // Preparar datos para el pago
    const productos = cart.map((item) => ({
      idProducto: item.ID_PRODUCTOS,
      cantidad: item.cantidad || 1,
      precioUnitario: item.Precio,
    }));

    const paymentData = {
      productos,
      metodoPago: paymentMethod,
      direccionEnvio: shippingAddress || "Dirección no especificada",
      notas: userNotes || "",
      idUsuario: idUsuario,
    };

    console.log("Enviando datos de pago:", paymentData);

    // Procesar pago
    const result = await api.post("/pagos", paymentData);
    
    if (result.data.success) {
      const { idFactura, numeroFactura, pedidosCreados } = result.data.data;
      
      // Limpiar carrito
      clearCart();

      // Mostrar Toast de éxito
      Toast.show({
        type: "success",
        text1: "¡Compra realizada!",
        text2: "Tu pedido ha sido procesado correctamente.",
        position: "bottom",
        visibilityTime: 3000,
      });

      

      // Navegar a la pantalla de confirmación
      if (navigation && navigation.navigate) {
        setTimeout(() => {
          navigation.navigate("OrderConfirmation", {
            orderId: idFactura,
            orderNumber: numeroFactura,
            orderDetails: result.data.data,
            pedidosCreados: pedidosCreados,
          });
        }, 2000);
      }

      return result.data;
    } else {
      throw new Error(result.data.message || "Error en el procesamiento del pago");
    }
  } catch (error) {
    console.error("Error en processPaymentLogic:", error);
    
    // Manejar errores específicos
    if (error.response?.data?.message) {
      const errorMsg = error.response.data.message.toLowerCase();
      
      if (errorMsg.includes("stock")) {
        let productName = "un producto";
        const match = errorMsg.match(/para\s+(.+?)\s+/i);
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
      } else {
        Toast.show({
          type: "error",
          text1: "Error en el pago",
          text2: error.response.data.message,
          position: "bottom",
          visibilityTime: 3000,
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error en el pago",
        text2: error.message || "No se pudo procesar el pago. Intenta de nuevo.",
        position: "bottom",
        visibilityTime: 3000,
      });
    }
    
    throw error;
  } finally {
    setProcessing(false);
  }
};



// Resto de las funciones permanecen igual
export const calculateTotalLogic = (cart) => {
  return cart.reduce((acc, item) => {
    const precio = Number(item.Precio) || 0;
    const cantidad = item.cantidad || 1;
    return acc + (precio * cantidad);
  }, 0);
};

export const calculateSubtotalLogic = (price, quantity) => {
  const precio = Number(price) || 0;
  const cantidad = quantity || 1;
  return precio * cantidad;
};

export const validateCreditCardLogic = (cardNumber, expiry, cvv) => {
  const errors = [];
  const cleanCardNumber = cardNumber.replace(/\s/g, '');
  
  if (!/^\d{16}$/.test(cleanCardNumber)) {
    errors.push("El número de tarjeta debe tener 16 dígitos");
  }

  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    errors.push("La fecha de expiración debe estar en formato MM/AA");
  } else {
    const [month, year] = expiry.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (month < 1 || month > 12) {
      errors.push("El mes debe estar entre 01 y 12");
    }
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.push("La tarjeta ha expirado");
    }
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    errors.push("El CVV debe tener 3 o 4 dígitos");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const generateBankTransferDataLogic = () => {
  return {
    bankName: "PSE",
    accountNumber: "6845-0513-2527-1101",
    accountType: "Cuenta Corriente",
    accountHolder: "JAMFLOK",
    reference: `REF-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
  };
};