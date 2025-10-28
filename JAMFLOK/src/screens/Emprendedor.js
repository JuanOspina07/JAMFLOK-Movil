import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { AuthContext } from "../context/authContext";

import GradientBackground from "../hooks/gradientBackground";
import { useLoadFonts } from "../hooks/loadFonts";

import stylesGlobal from "../styles/stylesGlobal";

export default function Emprendedor() {
  const fontsLoaded = useLoadFonts();
  const { logout } = React.useContext(AuthContext);

  if (!fontsLoaded) {
    return <View />;
  }
 const handleLogout = async () => {
  await logout();
  Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
};


  return (
    <GradientBackground>
      <View style={stylesGlobal.container}>
        <Text>
            Bienvenido Emprendedor
        </Text>
        <TouchableOpacity style={stylesGlobal.button} onPress={handleLogout}>
          <Text style={stylesGlobal.buttonText}>cerrar Sesion</Text>
        </TouchableOpacity>
      </View>
    </GradientBackground>
  );
}
