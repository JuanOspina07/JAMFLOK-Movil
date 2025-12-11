import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import GradientBackground from "../../hooks/gradientBackground";
import { AuthContext } from "../../context/authContext";

import AnimatedCard from "../../components/AnimatedCard";
import styles from "../../styles/styleCardbusiness";

import {
  getFavoritesLogic,
  filtrarNegociosLogic,
  renderStarsLogic,
  toggleFavoritoLogic
} from "../../logic/CustomerLogic";

export default function Favorites() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [favoritos, setFavoritos] = useState([]); // Negocios favoritos
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getFavoritesLogic(user.idUsuario, setFavoritos, setLoading);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFavoritesLogic(user.idUsuario, setFavoritos, setLoading);
  });

  return unsubscribe;
}, [navigation]);


  const onRefresh = async () => {
    setRefreshing(true);
    await getFavoritesLogic(user.idUsuario, setFavoritos, setLoading);
    setRefreshing(false);
  };

  const negociosFiltrados = filtrarNegociosLogic(favoritos, search);

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#555" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar favorito..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <Text style={styles.title}>Mis Favoritos</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#5851DB", "#0095F6", "#FF0069"]}
                tintColor="#fff"
                progressBackgroundColor="#fff"
              />
            }
          >
            <View style={styles.grid}>
              {negociosFiltrados.length === 0 ? (
                <Text style={styles.noData}>No tienes negocios favoritos.</Text>
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
                      <Ionicons name="star" size={22} color="#FFD700" />
                    </TouchableOpacity>

                    <Image source={{ uri: negocio.Imagen }} style={styles.mainImage} />
                    <Image source={{ uri: negocio.Logo }} style={styles.logo} resizeMode="contain" />

                    <View style={styles.infoContainer}>
                      <Text style={styles.nombre}>{negocio.NombreNegocio}</Text>

                      <View style={styles.starsContainer}>
                        {renderStarsLogic(negocio.rating || 0).map((star, i) => (
                          <Ionicons
                            key={i}
                            name={star.filled ? "star" : "star-outline"}
                            size={18}
                            color="#c7c7c7"
                            style={{ marginRight: 2 }}
                          />
                        ))}
                      </View>

                      <Text style={styles.categoria}>Categoría: {negocio.Categorias}</Text>

                      <Text style={styles.descripcion}>{negocio.Descripcion}</Text>
                    </View>
                  </AnimatedCard>
                ))
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </GradientBackground>
  );
}
