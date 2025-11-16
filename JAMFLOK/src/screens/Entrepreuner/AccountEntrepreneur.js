import React from "react";
import { View, Text } from "react-native";

import GradientBackground from "../../hooks/gradientBackground";

import stylesGlobal from "../../styles/stylesGlobal";

export default function AccountEntrepreneur() {


  return (
    <GradientBackground>
      <View style={stylesGlobal.container}>
        <Text>
            Mi cuenta
        </Text>
      </View>
    </GradientBackground>
  );
}
