import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import GradientBackground from "../../hooks/gradientBackground";
import ConfirmModal from "../../components/ConfirmModal";
import Toast from "react-native-toast-message";
import styles from "../../styles/styleBusinessDetails";
import { formatDateReview } from "../../utils/formDate";
import { formatPrice } from "../../utils/formPrice";

import {
  cargarDatosBusiness,
  cargarReviewBusiness,
  cambiarEstadoNegocioLogic,
  cambiarEstadoProductoLogic,
} from "../../logic/BusinessLogic";

export default function AdminBusinessDetail({ route, navigation }) {
  const { idNegocio } = route.params;

  const [loading, setLoading] = useState(true);
  const [negocio, setNegocio] = useState(null);
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [expandido, setExpandido] = useState({});
  const [estadoNegocio, setEstadoNegocio] = useState(false);
  const [reseñas, setReseñas] = useState([]);

  const [modalNegocioVisible, setModalNegocioVisible] = useState(false);
  const [modalProductoVisible, setModalProductoVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useFocusEffect(
    useCallback(() => {
      cargarDatosBusiness(
        idNegocio,
        setNegocio,
        setProductos,
        setEstadoNegocio,
        setLoading
      );
      cargarReviewBusiness(idNegocio, setReseñas);
    }, [idNegocio])
  );

  const toggleExpand = (id) => {
    setExpandido((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const AddProduct = () => {
    navigation.navigate("AddProducts", { idNegocio });
  };

  const confirmarCambioNegocio = async () => {
    setModalNegocioVisible(false);
    await cambiarEstadoNegocioLogic(
      idNegocio,
      estadoNegocio,
      negocio,
      setEstadoNegocio,
      setNegocio
    );
  };

  const abrirModalProducto = (producto) => {
    setProductoSeleccionado(producto);
    setModalProductoVisible(true);
  };

  const confirmarCambioProducto = async () => {
    setModalProductoVisible(false);
    await cambiarEstadoProductoLogic(productoSeleccionado, setProductos);
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

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.headerNegocio}>
            <Image source={{ uri: negocio.Logo }} style={styles.logo} />

            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.nombreNegocio}>{negocio.NombreNegocio}</Text>

              <View style={styles.rowButtons}>
                <TouchableOpacity style={styles.btnSmall} onPress={AddProduct}>
                  <Ionicons name="pencil" size={18} color="#fff" />
                </TouchableOpacity>

                <Switch
                  value={estadoNegocio}
                  onValueChange={() => setModalNegocioVisible(true)}
                  thumbColor="#fff"
                  trackColor={{ true: "#2F4156", false: "#777" }}
                />
              </View>
            </View>
          </View>

          <View style={styles.infoBoxNuevo}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={18} color="#2F4156" />
              <Text style={styles.infoTextNuevo}>{negocio.Direccion}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="business" size={18} color="#2F4156" />
              <Text style={styles.infoTextNuevo}>{negocio.Ciudad}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="call" size={18} color="#2F4156" />
              <Text style={styles.infoTextNuevo}>{negocio.NumTelefono}</Text>
            </View>
          </View>

          <View style={styles.productosHeader}>
            <Text style={styles.productosTitulo}>Productos</Text>

            <TouchableOpacity
              style={styles.btnAdd}
              onPress={() => navigation.navigate("AddProducts", { idNegocio })}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.btnAddText}>Añadir Producto</Text>
            </TouchableOpacity>
          </View>

          <View>
            {productosFiltrados.length === 0 ? (
              <Text style={styles.noData}>No hay productos registrados.</Text>
            ) : (
              productosFiltrados.map((p) => (
                <View style={styles.cardProducto} key={p.ID_PRODUCTOS}>
                  <View style={styles.topRow}>
                    <TouchableOpacity
                      onPress={() =>
                        Toast.show({
                          type: "info",
                          text1: "Nombre del producto",
                          text2: p.NombreProducto,
                          position: "bottom",
                          visibilityTime: 2000,
                        })
                      }
                      style={{ flex: 1 }}
                    >
                      <Text style={styles.nombreProducto} numberOfLines={1}>
                        {p.NombreProducto}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("EditarProducto", {
                          idProducto: p.ID_PRODUCTOS,
                        })
                      }
                    >
                      <Ionicons name="pencil" size={20} color="#2F4156" />
                    </TouchableOpacity>

                    <Switch
                      value={p.Estado === 1}
                      onValueChange={() => abrirModalProducto(p)}
                      thumbColor="#fff"
                      trackColor={{ true: "#2F4156", false: "#999" }}
                    />
                  </View>

                  <View style={styles.cardContent}>
                    <Image
                      source={{ uri: p.Imagen }}
                      style={styles.imagenProducto}
                    />

                    <View style={styles.infoProducto}>
                      <Text
                        style={styles.descripcionProducto}
                        numberOfLines={
                          expandido[p.ID_PRODUCTOS] ? undefined : 3
                        }
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

                      <Text style={styles.precioProducto}>
                        {formatPrice(p.Precio)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>

          <View style={styles.reseñasContainer}>
            <Text style={styles.reseñasTitulo}>Reseñas del negocio</Text>

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
                          color="#FFDF00"
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

      <ConfirmModal
        visible={modalNegocioVisible}
        mensaje="¿Seguro que deseas cambiar el estado del negocio?"
        onCancel={() => setModalNegocioVisible(false)}
        onConfirm={confirmarCambioNegocio}
      />

      <ConfirmModal
        visible={modalProductoVisible}
        mensaje="¿Seguro que deseas cambiar el estado de este producto?"
        onCancel={() => setModalProductoVisible(false)}
        onConfirm={confirmarCambioProducto}
      />
    </GradientBackground>
  );
}
