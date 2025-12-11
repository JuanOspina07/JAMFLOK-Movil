import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext } from "react";
import Toast from 'react-native-toast-message'; // Importa Toast

import GradientBackground from "../../hooks/gradientBackground";
import styles from "../../styles/styleBusinessDetails";
import { formatPrice } from "../../utils/formPrice";

import {
  cargarDatosBusiness,
  cargarReviewBusiness,
} from "../../logic/BusinessLogic";

import { CartContext } from "../../context/cartContext";
import { formatDateReview } from "../../utils/formDate";
import colors from "../../styles/colors";

export default function BusinessDetailsCliente({ route, navigation }) {
  const { idNegocio } = route.params;

  const [loading, setLoading] = useState(true);
  const [negocio, setNegocio] = useState(null);
  const [productos, setProductos] = useState([]);
  const [reseñas, setReseñas] = useState([]);
  const [search, setSearch] = useState("");
  const [expandido, setExpandido] = useState({});
  
  // Estado para animación del icono del carrito
  const [scaleAnim] = useState(new Animated.Value(1));

  const { addToCart } = useContext(CartContext);

  useFocusEffect(
    useCallback(() => {
      cargarDatosBusiness(
        idNegocio,
        setNegocio,
        setProductos,
        () => {},
        setLoading
      );
      cargarReviewBusiness(idNegocio, setReseñas);
    }, [idNegocio])
  );

  const toggleExpand = (id) => {
    setExpandido((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Función para mostrar toast personalizado
  const showToast = (productName) => {
    Toast.show({
      type: 'success',
      text1: '¡Producto agregado!',
      text2: `${productName} se agregó al carrito`,
      position: 'bottom',
      bottomOffset: 20,
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  // Función para animar el icono del carrito
  const animateCartIcon = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Función para manejar la adición al carrito con animación y toast
  const handleAddToCart = (producto) => {
    addToCart(producto);
    animateCartIcon();
    showToast(producto.NombreProducto);
  };

  const productosFiltrados = productos.filter((p) =>
    p.NombreProducto.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <GradientBackground>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar productos..."
              placeholderTextColor="#aaa"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerNegocio}>
            <Image source={{ uri: negocio.Logo }} style={styles.logo} />

            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.nombreNegocio}>{negocio.NombreNegocio}</Text>
              <Text style={styles.infoTextNuevo}>{negocio.Direccion}</Text>
              <Text style={styles.infoTextNuevo}>{negocio.Ciudad}</Text>
              <Text style={styles.infoTextNuevo}>{negocio.NumTelefono}</Text>
            </View>
          </View>

          <Text style={styles.productosTitulo}>Productos</Text>

          {productosFiltrados.length === 0 ? (
            <Text style={styles.noData}>No hay productos disponibles.</Text>
          ) : (
            productosFiltrados.map((p) => (
              <View style={styles.cardProducto} key={p.ID_PRODUCTOS}>
                <View style={styles.cardContent}>
                  <Image
                    source={{ uri: p.Imagen }}
                    style={styles.imagenProducto}
                  />

                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.nombreProducto}>
                        {p.NombreProducto}
                      </Text>

                      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <TouchableOpacity onPress={() => handleAddToCart(p)}>
                          <Ionicons name="cart" size={24} color="#2F4156" />
                        </TouchableOpacity>
                      </Animated.View>
                    </View>

                    <Text
                      numberOfLines={expandido[p.ID_PRODUCTOS] ? undefined : 3}
                      style={styles.descripcionProducto}
                    >
                      {p.Descripcion}
                    </Text>

                    <TouchableOpacity
                      onPress={() => toggleExpand(p.ID_PRODUCTOS)}
                    >
                      <Text style={styles.verMas}>
                        {expandido[p.ID_PRODUCTOS] ? "Ver menos" : "Ver más"}
                      </Text>
                    </TouchableOpacity>

                    {/* PRECIO */}
                    <Text style={styles.precioProducto}>
                      {formatPrice(p.Precio)}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}

          <View style={styles.reseñasContainer}>
            <View style={styles.reseñasHeader}>
              <Text style={styles.reseñasTitulo}>Reseñas del negocio</Text>
              <TouchableOpacity
                style={styles.botonAgregarReseña}
                onPress={() =>
                  navigation.navigate("ReviewCustomer", { idNegocio })
                }
              >
                <Ionicons name="add-circle-outline" size={28} color={colors.primary} />
                <Text style={styles.botonAgregarReseñaText}>Agregar</Text>
              </TouchableOpacity>
            </View>

            {reseñas.length === 0 ? (
              <Text style={styles.noData}>Aún no hay reseñas.</Text>
            ) : (
              reseñas.map((r) => (
                <View style={styles.cardReseña} key={r.ID_RESENA}>
                  <View style={styles.reseñaHeader}>
                    <Text style={styles.reseñaUsuario}>{r.NombreUsuario}</Text>
                    <View style={styles.reseñaStars}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Ionicons
                          key={i}
                          name={i < r.NumEstrellas ? "star" : "star-outline"}
                          size={18}
                          color={colors.primary}
                        />
                      ))}
                    </View>
                  </View>

                  <Text style={styles.reseñaComentario}>{r.Descripcion}</Text>
                  <Text style={styles.reseñaFecha}>
                    {formatDateReview(r.Fecha)}
                  </Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </GradientBackground>
  );
}