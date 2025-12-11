import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "../../hooks/gradientBackground";
import styles from "../../styles/styleReviewCustomer";
import useReviewLogic from "../../logic/ReviewCustomerLogic";
import colors from "../../styles/colors";

export default function ReviewCustomer({ route, navigation }) {
  const { idNegocio } = route.params;
  const {
    calificacion,
    setCalificacion,
    comentario,
    setComentario,
    procesando,
    enviarReseña,
    negocio,
  } = useReviewLogic(idNegocio, navigation);

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backIcon}
          >
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.titulo}>
            {negocio ? negocio.NombreNegocio : "Cargando..."}
          </Text>
        </View>
        {negocio && (
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            {negocio.Logo && (
              <View
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  overflow: "hidden",
                  marginBottom: 10,
                  backgroundColor: "#fff", // opcional para logos transparentes
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: negocio.Logo }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain" // ajusta la imagen sin recortarla
                />
              </View>
            )}
            <Text
              style={{
                fontSize: 27,
                color: colors.textPrimary,
                fontWeight: "600",
              }}
            >
              Agregar Reseña aquiiiii
            </Text>
          </View>
        )}

        {/* Card de reseña */}
        <View style={styles.card}>
          {/* Selección de estrellas */}
          <View style={styles.estrellasContainer}>
            {Array.from({ length: 5 }).map((_, i) => {
              const scale = new Animated.Value(1);

              const handlePress = () => {
                Animated.sequence([
                  Animated.timing(scale, {
                    toValue: 1.3,
                    duration: 100,
                    useNativeDriver: true,
                  }),
                  Animated.timing(scale, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                  }),
                ]).start();
                setCalificacion(i + 1);
              };

              return (
                <Animated.View key={i} style={{ transform: [{ scale }] }}>
                  <TouchableOpacity onPress={handlePress}>
                    <Ionicons
                      name={i < calificacion ? "star" : "star-outline"}
                      size={36}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          {/* Campo de texto */}
          <TextInput
            style={styles.inputComentario}
            placeholder="Escribe tu reseña..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={7}
            value={comentario}
            onChangeText={setComentario}
          />

          {/* Botón enviar */}
          <TouchableOpacity
            style={[styles.botonEnviar, procesando && { opacity: 0.7 }]}
            onPress={enviarReseña}
            disabled={procesando}
          >
            <Text style={styles.botonEnviarText}>
              {procesando ? "Enviando..." : "Enviar Reseña"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
