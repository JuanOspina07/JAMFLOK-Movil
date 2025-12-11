import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import GradientBackground from "../../hooks/gradientBackground";
import { useLoadFonts } from "../../hooks/loadFonts";
import stylesGlobal from "../../styles/stylesGlobal";
import colors from "../../styles/colors";



export default function Support() {
  const fontsLoaded = useLoadFonts();

  const [showClientes, setShowClientes] = useState(false);
  const [showEmprendedores, setShowEmprendedores] = useState(false);
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  if (!fontsLoaded) return <View />;

  const preguntasClientes = [
    {
      pregunta: "¿Cómo comprar un producto?",
      respuesta: "Entra a la tienda, selecciona el artículo, elige tus opciones y presiona 'Comprar'.",
    },
    {
      pregunta: "¿Dónde veo mis pedidos?",
      respuesta: "Ve a tu Perfil (icono de usuario) y busca la sección 'Mis pedidos'.",
    },
    {
      pregunta: "¿Cómo hacer reclamos?",
      respuesta: "Usa el botón de 'Ayuda' en el detalle de tu compra para iniciar un chat con soporte.",
    },
  ];

  const preguntasEmprendedores = [
    {
      pregunta: "¿Cómo creo mi tienda?",
      respuesta: "En el menú principal, ve a 'Emprender' y sigue el asistente de configuración paso a paso.",
    },
    {
      pregunta: "¿Cómo publico un producto?",
      respuesta: "Desde tu panel, pulsa el botón (+) y carga las fotos y descripción del artículo.",
    },
    {
      pregunta: "¿Cómo ver estadísticas?",
      respuesta: "Tu panel de control muestra visitas y ventas en tiempo real.",
    },
    {
      pregunta: "¿Puedo editar un producto?",
      respuesta: "Sí, ve a 'Mis Productos', selecciona el lápiz y guarda los cambios.",
    },
  ];

  const toggleSection = (section) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (section === 'clientes') {
      const newState = !showClientes;
      setShowClientes(newState);
      if (newState) setShowEmprendedores(false);
    } else {
      const newState = !showEmprendedores;
      setShowEmprendedores(newState);
      if (newState) setShowClientes(false);
    }
    setPreguntaAbierta(null);
  };

  const togglePregunta = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setPreguntaAbierta(preguntaAbierta === id ? null : id);
  };

  return (
    <GradientBackground>
      <View style={stylesGlobal.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollCenter}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.centerWrapper}>
            
            {/* Header Centrado */}
            <View style={styles.headerContainer}>
              <Text style={styles.mainTitle}>Centro de Ayuda</Text>
              <Text style={styles.subtitle}>
                Selecciona una categoría para ver más
              </Text>
            </View>

            {/* Main Card */}
            <View style={styles.card}>
              
              {/* Sección Clientes */}
              <TouchableOpacity 
                style={[styles.sectionButton, showClientes && styles.sectionButtonActive]}
                onPress={() => toggleSection('clientes')}
                activeOpacity={0.9}
              >
                <View style={styles.sectionHeaderInner}>
                   <View style={[styles.iconContainer, showClientes ? styles.iconContainerActive : styles.iconContainerInactive]}>
                     <Ionicons 
                        name="person" 
                        size={20} 
                        color={showClientes ? "#1A5FA7" : "#718096"} 
                     />
                   </View>
                   <Text style={[styles.sectionTitle, showClientes && styles.sectionTitleActive]}>
                      Soy Cliente
                   </Text>
                   <Ionicons 
                      name={showClientes ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color={showClientes ? "#1A5FA7" : "#A0AEC0"} 
                   />
                </View>
              </TouchableOpacity>

              {showClientes && (
                <View style={styles.questionsList}>
                  {preguntasClientes.map((item, index) => (
                    <View key={`c-${index}`} style={styles.questionItem}>
                      <TouchableOpacity 
                        style={styles.questionHeader} 
                        onPress={() => togglePregunta(`c-${index}`)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.questionText, preguntaAbierta === `c-${index}` && styles.questionTextActive]}>{item.pregunta}</Text>
                        <Ionicons 
                          name={preguntaAbierta === `c-${index}` ? "remove-circle" : "add-circle-outline"} 
                          size={22} 
                          color={preguntaAbierta === `c-${index}` ? "#1A5FA7" : "#CBD5E0"} 
                        />
                      </TouchableOpacity>
                      {preguntaAbierta === `c-${index}` && (
                        <View style={styles.answerBox}>
                          <Text style={styles.answerText}>{item.respuesta}</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.spacer} />

              {/* Sección Emprendedores */}
              <TouchableOpacity 
                style={[styles.sectionButton, showEmprendedores && styles.sectionButtonActive]}
                onPress={() => toggleSection('emprendedores')}
                activeOpacity={0.9}
              >
                <View style={styles.sectionHeaderInner}>
                   <View style={[styles.iconContainer, showEmprendedores ? styles.iconContainerActive : styles.iconContainerInactive]}>
                     <MaterialCommunityIcons 
                        name="store" 
                        size={22} 
                        color={showEmprendedores ? "#1A5FA7" : "#718096"} 
                     />
                   </View>
                   <Text style={[styles.sectionTitle, showEmprendedores && styles.sectionTitleActive]}>
                      Soy Emprendedor
                   </Text>
                   <Ionicons 
                      name={showEmprendedores ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color={showEmprendedores ? "#1A5FA7" : "#A0AEC0"} 
                   />
                </View>
              </TouchableOpacity>

              {showEmprendedores && (
                <View style={styles.questionsList}>
                  {preguntasEmprendedores.map((item, index) => (
                    <View key={`e-${index}`} style={styles.questionItem}>
                      <TouchableOpacity 
                        style={styles.questionHeader} 
                        onPress={() => togglePregunta(`e-${index}`)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.questionText, preguntaAbierta === `e-${index}` && styles.questionTextActive]}>{item.pregunta}</Text>
                        <Ionicons 
                          name={preguntaAbierta === `e-${index}` ? "remove-circle" : "add-circle-outline"} 
                          size={22} 
                          color={preguntaAbierta === `e-${index}` ? "#1A5FA7" : "#CBD5E0"} 
                        />
                      </TouchableOpacity>
                      {preguntaAbierta === `e-${index}` && (
                        <View style={styles.answerBox}>
                          <Text style={styles.answerText}>{item.respuesta}</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Footer Centrado */}
            <View style={styles.footerContainer}>
               <Text style={styles.footerLabel}>¿No encontraste lo que buscabas?</Text>
               <TouchableOpacity style={styles.contactButton} activeOpacity={0.8}>
                  <Ionicons name="chatbubbles-outline" size={20} color="#FFF" style={{marginRight: 8}}/>
                  <Text style={styles.contactButtonText}>Contactar Soporte</Text>
               </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  // CLAVE: Centrado Vertical
  scrollCenter: {
    flexGrow: 1,
    justifyContent: "center", 
    padding: 20,
  },
  centerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  
  // Headers
  headerContainer: {
    alignItems: "center",
    marginBottom: 25,
    width: '100%',
  },
  mainTitle: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },

  // Card Design
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: "100%",
    // Shadow moderna
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },

  // Sections
  spacer: {
    height: 10,
  },
  sectionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EDF2F7",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 5,
  },
  sectionButtonActive: {
    borderColor: "#BEE3F8", // Azul muy claro borde
    backgroundColor: "#F0F9FF", // Azul muy claro fondo
  },
  sectionHeaderInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconContainerInactive: {
    backgroundColor: "#F7FAFC",
  },
  iconContainerActive: {
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#4A5568",
    flex: 1,
  },
  sectionTitleActive: {
    color: colors.textSecundary,
  },

  // Questions
  questionsList: {
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 5,
  },
  questionItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#EDF2F7",
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  questionText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#4A5568",
    flex: 1,
    marginRight: 10,
  },
  questionTextActive: {
    color: colors.textSecundary,
  },
  answerBox: {
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    marginHorizontal: 4,
  },
  answerText: {
    fontSize: 13.5,
    fontFamily: "Poppins-Regular",
    color: "#718096",
    lineHeight: 20,
  },

  // Footer
  footerContainer: {
    marginTop: 30,
    alignItems: "center",
    width: '100%',
  },
  footerLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "Poppins-Medium",
    marginBottom: 12,
    textAlign: "center",
    opacity: 0.9,
  },
  contactButton: {
    flexDirection: 'row',
    backgroundColor: colors.textSecundary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: colors.textSecundary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
});
