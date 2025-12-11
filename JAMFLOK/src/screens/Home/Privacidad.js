import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons"; 

import GradientBackground from "../../hooks/gradientBackground";
import { useLoadFonts } from "../../hooks/loadFonts";
import colors from "../../styles/colors";
import styles from "../../styles/stylePrivacidad";

const { height: WINDOW_HEIGHT } = Dimensions.get("window");

export default function Privacidad() {
  const navigation = useNavigation();
  const fontsLoaded = useLoadFonts();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const scrollViewRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 420,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const SCROLLBAR_WIDTH = 8;
  const SCROLLBAR_MARGIN = 6;

  const thumbHeight = containerHeight && contentHeight
    ? Math.max((containerHeight / contentHeight) * containerHeight, 36)
    : 0;

  const scrollRange = Math.max(contentHeight - containerHeight, 1);
  const rawThumbPos = (scrollOffset / scrollRange) * Math.max(0, containerHeight - thumbHeight);
  const thumbPosition = Math.max(0, Math.min(rawThumbPos || 0, Math.max(0, containerHeight - thumbHeight)));

  const handleScroll = (event) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const MAX_SCROLL_HEIGHT = Math.min(Math.round(WINDOW_HEIGHT * 0.55), 520);

  if (!fontsLoaded) {
    return (
      <GradientBackground>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.textPrimary} />
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.screen}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backTopLeft}
            activeOpacity={0.8}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            {/* Flecha reemplazada por Ionicons */}
            <Ionicons name="arrow-back-outline" size={28} color="#fff" />
          </TouchableOpacity>

          <Animated.View style={[styles.mainContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.card}>
              <View style={styles.cardInner}>
                <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />
                <Text style={styles.title}>Política de Privacidad</Text>
                <View style={[styles.scrollArea, { maxHeight: MAX_SCROLL_HEIGHT }]}>
                  <View
                    style={styles.scrollContainer}
                    onLayout={(e) => {
                      const h = e.nativeEvent.layout.height;
                      if (h !== containerHeight) setContainerHeight(h);
                    }}
                  >
                    <ScrollView
                      ref={scrollViewRef}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={[styles.scrollContent, { paddingRight: SCROLLBAR_WIDTH + SCROLLBAR_MARGIN + 6 }]}
                      nestedScrollEnabled={true}
                      onContentSizeChange={(w, h) => setContentHeight(h)}
                      onScroll={handleScroll}
                      scrollEventThrottle={16}
                      keyboardShouldPersistTaps="handled"
                    >
                      <View style={styles.scrollContent}>
                        <Text style={styles.sectionTitle}>Recopilación de Información</Text>
                        <Text style={styles.subtitle}>
                          Protección de tus datos personales durante la recuperación de contraseña. La privacidad de nuestros usuarios es una prioridad fundamental.
                        </Text>

                        <View style={styles.bulletList}>
                          <Text style={styles.bulletItem}>• Recopilamos únicamente los datos estrictamente necesarios para validar tu identidad.</Text>
                          <Text style={styles.bulletItem}>• Esta información incluye tu dirección de correo electrónico, dirección IP y detalles técnicos mínimos.</Text>
                          <Text style={styles.bulletItem}>• Facilitamos el acceso seguro a tu cuenta protegiendo la integridad del proceso.</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Uso de la Información</Text>
                        <Text style={styles.subtitle}>
                          Toda la información recabada se utiliza exclusivamente con los siguientes fines:
                        </Text>

                        <View style={styles.bulletList}>
                          <Text style={styles.bulletItem}>• Verificar que eres el titular legítimo de la cuenta.</Text>
                          <Text style={styles.bulletItem}>• Enviarte de forma segura las instrucciones para restablecer tu contraseña.</Text>
                          <Text style={styles.bulletItem}>• Prevenir accesos no autorizados o fraudes relacionados con el proceso de autenticación.</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Tratamiento y Almacenamiento</Text>
                        <Text style={styles.subtitle}>
                          Los datos que ingresas se transmiten a través de canales cifrados utilizando el protocolo HTTPS, garantizando que terceros no puedan interceptarlos.
                        </Text>

                        <Text style={styles.subtitle}>
                          No almacenamos contraseñas en texto plano. Utilizamos algoritmos de cifrado seguros, como bcrypt o SHA-256 con salt.
                        </Text>

                        <Text style={styles.subtitle}>
                          El acceso a los datos está limitado al personal autorizado, y nuestros sistemas están protegidos por medidas de seguridad robustas.
                        </Text>

                        <Text style={styles.sectionTitle}>Terceros y Uso Compartido</Text>
                        <Text style={styles.subtitle}>
                          No compartimos tu información personal con terceros ajenos al servicio, excepto cuando sea legalmente requerido o estrictamente necesario para la prestación del servicio.
                        </Text>

                        <Text style={styles.subtitle}>
                          En casos específicos como plataformas de envío de correo transaccional, garantizamos que estos terceros cumplan con los mismos estándares de seguridad.
                        </Text>

                        <Text style={styles.sectionTitle}>Tus Derechos</Text>
                        <Text style={styles.subtitle}>
                          Tienes derecho a acceder, rectificar y cancelar tus datos personales en cualquier momento. Puedes ejercer estos derechos contactándonos a través de los canales habilitados.
                        </Text>

                        <Text style={styles.subtitle}>
                          Nos comprometemos a responder tus solicitudes en un plazo máximo de 30 días hábiles, garantizando la transparencia en el proceso.
                        </Text>

                        <Text style={styles.sectionTitle}>Cambios en la Política</Text>
                        <Text style={styles.subtitle}>
                          Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio será notificado a través de nuestra plataforma o por correo electrónico.
                        </Text>

                        <Text style={styles.subtitle}>
                          Te recomendamos revisar periódicamente esta página para estar informado de las actualizaciones en nuestras políticas de privacidad y protección de datos.
                        </Text>
                      </View>
                    </ScrollView>

                    {containerHeight > 0 && contentHeight > containerHeight && thumbHeight > 0 && (
                      <View
                        style={[
                          styles.scrollbarTrack,
                          {
                            height: containerHeight,
                            right: SCROLLBAR_MARGIN,
                            width: SCROLLBAR_WIDTH,
                          },
                        ]}
                        pointerEvents="none"
                      >
                        <View
                          style={[
                            styles.scrollbarThumb,
                            {
                              height: thumbHeight,
                              top: thumbPosition,
                            },
                          ]}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}