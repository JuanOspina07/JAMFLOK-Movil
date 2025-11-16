import React from "react";
import { View, Text } from "react-native";

import GradientBackground from "../../hooks/gradientBackground";

import stylesGlobal from "../../styles/stylesGlobal";

export default function BusinessDetails() {


  return (
    <GradientBackground>
      <View style={stylesGlobal.container}>
        <Text>
            Detalles de este negocio 
        </Text>
      </View>
    </GradientBackground>
  );
}
