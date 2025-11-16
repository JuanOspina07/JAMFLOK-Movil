import React, { useState, useEffect, useContext } from "react";
import {View,Text,Image,TextInput,ScrollView,TouchableOpacity,StyleSheet,ActivityIndicator,RefreshControl} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import GradientBackground from "../../hooks/gradientBackground";
import { AuthContext } from "../../context/authContext";
import { getBusiness } from "../../services/Entrepreneur";

export default function Entrepreneur() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [negocios, setNegocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    cargarNegocios();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarNegocios();
    setRefreshing(false);
  };

  const cargarNegocios = async () => {
    try {
      const data = await getBusiness(user.idUsuario);
      setNegocios(data);
    } catch (error) {
      console.log("Error cargando negocios", error);
    } finally {
      setLoading(false);
    }
  };

  const negociosFiltrados = negocios.filter((n) =>
    n.NombreNegocio.toLowerCase().includes(search.toLowerCase())
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={18}
          color="#2F4156"
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

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

        <Text style={styles.title}>Mis negocios</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <ScrollView 
            style={styles.scroll} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#5851DB", "#0095F6", "#FF0069"]} progressBackgroundColor="#fff" tintColor="#fff"/>}>
            <View style={styles.grid}>
              {negociosFiltrados.length === 0 ? (
                <Text style={styles.noData}>
                  No tienes negocios registrados aún.
                </Text>
              ) : (
                negociosFiltrados.map((negocio) => (
                  <TouchableOpacity
                    key={negocio.ID_NEGOCIOS}
                    style={[styles.card, negociosFiltrados.length === 1 && { width: "100%" }]}
                    onPress={() => navigation.navigate("NegocioDetalles", { idNegocio: negocio.ID_NEGOCIOS })}
                  >
                    <View style={styles.starsContainer}>
                      {renderStars(negocio.rating || 0)}
                    </View>

                    <Image source={{ uri: negocio.Imagen }} style={styles.mainImage} />

                    <Image source={{ uri: negocio.Logo }} style={styles.logo}   resizeMode="contain" />

                    <View style={styles.infoContainer}>
                      <Text style={styles.nombre}>{negocio.NombreNegocio}</Text>
                      <Text style={styles.categoria}>
                        Categoría: {negocio.Categorias}
                      </Text>
                      <Text style={styles.descripcion}>
                        {negocio.Descripcion}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
    width: "100%",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#000",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F5EFEB",
    marginVertical: 10,
    textAlign: "center",
  },
  scroll: { 
    marginBottom: 0 
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "rgba(66, 87, 111, 0.3)",
    width: "100%",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "rgba(47, 65, 86, 0.7)",
  },
  mainImage: {
    width: "100%",
    height: 140,
    borderBottomWidth: 20,
    resizeMode:"cover"
  },
  starsContainer: {
    position: "absolute",
    top: 8,
    left: 10,
    flexDirection: "row",
    zIndex: 10,
  },
  logo: {
    width:100,
    height: 100,
    borderRadius: 12,
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 10,

    backgroundColor: "transparent", 
    justifyContent: "center",
    alignItems: "center",

    resizeMode: "contain",
  },
  infoContainer: {
    paddingTop: 20,
    paddingHorizontal: 12,
    paddingBottom: 12,

    borderTopWidth: 2,
    borderTopColor: "rgba(47, 65, 86, 0.7)",
  },
  nombre: {
    fontWeight: "900",
    color: "#F5EFEB",
    fontSize: 16,
    marginBottom: 5,
  },
  categoria: {
    color: "#404040",
    fontSize: 13,
    marginBottom: 5,
  },
  descripcion: {
    color: "#F5EFEB",
    fontSize: 15,
    marginBottom: 10,
  },
  noData: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 30,
    opacity: 0.8,
  },
  
});
