import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";

import GradientBackground from "../../hooks/gradientBackground";
import { useLoadFonts } from "../../hooks/loadFonts";
import { getUsuarios } from "../../services/userService";

import { userStyles } from "../../styles/userStyles";
import stylesGlobal from "../../styles/stylesGlobal";

export default function AdminUsers({ navigation }) {
  const fontsLoaded = useLoadFonts();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    console.log("Cargando usuarios...");
    setLoading(true);
    setError(null);
    try {
      const data = await getUsuarios();
      setUsuarios(data || []);
    } catch (err) {
      setError("Error de conexión con el servidor.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) return <View />;

  return (
    <GradientBackground>
      <View style={stylesGlobal.container}>
        <Text style={userStyles.title}>Administrar Usuarios</Text>

        {loading && (
          <ActivityIndicator size="large" color="#6C63FF" style={{ marginTop: 40 }} />
        )}

        {error && (
          <Text style={{ color: "#e74c3c", textAlign: "center", marginTop: 20, fontSize: 16 }}>
            {error}
          </Text>
        )}

        {!loading && !error && (
          <FlatList
            data={usuarios}
            keyExtractor={(item) => item.ID_USUARIOS.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
  <TouchableOpacity
    style={{
      backgroundColor: '#1E1E1E',
      marginHorizontal: 18,
      marginVertical: 10,
      padding: 20,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#333',
    }}
    onPress={() => navigation.navigate("UserDetail", { user: item })}
  >
    {/* NOMBRE COMPLETO */}
    <Text style={{ color: '#FFF', fontSize: 19, fontWeight: 'bold', marginBottom: 8 }}>
      {item.PrimerNombre || 'Sin nombre'} {item.PrimerApellido || ''}
    </Text>

    {/* CORREO */}
    <Text style={{ color: '#B0B0B0', fontSize: 15, marginBottom: 4 }}>
      {item.CorreoElectronico}
    </Text>

    {/* TELÉFONO */}
    <Text style={{ color: '#B0B0B0', fontSize: 15, marginBottom: 4 }}>
      Tel: {item.NumTelefono || 'No registrado'}
    </Text>

    {/* CIUDAD */}
    <Text style={{ color: '#B0B0B0', fontSize: 15, marginBottom: 10 }}>
      {item.Ciudad || 'No registrada'}
    </Text>

    {/* ESTADO */}
    <Text style={{
      alignSelf: 'flex-end',
      color: item.Estado === 'Activo' ? '#27ae60' : '#e74c3c',
      fontWeight: 'bold',
      fontSize: 14,
    }}>
      ● {item.Estado}
    </Text>
  </TouchableOpacity>
)}
            ListEmptyComponent={
              <Text style={{ color: "#888", textAlign: "center", marginTop: 50, fontSize: 18 }}>
                No hay usuarios registrados
              </Text>
            }
          />
        )}
      </View>
    </GradientBackground>
  );
}