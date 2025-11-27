import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/styleCardbusiness";

import GradientBackground from "../../hooks/gradientBackground";
import AnimatedCard from "../../components/AnimatedCard";
import { AuthContext } from "../../context/authContext";

import {
  getAllNegociosLogic,
  filtrarNegociosLogic,
  renderStarsLogic,
} from "../../logic/EntrepreneurLogic";

export default function AdminBusiness() {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [negocios, setNegocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllNegociosLogic(setNegocios, setLoading);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getAllNegociosLogic(setNegocios, setLoading);
    setRefreshing(false);
  };

  const handleLogout = () => {
    logout();
  };

  const negociosFiltrados = filtrarNegociosLogic(negocios, search);

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#555" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <Text style={styles.title}>Administrar Negocios</Text>

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
                <Text style={styles.noData}>
                  No tienes negocios registrados aún.
                </Text>
              ) : (
                negociosFiltrados.map((negocio) => (
                  <AnimatedCard
                    key={negocio.ID_NEGOCIOS}
                    style={[
                      styles.card,
                      negociosFiltrados.length === 1 && { width: "100%" },
                    ]}
                    onPress={() =>
                      navigation.navigate("Admin/Negocios", {
                        idNegocio: negocio.ID_NEGOCIOS,
                      })
                    }
                  >
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
                              marginTop={12}
                              color="#c7c7c7"
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
      </View>
    </GradientBackground>
  );
}
