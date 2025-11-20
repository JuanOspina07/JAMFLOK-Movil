import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  Easing,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import GradientBackground from "../../hooks/gradientBackground";
import { useLoadFonts } from "../../hooks/loadFonts";
import colors from "../../styles/colors";
import styles from "../../styles/styleRecoverPassword";
import { recoverPassword } from "../../logic/RecoverPasswordLogic";

export default function RecoverPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const fontsLoaded = useLoadFonts();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const cardScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 550,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 550,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    const show = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
      Animated.spring(cardScale, { toValue: 0.95, useNativeDriver: true }).start();
    });

    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      Animated.spring(cardScale, { toValue: 1, useNativeDriver: true }).start();
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return (
      <GradientBackground>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="center" color={colors.textPrimary} />
        </View>
      </GradientBackground>
    );
  }

  const showToast = (type, text1) => {
    Toast.show({
      type,
      text1,
      visibilityTime: 2000,
    });
  };

  const handleRecover = async () => {
    if (!email.trim()) {
      return showToast("error", "Ingresa tu correo electrónico");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return showToast("error", "Correo inválido. Por favor ingresa un correo valido");
    }

    setLoading(true);
    try {
      await recoverPassword(email);
      showToast("success", "Revisa tu correo 📩");
      setTimeout(() => navigation.goBack(), 1500);
    } catch (error) {
      showToast("error", "No pudimos enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  const pressIn = () =>
    Animated.spring(buttonScale, { toValue: 0.94, useNativeDriver: true }).start();

  const pressOut = () =>
    Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <GradientBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.screen}>
            <Animated.View
              style={[
                styles.mainContent,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }, { scale: cardScale }],
                },
              ]}
            >
              <View style={styles.card}>
                <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />
                <Text style={styles.title}>Recuperar Contraseña</Text>

                <Text style={styles.subtitle}>
                  Ingresa tu correo electrónico para poder recuperar tu contraseña
                </Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Correo Electrónico"
                    placeholderTextColor={colors.icon}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    editable={!loading}
                  />
                </View>

                <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}>
                  <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleRecover}
                    onPressIn={pressIn}
                    onPressOut={pressOut}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Enviar</Text>
                    )}
                  </TouchableOpacity>
                </Animated.View>

                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
                  <Text style={styles.backText}>¿Volver a iniciar sesión?</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            {!keyboardVisible && (
              <View style={styles.footer}>
                <TouchableOpacity>
                  <Text style={styles.footerText}>Privacidad</Text>
                </TouchableOpacity>
                <Text style={styles.footerSeparator}>|</Text>
                <TouchableOpacity>
                  <Text style={styles.footerText}>Ayuda</Text>
                </TouchableOpacity>
                <Text style={styles.footerSeparator}>|</Text>
                <TouchableOpacity>
                  <Text style={styles.footerText}>Términos</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </GradientBackground>
  );
}
