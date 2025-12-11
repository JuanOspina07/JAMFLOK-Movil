import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  RefreshControl 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getUserOrders } from '../../services/ShoppingCartService';
import { downloadInvoiceLogic, openInvoiceLogic } from '../../logic/ShoppingCartLogic';
import Toast from 'react-native-toast-message';
import api from '../../services/api';
import { AuthContext } from '../../context/authContext'; // Importar el contexto

export default function OrderHistory({ route, navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Obtener el token del contexto de autenticación
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      if (!token) {
        setError('No hay sesión activa. Por favor, inicia sesión.');
        setLoading(false);
        return;
      }

      console.log('Token obtenido del contexto:', token ? 'Token presente' : 'Token ausente');
      console.log('ID Usuario del contexto:', user?.idUsuario);

      const userOrdersResponse = await getUserOrders(token, user.idUsuario);
      
      console.log('Respuesta del API de pedidos:', userOrdersResponse);
      
      let rawOrders = [];
      if (userOrdersResponse && Array.isArray(userOrdersResponse)) {
        console.log('Pedidos recibidos como array:', userOrdersResponse.length);
        rawOrders = userOrdersResponse;
      } else if (userOrdersResponse && userOrdersResponse.data && Array.isArray(userOrdersResponse.data)) {
        console.log('Pedidos recibidos en propiedad data:', userOrdersResponse.data.length);
        rawOrders = userOrdersResponse.data;
      } else if (userOrdersResponse && userOrdersResponse.pedidos && Array.isArray(userOrdersResponse.pedidos)) {
        console.log('Pedidos recibidos en propiedad pedidos:', userOrdersResponse.pedidos.length);
        rawOrders = userOrdersResponse.pedidos;
      } else {
        console.log('No se encontraron pedidos en la respuesta');
        rawOrders = [];
      }

      // Agrupar por ID_PEDIDO
      const groupedOrders = rawOrders.reduce((acc, item) => {
        const pedidoId = item.ID_PEDIDO;
        if (!acc[pedidoId]) {
          acc[pedidoId] = {
            id: pedidoId,
            facturaId: item.ID_FACTURA,
            numeroFactura: item.NumeroFactura || null,
            fecha: item.FechaCreacion,
            estado: item.NombreEstado,
            total: parseFloat(item.Total || item.Monto || 0),
            metodoPago: item.MetodoPago,
            codigoSeguimiento: item.CodigoSeguimiento,
            fechaEntregaEstimada: item.FechaEntregaEstimada,
            fechaEntregaReal: item.FechaEntregaReal,
            notas: item.Notas,
            items: []
          };
        }
        acc[pedidoId].items.push({
          idProducto: item.ID_PRODUCTOS,
          nombre: item.NombreProducto,
          cantidad: item.Cantidad,
          precio: parseFloat(item.PrecioUnitario || 0),
          subtotal: parseFloat(item.SubtotalDetalle || 0),
          imagen: item.Imagen
        });
        return acc;
      }, {});

      // Convertir a array y ordenar por fecha descendente
      const sortedOrders = Object.values(groupedOrders).sort((a, b) => 
        new Date(b.fecha) - new Date(a.fecha)
      );

      setOrders(sortedOrders);
      setError(null);
    } catch (err) {
      console.error("Error cargando pedidos:", err);
      console.error("Error detallado:", err.response?.data || err.message);
      setError(err.message || "No se pudieron cargar los pedidos. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const handleDownloadInvoice = async (facturaId, orderNumber) => {
    try {
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Debes iniciar sesión para descargar facturas",
          position: "bottom",
        });
        return;
      }

      await downloadInvoiceLogic(facturaId, orderNumber, token);
      
      Toast.show({
        type: "success",
        text1: "Factura descargada",
        text2: "Tu factura se ha descargado correctamente.",
        position: "bottom",
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error("Error descargando factura:", error);
      
      try {
        await openInvoiceLogic(facturaId, orderNumber);
      } catch (browserError) {
        Alert.alert(
          "No se pudo abrir la factura",
          `Tu factura #${orderNumber} está disponible en:\n\n${api.defaults.baseURL}/facturas/${facturaId}/descargar`,
          [{ text: "OK", style: "cancel" }]
        );
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Fecha inválida';
      
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Fecha inválida';
    }
  };

  const getStatusColor = (status) => {
    if (!status) return '#757575';
    
    switch(status.toLowerCase()) {
      case 'completado':
      case 'entregado':
      case 'completed':
        return '#4CAF50';
      case 'pendiente':
      case 'pending':
        return '#FF9800';
      case 'cancelado':
      case 'cancelled':
      case 'canceled':
        return '#F44336';
      case 'en_proceso':
      case 'procesando':
      case 'processing':
        return '#2196F3';
      default:
        return '#757575';
    }
  };

  const renderOrderItem = (order, index) => {
    console.log('Renderizando pedido:', order);
    
    const orderNumber = order.numeroFactura || order.id;
    const orderDate = order.fecha;
    const orderStatus = order.estado || 'Pendiente';
    const orderTotal = order.total || 0;
    const uniqueKey = `order-${order.id}-${index}`;
    
    return (
      <View key={uniqueKey} style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderNumber}>Pedido #{orderNumber}</Text>
            <Text style={styles.orderDate}>{formatDate(orderDate)}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(orderStatus) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(orderStatus) }]}>
              {orderStatus}
            </Text>
          </View>
        </View>

        <View style={styles.orderDetails}>
          {order.items && order.items.length > 0 ? (
            order.items.map((item, itemIndex) => (
              <View key={`${uniqueKey}-item-${itemIndex}`} style={styles.itemRow}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.nombre || 'Producto'} x{item.cantidad || 1}
                </Text>
                <Text style={styles.itemPrice}>
                  ${(item.precio * (item.cantidad || 1)).toFixed(2)}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noItemsText}>No hay detalles de productos disponibles</Text>
          )}
          
          <View style={styles.divider} />
          
          <View style={styles.orderFooter}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>${orderTotal.toFixed(2)}</Text>
            </View>
            
            {order.facturaId && (
              <TouchableOpacity 
                style={styles.invoiceButton}
                onPress={() => handleDownloadInvoice(order.facturaId, orderNumber)}
              >
                <Ionicons name="document-text-outline" size={20} color="#007AFF" />
                <Text style={styles.invoiceButtonText}>Factura</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando pedidos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={60} color="#FF6B6B" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchOrders}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Pedidos</Text>
        <TouchableOpacity 
          style={styles.refreshButton} 
          onPress={fetchOrders}
        >
          <Ionicons name="refresh" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
          />
        }
      >
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={80} color="#CCCCCC" />
            <Text style={styles.emptyTitle}>No hay pedidos</Text>
            <Text style={styles.emptySubtitle}>Aún no has realizado ningún pedido</Text>
            <TouchableOpacity 
              style={styles.shopButton}
              onPress={() => navigation.navigate('Customer')}
            >
              <Text style={styles.shopButtonText}>Comenzar a comprar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{orders.length}</Text>
                <Text style={styles.statLabel}>Total Pedidos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </Text>
                <Text style={styles.statLabel}>Total Gastado</Text>
              </View>
            </View>
            
            <Text style={styles.sectionTitle}>Historial de Pedidos</Text>
            {orders.map((order, index) => renderOrderItem(order, index))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 8,
  },
  refreshButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    marginTop: 10,
    marginBottom: 20,
    color: '#F44336',
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 50,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    color: '#333',
  },
  orderCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    marginRight: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  noItemsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  invoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  invoiceButtonText: {
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 6,
  },
});