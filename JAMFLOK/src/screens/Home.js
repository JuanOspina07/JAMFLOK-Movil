import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";

import GradientBackground from "../hooks/gradientBackground";
import { useLoadFonts } from "../hooks/loadFonts";

import colors from "../styles/colors";
import stylesGlobal from "../styles/stylesGlobal";
import typography from "../styles/fonts";

export default function Home() {
  const fontsLoaded = useLoadFonts();
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <GradientBackground>
      <View style={stylesGlobal.container}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 255, height: 255 }}
        />
        <Text style={[stylesGlobal.subtitle, { textAlign: "center"}]}>
          Vende fácil, compra mejor
        </Text>

        <TouchableOpacity style={stylesGlobal.button} onPress={() => navigation.navigate("Login")}>
          <Text style={stylesGlobal.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

         <Text style={[{ textAlign: "center", marginTop: 20,fontSize:typography.size.small,color:colors.textSecundary }]}>
          ¿No tienes una cuenta?
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Register")} activeOpacity={0.8}>
          <Text style={[stylesGlobal.link]}>Crea una aqui</Text>
        </TouchableOpacity>
        

      </View>
    </GradientBackground>
  );
}
