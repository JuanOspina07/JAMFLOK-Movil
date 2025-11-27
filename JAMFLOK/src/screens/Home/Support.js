import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import GradientBackground from "../../hooks/gradientBackground";
import { useLoadFonts } from "../../hooks/loadFonts";
import stylesGlobal from "../../styles/stylesGlobal";

// Para animaciones suaves en Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Support() {
  const fontsLoaded = useLoadFonts();

  const [showClientes, setShowClientes] = useState(false);
  const [showEmprendedores, setShowEmprendedores] = useState(false);
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  if (!fontsLoaded) return <View />;

  const preguntasClientes = [
    {
      pregunta: "¿Cómo comprar un producto?",
      respuesta:
        "Puedes comprar un producto entrando a la tienda, seleccionando el artículo y presionando 'Comprar'.",
    },
    {
      pregunta: "¿Dónde veo mis pedidos?",
      respuesta: "En tu perfil encontrarás la sección 'Mis pedidos'.",
    },
    {
      pregunta: "¿Cómo hacer reclamos?",
      respuesta: "Desde la sección Soporte puedes enviar un reclamo detallado.",
    },
  ];

  const preguntasEmprendedores = [
    {
      pregunta: "¿Cómo creo mi tienda?",
      respuesta:
        "Ve a la sección Emprender y selecciona 'Crear tienda'. Sigue los pasos indicados.",
    },
    {
      pregunta: "¿Cómo publico un producto?",
      respuesta:
        "Desde tu panel de emprendedor selecciona 'Agregar producto'.",
    },
    {
      pregunta: "¿Cómo ver estadísticas?",
      respuesta:
        "En la sección de estadísticas encontrarás métricas sobre ventas y visitas.",
    },
    {
      pregunta: "¿Puedo editar un producto?",
      respuesta:
        "Sí. Ve a tu lista de productos, selecciona uno y presiona 'Editar'.",
    },
  ];

  const toggleClientes = () => {
    LayoutAnimation.easeInEaseOut();
    setShowClientes(!showClientes);
  };

  const toggleEmprendedores = () => {
    LayoutAnimation.easeInEaseOut();
    setShowEmprendedores(!showEmprendedores);
  };

  const togglePregunta = (id) => {
    LayoutAnimation.easeInEaseOut();
    setPreguntaAbierta(preguntaAbierta === id ? null : id);
  };

  return (
    <GradientBackground>
      <View style={stylesGlobal.container}>

        {/* CUADRO GENERAL */}
        <View style={styles.bigCard}>
          <Text style={styles.bigTitle}>Temas de Ayuda</Text>

          {/* CLIENTES */}
          <TouchableOpacity style={styles.sectionHeader} onPress={toggleClientes}>
            <Text style={styles.sectionTitle}>Para Clientes</Text>
            <Ionicons
              name={showClientes ? "chevron-up" : "chevron-down"}
              size={26}
              color="#000"
            />
          </TouchableOpacity>

          {showClientes && (
            <View style={styles.subContent}>
              {preguntasClientes.map((item, i) => (
                <View key={i}>
                  <TouchableOpacity
                    style={styles.questionRow}
                    onPress={() => togglePregunta(`cliente-${i}`)}
                  >
                    <Text style={styles.questionText}>{item.pregunta}</Text>
                    <Ionicons
                      name={
                        preguntaAbierta === `cliente-${i}`
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={22}
                      color="#000"
                    />
                  </TouchableOpacity>

                  {preguntaAbierta === `cliente-${i}` && (
                    <View style={styles.answerBox}>
                      <Text style={styles.answerText}>{item.respuesta}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* EMPRENDEDORES */}
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={toggleEmprendedores}
          >
            <Text style={styles.sectionTitle}>Para Emprendedores</Text>
            <MaterialCommunityIcons
              name={showEmprendedores ? "chevron-up" : "chevron-down"}
              size={26}
              color="#000"
            />
          </TouchableOpacity>

          {showEmprendedores && (
            <View style={styles.subContent}>
              {preguntasEmprendedores.map((item, i) => (
                <View key={i}>
                  <TouchableOpacity
                    style={styles.questionRow}
                    onPress={() => togglePregunta(`emprende-${i}`)}
                  >
                    <Text style={styles.questionText}>{item.pregunta}</Text>
                    <Ionicons
                      name={
                        preguntaAbierta === `emprende-${i}`
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={22}
                      color="#000"
                    />
                  </TouchableOpacity>

                  {preguntaAbierta === `emprende-${i}` && (
                    <View style={styles.answerBox}>
                      <Text style={styles.answerText}>{item.respuesta}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* BOTÓN FINAL */}
          <Text style={styles.subText}>¿Aún no resolvimos tu duda?</Text>

          <TouchableOpacity style={styles.contactBtn}>
            <Text style={styles.contactText}>Contáctanos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  bigCard: {
    width: "92%",
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#1A5FA7", // Azul del borde real
    borderRadius: 20,
    alignSelf: "center",
    paddingVertical: 25,
    paddingHorizontal: 15,
  },

  bigTitle: {
    fontSize: 26,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginBottom: 25,
    color: "#2C3B4A", // Azul grisáceo del título
  },

  sectionHeader: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#1F2D3D", // Gris oscuro como en los botones
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#1F2D3D",
  },

  subContent: {
    marginBottom: 20,
    marginTop: -5,
  },

  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: "#1F2D3D",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },

  questionText: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#1F2D3D",
  },

  answerBox: {
    backgroundColor: "#F1F3F5",
    padding: 12,
    borderWidth: 2,
    borderColor: "#1F2D3D",
    borderRadius: 12,
    marginBottom: 10,
  },

  answerText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#1F2D3D",
  },

  subText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    color: "#5E6A75", // Gris real del texto
    fontFamily: "Poppins-Medium",
  },

  contactBtn: {
    marginTop: 15,
    backgroundColor: "#1E324D", // Azul real del botón
    paddingVertical: 14,
    borderRadius: 20,
    alignSelf: "center",
    width: "60%",
  },

  contactText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
});
