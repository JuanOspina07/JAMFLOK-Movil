import React from "react";
import { View, Text } from "react-native";

import GradientBackground from "../../hooks/gradientBackground";

import stylesGlobal from "../../styles/stylesGlobal";

export default function AddBusiness() {


  return (
    <GradientBackground>
      <View style={stylesGlobal.container}>
        <Text>
            Añadir negocio
        </Text>
      </View>
    </GradientBackground>
  );
}
