import React from "react";
import { View, Text } from "react-native";

import GradientBackground from "../../hooks/gradientBackground";
import { useLoadFonts } from "../../hooks/loadFonts";

import stylesGlobal from "../../styles/stylesGlobal";

export default function EditProduct() {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <GradientBackground>
      <View style={stylesGlobal.container}>
        <Text>
          Editar productos
        </Text>
      </View>
    </GradientBackground>
  );
}
