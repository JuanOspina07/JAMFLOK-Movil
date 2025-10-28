import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";

import SplashScreen from "../screens/Splash";
import Home from "./OptionsHome";
import Emprendedor from "../screens/Emprendedor";
import Login from "../screens/Login";
import RegistroNavigator from "./RegistroNavigator";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeStack" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={RegistroNavigator} />
    </Stack.Navigator>
  );
}

function AppStack({ user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user.idRol === 1 ? (
        <Stack.Screen name="Emprendedor" component={Emprendedor} />
      ) : (
        <Stack.Screen name="Cliente" component={Home} />
      )}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      {!user ? <AuthStack /> : <AppStack user={user} />}
    </NavigationContainer>
  );
}
