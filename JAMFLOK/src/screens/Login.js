import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import GradientBackground from "../hooks/gradientBackground";
import typography from "../styles/fonts";
import colors from "../styles/colors"; // si tienes un archivo de colores
import logo from "../../assets/images/logo.png"; // cambia la ruta si es diferente

export default function Login() {
  const navigation = useNavigation();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLogin = async () => {
    if (!nombreUsuario || !contraseña) {
      Alert.alert("Campos vacíos", "Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.20.69:4000/api/login", {
        nombreUsuario,
        contraseña,
      });

      if (response.data.success) {
        const { idUsuario, idRol, nombre, apellido } = response.data.user;

        // Guardar datos en almacenamiento local (AsyncStorage)
        // Puedes instalarlo: npm install @react-native-async-storage/async-storage
        import("@react-native-async-storage/async-storage").then(({ default: AsyncStorage }) => {
          AsyncStorage.setItem("isAuthenticated", "true");
          AsyncStorage.setItem("user", JSON.stringify({ idUsuario, idRol, nombre, apellido }));
        });

        if (idRol === 1) {
          navigation.navigate("Emprendedor");
        } else if (idRol === 2) {
          navigation.navigate("Cliente");
        } else {
          Alert.alert("Error", "Rol no reconocido");
        }
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Error en login:", error);
      Alert.alert("Error", "Hubo un problema al iniciar sesión. Intenta nuevamente.");
    }
  };

  const handleRecuperar = () => {
    navigation.navigate("Recuperar");
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>INICIO DE SESIÓN</Text>

        <Text style={styles.label}>Nombre de Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={nombreUsuario}
          onChangeText={setNombreUsuario}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={contraseña}
          onChangeText={setContraseña}
        />

        <TouchableOpacity onPress={handleRecuperar}>
          <Text style={styles.forgot}>¿Olvidaste tu contraseña? <Text style={styles.link}>Recupérala</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  forgot: {
    marginBottom: 15,
    color: "#444",
  },
  link: {
    color: "#e90404",
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    backgroundColor: "#e90404",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
