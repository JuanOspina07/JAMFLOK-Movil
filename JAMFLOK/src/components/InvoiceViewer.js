// components/InvoiceViewer.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { downloadInvoiceLogic, viewInvoiceLogic } from '../logic/ShoppingCartLogic';
import Toast from 'react-native-toast-message';

export default function InvoiceViewer({ idFactura, onClose }) {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  React.useEffect(() => {
    loadInvoice();
  }, []);

  const loadInvoice = async () => {
    try {
      setLoading(true);
      const result = await viewInvoiceLogic(idFactura);
      setInvoice(result.factura);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la factura');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadInvoiceLogic(idFactura);
      Toast.show({
        type: 'success',
        text1: 'Factura descargada',
        text2: 'La factura se ha descargado correctamente',
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo descargar la factura');
      console.error(error);
    } finally {
      setDownloading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando factura...</Text>
      </View>
    );
  }

  if (!invoice) {
    return (
      <View style={styles.container}>
        <Text>No se encontró la factura</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Factura #{invoice.factura.numeroFactura}</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Información de la factura */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de la factura</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Número:</Text>
            <Text style={styles.infoValue}>{invoice.factura.numeroFactura}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fecha:</Text>
            <Text style={styles.infoValue}>{formatDate(invoice.factura.fechaPago)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total:</Text>
            <Text style={[styles.infoValue, styles.total]}>
              {formatPrice(invoice.factura.total)}
            </Text>
          </View>
        </View>

        {/* Información del cliente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del cliente</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre:</Text>
            <Text style={styles.infoValue}>{invoice.factura.usuario.nombre}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{invoice.factura.usuario.email}</Text>
          </View>
        </View>

        {/* Productos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Productos ({invoice.productos.length})</Text>
          {invoice.productos.map((producto, index) => (
            <View key={index} style={styles.productItem}>
              <Text style={styles.productName}>{producto.nombreProducto}</Text>
              <View style={styles.productDetails}>
                <Text style={styles.productText}>
                  {producto.cantidad} x {formatPrice(producto.precioUnitario)}
                </Text>
                <Text style={styles.productSubtotal}>
                  {formatPrice(producto.subtotal)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Resumen */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>{formatPrice(invoice.factura.subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total:</Text>
            <Text style={[styles.summaryValue, styles.finalTotal]}>
              {formatPrice(invoice.factura.total)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Botones de acción */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.downloadButton]}
          onPress={handleDownload}
          disabled={downloading}
        >
          <Ionicons name="download-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>
            {downloading ? 'Descargando...' : 'Descargar PDF'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
          <Text style={[styles.buttonText, styles.closeButtonText]}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  total: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  productItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productText: {
    fontSize: 13,
    color: '#666',
  },
  productSubtotal: {
    fontSize: 14,
    fontWeight: '500',
  },
  summary: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  finalTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  downloadButton: {
    backgroundColor: '#007AFF',
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  closeButtonText: {
    color: '#333',
  },
});