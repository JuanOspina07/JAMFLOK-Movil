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

import GradientBackground from "../../hooks/gradientBackground";
import { useLoadFonts } from "../../hooks/loadFonts";
import colors from "../../styles/colors";
import styles from "../../styles/styleAyuda";

const { height: WINDOW_HEIGHT } = Dimensions.get("window");

export default function Ayuda() {
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
  const MAX_SCROLL_HEIGHT = Math.min(Math.round(WINDOW_HEIGHT * 0.62), 520);

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
            <Text style={styles.backArrow}>{"<"}</Text>
          </TouchableOpacity>

          <Animated.View style={[styles.mainContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.card}>
              <View style={styles.cardInner}>
                <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />
                <Text style={styles.title}>Centro de Ayuda</Text>
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
                        <Text style={styles.sectionTitle}>¿Problemas para recuperar tu contraseña?</Text>
                        <Text style={styles.subtitle}>
                          Sabemos lo frustrante que puede ser perder el acceso a tu cuenta. Por eso, ponemos a tu disposición este apartado con las preguntas frecuentes y recomendaciones más importantes:
                        </Text>

                        <Text style={styles.sectionTitle}>Pasos para Recuperar Contraseña</Text>
                        <View style={styles.bulletList}>
                          <Text style={styles.bulletItem}>• INGRESA TU CORREO: Asegúrate de escribir correctamente tu dirección de correo electrónico. Utiliza el mismo correo con el que te registraste.</Text>
                          <Text style={styles.bulletItem}>• VERIFICA TU BANDEJA DE ENTRADA: Revisa la carpeta de spam o correo no deseado. El correo puede tardar algunos minutos en llegar.</Text>
                          <Text style={styles.bulletItem}>• ¿NO RECIBES EL CORREO?: Verifica que el correo esté escrito correctamente. Espera al menos 10 minutos. Intenta nuevamente.</Text>
                        </View>

                        <Text style={styles.sectionTitle}>¿No recibiste el correo de recuperación?</Text>
                        <Text style={styles.subtitle}>
                          Asegúrate de haber ingresado correctamente tu dirección de correo electrónico asociada a tu cuenta. Revisa también la carpeta de spam, promociones o correo no deseado.
                        </Text>

                        <Text style={styles.subtitle}>
                          En algunos casos, el proveedor de correo electrónico puede tardar unos minutos en entregar el mensaje. Espera entre 5 y 15 minutos y, si aún no lo recibes, vuelve a intentarlo o solicita el reenvío.
                        </Text>

                        <Text style={styles.sectionTitle}>¿Ya no tienes acceso al correo electrónico vinculado?</Text>
                        <Text style={styles.subtitle}>
                          Si no puedes acceder a tu correo electrónico registrado, puedes iniciar un proceso de verificación alternativa.
                        </Text>

                        <Text style={styles.subtitle}>
                          Este proceso puede incluir la verificación por número telefónico, documento de identidad, preguntas de seguridad u otros métodos habilitados previamente.
                        </Text>

                        <Text style={styles.subtitle}>
                          Contáctanos directamente para que nuestro equipo revise tu caso de forma personalizada.
                        </Text>

                        <Text style={styles.sectionTitle}>¿Tu cuenta fue comprometida?</Text>
                        <Text style={styles.subtitle}>
                          Si sospechas que alguien ha cambiado tu contraseña sin autorización, te recomendamos restablecerla de inmediato y notificar a nuestro equipo de soporte.
                        </Text>

                        <Text style={styles.subtitle}>
                          También es aconsejable activar la verificación en dos pasos para una mayor seguridad de tu cuenta.
                        </Text>

                        <Text style={styles.sectionTitle}>Soporte Personalizado</Text>
                        <Text style={styles.subtitle}>
                          Si ninguna de estas soluciones resuelve tu problema, puedes contactar a nuestro equipo de asistencia técnica:
                        </Text>

                        <View style={styles.bulletList}>
                          <Text style={styles.bulletItem}>• Correo electrónico: soportejamflok@gmail.com</Text>
                          <Text style={styles.bulletItem}>• Horario de atención: Lunes a viernes de 8:00 a.m. a 6:00 p.m. (hora local)</Text>
                          <Text style={styles.bulletItem}>• Tiempo de respuesta estimado: entre 24 y 48 horas hábiles</Text>
                        </View>

                        <Text style={styles.subtitle}>
                          También puedes acceder a nuestro menú de soporte donde encontrarás artículos detallados sobre gestión de cuentas, contraseñas, seguridad y recuperación de acceso.
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

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate("Privacidad")}>
              <Text style={styles.footerText}>Privacidad</Text>
            </TouchableOpacity>
            <Text style={styles.footerSeparator}>|</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Ayuda")}>
              <Text style={styles.footerText}>Ayuda</Text>
            </TouchableOpacity>
            <Text style={styles.footerSeparator}>|</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Terminos")}>
              <Text style={styles.footerText}>Términos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}