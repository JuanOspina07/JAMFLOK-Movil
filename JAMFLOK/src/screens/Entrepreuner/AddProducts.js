import React from "react";
import { Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "../../hooks/gradientBackground";
import styles from "../../styles/styleAddProducts";
import useAddProductsLogic from "../../logic/AddProductsLogic";
import colors from "../../styles/colors";

export default function AddProducts({ route, navigation }) {
  const { idNegocio } = route.params;

  const {
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    precio,
    setPrecio,
    stock,
    setStock,
    imagen,
    pickImage,
    crearProductoLogic,
    loading,
  } = useAddProductsLogic(idNegocio);

  const guardarProducto = async () => {
    const exito = await crearProductoLogic();
    if (exito !== false) navigation.goBack();
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Añadir Producto</Text>
       
        </View>
      </SafeAreaView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.card}>
          <Text style={styles.label}>Nombre del producto</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="fast-food-outline" size={22} color={colors.primary}/>
            <TextInput
              style={styles.input}
              placeholder="Ej: Hamburguesa doble"
              placeholderTextColor="#8f9ba8"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <Text style={styles.label}>Descripción</Text>
          <View style={[styles.inputContainer, { height: 120, alignItems: "flex-start" }]}>
            <Ionicons name="document-text-outline" size={22}color={colors.primary} style={{ marginTop: 10 }} />
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              placeholder="Describe el producto..."
              placeholderTextColor="#8f9ba8"
              value={descripcion}
              onChangeText={setDescripcion}
            />
          </View>

          <Text style={styles.label}>Precio</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="pricetag-outline" size={22} color={colors.primary} />
            <TextInput
              style={styles.input}
              placeholder="Ej: 15000"
              keyboardType="numeric"
              placeholderTextColor="#8f9ba8"
              value={precio}
              onChangeText={setPrecio}
            />
          </View>

          <Text style={styles.label}>Stock</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="cube-outline" size={22} color={colors.primary} />
            <TextInput
              style={styles.input}
              placeholder="Ej: 10"
              keyboardType="numeric"
              placeholderTextColor="#8f9ba8"
              value={stock}
              onChangeText={setStock}
            />
          </View>

          <Text style={styles.label}>Imagen del producto</Text>
          <TouchableOpacity
            style={imagen ? styles.preview : styles.previewPlaceholder}
            onPress={() => pickImage()}
            activeOpacity={0.75}
          >
            {imagen ? (
              <Image source={{ uri: imagen }} style={styles.image} resizeMode="cover" />
            ) : (
              <>
                <Ionicons name="image-outline" size={50} color="#9aa5b1" />
                <Text style={styles.previewText}>Subir imagen</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnGuardar} onPress={guardarProducto}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnGuardarText}>Guardar Producto</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </GradientBackground>
  );
}
