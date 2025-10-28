import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { LoginLogic } from "../logic/LoginLogic";

import GradientBackground from "../hooks/gradientBackground";
import typography from "../styles/fonts";
import logo from "../../assets/images/logo.png";
import stylesGlobal from "../styles/stylesGlobal";

export default function Login() {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);

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

        <Text style={[stylesGlobal.label, { left: 10 }]}>Nombre de Usuario</Text>
        <TextInput
          style={stylesGlobal.input}
          placeholder="Nombre de usuario"
          value={nombreUsuario}
          onChangeText={setNombreUsuario}
        />

        <Text style={[stylesGlobal.label, { left: 10 }]}>Contraseña</Text>
        <TextInput
          style={stylesGlobal.input}
          placeholder="Contraseña"
          secureTextEntry
          value={contraseña}
          onChangeText={setContraseña}
        />

        <TouchableOpacity onPress={handleRecuperar}>
          <Text style={[stylesGlobal.text,]}>
            ¿Olvidaste tu contraseña?{" "}
            <Text style={stylesGlobal.link}>Recupérala</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[stylesGlobal.button, loading && { opacity: 0.8 }]}
          onPress={() => handleLogin(nombreUsuario, contraseña, setLoading)}
          disabled={loading} activeOpacity={0.8}
        >
          <Text style={stylesGlobal.buttonText}>
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </Text>
        </TouchableOpacity>
      </View>
    </GradientBackground>
  );
}
