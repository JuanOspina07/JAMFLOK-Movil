import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { LoginLogic } from "../logic/LoginLogic";
import { Ionicons } from "@expo/vector-icons";

import logo from "../../assets/images/logo.png";
import GradientBackground from "../hooks/gradientBackground";
import typography from "../styles/fonts";
import stylesGlobal from "../styles/stylesGlobal";

export default function Login() {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin, handleRecuperar } = LoginLogic(login, navigation);

  return (
    <GradientBackground>
      <View style={stylesGlobal.container}>
        <Image source={logo} style={stylesGlobal.logo} />

        <Text
          style={[
            stylesGlobal.title,
            { marginBottom: 20, fontSize: typography.size.medium },
          ]}
        >
          INICIO DE SESIÓN
        </Text>

        {/* Campo usuario */}
        <Text style={[stylesGlobal.label, { left: 10 }]}>Nombre de Usuario</Text>
        <TextInput
          style={stylesGlobal.input}
          placeholder="Nombre de usuario"
          value={nombreUsuario}
          onChangeText={setNombreUsuario}
          multiline={false}
        />

        <Text style={[stylesGlobal.label, { left: 10 }]}>Contraseña</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[stylesGlobal.input, styles.inputWithIcon]}
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={contraseña}
            onChangeText={setContraseña}
            multiline={false}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleRecuperar} activeOpacity={0.8}>
          <Text style={stylesGlobal.text}>
            ¿Olvidaste tu contraseña?{" "}
            <Text style={stylesGlobal.link}>Recupérala</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[stylesGlobal.button, loading && { opacity: 0.8 }]}
          onPress={() => handleLogin(nombreUsuario, contraseña, setLoading)}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={stylesGlobal.buttonText}>
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </Text>
        </TouchableOpacity>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%", 
    alignSelf: "center",
    position: "relative",
  },
  inputWithIcon: {
    paddingRight: 50, 
    width:"100%"
  },
  iconContainer: {
    position: "absolute",
    right: 15, 
    top: "40%",
    transform: [{ translateY: -12 }],
  },
});
