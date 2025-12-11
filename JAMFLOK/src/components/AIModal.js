import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const colors = {
  primary: "#ffffff",
  secondary: "#f0f0f0",
  accent: "#2f4156",
  textDark: "#333333",
  textLight: "#ffffff",
  icon: "#666666",
  error: "#e90404",
  success: "#2f4156",
  border: "#dddddd",
};

export default function AIModal({ visible, onClose, onSend }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef();
  const scaleValue = useMemo(() => new Animated.Value(1), []);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const formatAIResponse = (res) => {
    if (!res || !res.ok) {
      return {
        respuesta: "No entendí tu mensaje.",
        negocios_relevantes: [],
        productos_relevantes: [],
        comparaciones: [],
      };
    }

    const data = res?.data || res;
    return {
      respuesta: data?.respuesta || "No encontré información sobre eso.",
      negocios_relevantes: data?.negocios_relevantes || [],
      productos_relevantes: data?.productos_relevantes || [],
      comparaciones: data?.comparaciones || [],
    };
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    const newUserMsg = { type: "user", text };
    setMessages((prev) => [...prev, newUserMsg]);

    setText("");
    setLoading(true);

    try {
      const rawResponse = await onSend(text);
      const clean = formatAIResponse(rawResponse);

      const aiMsg = {
        type: "ia",
        text: clean.respuesta,
        negocios: clean.negocios_relevantes,
        productos: clean.productos_relevantes,
        comparaciones: clean.comparaciones,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ia",
          text: "Lo siento, hubo un problema procesando tu solicitud. Intenta de nuevo.",
        },
      ]);
    }

    setLoading(false);
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const renderNegocio = (n, idx) => {
    const precioNum = parseFloat(n.precio || 0);
    const ratingNum = n.rating ? parseFloat(n.rating).toFixed(1) : 'N/A';

    return (
      <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Ionicons name="business-outline" size={16} color={colors.accent} style={{ marginRight: 8 }} />
        <Text style={{ color: colors.textDark, fontSize: 14, flex: 1, lineHeight: 20 }}>
          {n.nombre} (Categoría: {n.categoria}, Precio prom.: ${precioNum.toLocaleString()}, Rating: {ratingNum} con {n.total_resenas} reseñas)
        </Text>
      </View>
    );
  };

  const renderProducto = (p, idx) => {
    const precioNum = parseFloat(p.precio || 0);

    return (
      <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Ionicons name="fast-food-outline" size={16} color={colors.accent} style={{ marginRight: 8 }} />
        <Text style={{ color: colors.textDark, fontSize: 14, flex: 1, lineHeight: 20 }}>
          {p.nombre} de {p.negocio_nombre} - ${precioNum.toLocaleString()} - {p.descripcion}
        </Text>
      </View>
    );
  };

  const renderComparacion = (c, idx) => (
    <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <Ionicons name="swap-horizontal-outline" size={16} color={colors.accent} style={{ marginRight: 8 }} />
      <Text style={{ color: colors.textDark, fontSize: 14, flex: 1, lineHeight: 20 }}>
        {c} {/* Asumiendo que comparaciones son strings; ajusta si es objeto */}
      </Text>
    </View>
  );

  return (
    <Modal animationType="fade" visible={visible} transparent>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={[0, 0]}
            end={[0, 1]}
            style={{
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              maxHeight: "85%",
              padding: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: colors.accent,
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                Asistente IA
              </Text>

              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={28} color={colors.icon} />
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={scrollRef}
              style={{ marginBottom: 15 }}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              {messages.map((m, i) => (
                <View
                  key={i}
                  style={{
                    alignSelf: m.type === "user" ? "flex-end" : "flex-start",
                    backgroundColor:
                      m.type === "user" ? colors.success : colors.secondary,
                    borderRadius: 20,
                    padding: 15,
                    marginVertical: 8,
                    maxWidth: "90%",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1,
                  }}
                >
                  <Text
                    style={{
                      color: m.type === "user" ? colors.textLight : colors.textDark,
                      fontSize: 16,
                      marginBottom: m.negocios?.length || m.productos?.length || m.comparaciones?.length ? 10 : 0,
                      lineHeight: 24,
                    }}
                  >
                    {m.text}
                  </Text>

                  {m.negocios?.length > 0 && (
                    <View style={{ marginTop: 10, padding: 15, backgroundColor: colors.primary, borderRadius: 10 }}>
                      <Text style={{ color: colors.textDark, fontWeight: "bold", marginBottom: 8, fontSize: 16 }}>
                        Negocios relevantes:
                      </Text>
                      {m.negocios.map(renderNegocio)}
                    </View>
                  )}

                  {m.productos?.length > 0 && (
                    <View style={{ marginTop: 10, padding: 15, backgroundColor: colors.primary, borderRadius: 10 }}>
                      <Text style={{ color: colors.textDark, fontWeight: "bold", marginBottom: 8, fontSize: 16 }}>
                        Productos relevantes:
                      </Text>
                      {m.productos.map(renderProducto)}
                    </View>
                  )}

                  {m.comparaciones?.length > 0 && (
                    <View style={{ marginTop: 10, padding: 15, backgroundColor: colors.primary, borderRadius: 10 }}>
                      <Text style={{ color: colors.textDark, fontWeight: "bold", marginBottom: 8, fontSize: 16 }}>
                        Comparaciones:
                      </Text>
                      {m.comparaciones.map(renderComparacion)}
                    </View>
                  )}
                </View>
              ))}

              {loading && (
                <Text style={{ color: colors.icon, marginTop: 5, fontStyle: 'italic' }}>
                  IA escribiendo...
                </Text>
              )}
            </ScrollView>

            <Animated.View
              style={{
                flexDirection: "row",
                alignItems: "center",
                transform: [{ scale: scaleValue }],
                backgroundColor: colors.primary,
                borderRadius: 30,
                padding: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Escribe tu pregunta..."
                placeholderTextColor={colors.icon}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: colors.textDark,
                  padding: 12,
                  borderRadius: 25,
                  fontSize: 16,
                }}
                onFocus={handlePressIn}
                onBlur={handlePressOut}
              />

              <TouchableOpacity
                onPress={handleSend}
                style={{
                  backgroundColor: colors.success,
                  padding: 12,
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="send" size={22} color={colors.textLight} />
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}