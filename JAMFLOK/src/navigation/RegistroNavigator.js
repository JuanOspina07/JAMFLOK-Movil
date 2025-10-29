import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DatosPersonales from "../screens/Registro/DatosPersonales";
import Ubicacion from "../screens/Registro/Ubicacion";
import Cuenta from "../screens/Registro/Cuenta";

const Stack = createNativeStackNavigator();

export default function RegistroNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Paso1" component={DatosPersonales} />
      <Stack.Screen name="Paso2" component={Ubicacion} />
      <Stack.Screen name="Paso3" component={Cuenta} />
    </Stack.Navigator>
  );
}
