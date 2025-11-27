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
import styles from "../../styles/styleSupport";

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


