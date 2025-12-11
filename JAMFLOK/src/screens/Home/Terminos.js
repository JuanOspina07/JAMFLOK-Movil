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
import styles from "../../styles/styleTerminos";

const { height: WINDOW_HEIGHT } = Dimensions.get("window");

export default function Terminos() {
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
            <Ionicons name="arrow-back-outline" size={28} color="#fff" />
          </TouchableOpacity>

          <Animated.View style={[styles.mainContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.card}>
              <View style={styles.cardInner}>
                <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />
                <Text style={styles.title}>Términos y Condiciones</Text>
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
                        <Text style={styles.sectionTitle}>Aceptación y Responsabilidad</Text>
                        <Text style={styles.subtitle}>
                          Al utilizar la funcionalidad de recuperación de contraseña de nuestra plataforma, declaras que:
                        </Text>

                        <View style={styles.bulletList}>
                          <Text style={styles.bulletItem}>• Eres el legítimo titular de la cuenta asociada al correo electrónico ingresado.</Text>
                          <Text style={styles.bulletItem}>• Aceptas nuestras normas de uso, así como nuestras políticas de privacidad y seguridad.</Text>
                          <Text style={styles.bulletItem}>• No estás intentando suplantar la identidad de otra persona ni acceder de forma no autorizada a cuentas ajenas.</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Condiciones del Proceso</Text>
                        <Text style={styles.subtitle}>
                          Este sistema está diseñado exclusivamente para facilitar el acceso a cuentas legítimas. Cualquier uso indebido, intento de violación de seguridad o suplantación será detectado y reportado.
                        </Text>

                        <Text style={styles.subtitle}>
                          En algunos casos, la plataforma puede solicitar métodos de verificación adicionales (como autenticación de dos factores o identificación manual).
                        </Text>

                        <Text style={styles.subtitle}>
                          No garantizamos el acceso inmediato a la cuenta si los datos proporcionados no coinciden con los registrados. Esta es una medida de protección para evitar accesos no autorizados.
                        </Text>

                        <Text style={styles.sectionTitle}>Modificaciones y Actualizaciones</Text>
                        <Text style={styles.subtitle}>
                          Nos reservamos el derecho de modificar esta funcionalidad o los métodos de validación por motivos de seguridad, mejora del servicio o cumplimiento normativo.
                        </Text>

                        <Text style={styles.subtitle}>
                          Las condiciones aquí descritas pueden cambiar con el tiempo. Te notificaremos si realizamos cambios sustanciales en los términos que afecten tu acceso o la seguridad de tu cuenta.
                        </Text>

                        <Text style={styles.sectionTitle}>Uso Apropiado del Servicio</Text>
                        <Text style={styles.subtitle}>
                          El usuario se compromete a utilizar el servicio de recuperación de forma responsable y ética. Cualquier intento de abuso del sistema resultará en la suspensión inmediata del acceso.
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