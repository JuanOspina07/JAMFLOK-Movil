import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/authContext";

import GradientBackground from "../../hooks/gradientBackground";
import AnimatedCard from "../../components/AnimatedCard";
import styles from "../../styles/styleCardbusiness";

import {
  getBusinessCustomerLogic,
  filtrarNegociosLogic,
  renderStarsLogic,
  toggleFavoritoLogic,
  getFavoritesLogic,
} from "../../logic/CustomerLogic";
import FloatingAIButton from "../../components/FloatingAIButton";
import AIModal from "../../components/AIModal";
import { askAIRecommendation } from "../../services/Customer";
import colors from "../../styles/colors";

export default function Customer() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [favoritos, setFavoritos] = useState([]);

  const [search, setSearch] = useState("");
  const [negocios, setNegocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [showAI, setShowAI] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);


  useEffect(() => {
    getBusinessCustomerLogic(setNegocios, setLoading);
  }, []);
  useEffect(() => {
    getFavoritesLogic(user.idUsuario, setFavoritos, () => {});
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFavoritesLogic(user.idUsuario, setFavoritos, () => {});
  });

  return unsubscribe;
}, [navigation]);


  const onRefresh = async () => {
    setRefreshing(true);
    await getBusinessCustomerLogic(setNegocios, setLoading);
    setRefreshing(false);
  };

  const negociosFiltrados = filtrarNegociosLogic(negocios, search);

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#555" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar negocio..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <Text style={styles.title}>Negocios disponibles</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 20 }}
          />
        ) : (
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#5851DB", "#0095F6", "#FF0069"]}
                progressBackgroundColor="#fff"
                tintColor="#fff"
              />
            }
          >
           

            <View style={styles.grid}>
              {negociosFiltrados.length === 0 ? (
                <Text style={styles.noData}>No se encontraron negocios.</Text>
              ) : (
                negociosFiltrados.map((negocio) => (
                  <AnimatedCard
                    key={negocio.ID_NEGOCIOS}
                    style={[
                      styles.card,
                      negociosFiltrados.length === 1 && { width: "100%" },
                    ]}
                    onPress={() =>
                      navigation.navigate("NegocioCliente", {
                        idNegocio: negocio.ID_NEGOCIOS,
                      })
                    }
                  >
                    <TouchableOpacity
                      onPress={() =>
                        toggleFavoritoLogic(
                          negocio.ID_NEGOCIOS,
                          user.idUsuario,
                          favoritos,
                          setFavoritos
                        )
                      }
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 10,
                        backgroundColor: "rgba(0,0,0,0.3)",
                        borderRadius: 20,
                        padding: 5,
                      }}
                    >
                      <Ionicons
                        name={
                          favoritos.some(f => f.ID_NEGOCIOS === negocio.ID_NEGOCIOS)
                            ? "star"
                            : "star-outline"
                        }
                        size={22}
                        color="#FFD700"
                      />
                    </TouchableOpacity>
                    <Image
                      source={{ uri: negocio.Imagen }}
                      style={styles.mainImage}
                    />

                    <Image
                      source={{ uri: negocio.Logo }}
                      style={styles.logo}
                      resizeMode="contain"
                    />

                    <View style={styles.infoContainer}>
                      <Text style={styles.nombre}>{negocio.NombreNegocio}</Text>

                      <View style={styles.starsContainer}>
                        {renderStarsLogic(negocio.rating || 0).map(
                          (star, i) => (
                            <Ionicons
                              key={i}
                              name={star.filled ? "star" : "star-outline"}
                              size={18}
                              color={colors.textSecundary}
                              style={{ marginRight: 2 }}
                            />
                          )
                        )}
                      </View>

                      <Text style={styles.categoria}>
                        Categoría: {negocio.Categorias}
                      </Text>

                      <Text style={styles.descripcion}>
                        {negocio.Descripcion}
                      </Text>
                    </View>
                  </AnimatedCard>
                ))
              )}
            </View>
           


          </ScrollView>
          
          
        )}
            <FloatingAIButton onPress={() => setShowAI(true)} />
<AIModal
  visible={showAI}
  onClose={() => setShowAI(false)}
  onSend={async (texto) => {
    const respuesta = await askAIRecommendation(texto);
    return respuesta; // 👈 ahora el modal recibe y muestra la respuesta
  }}
/>
      </View>
    </GradientBackground>
  );
}
