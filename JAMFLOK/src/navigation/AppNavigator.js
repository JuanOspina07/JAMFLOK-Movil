import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";

import SplashScreen from "../screens/Splash";
import Home from "./OptionsHome";
import Login from "../screens/Login";
import RecoverPassword from "../screens/Home/RecoverPassword";
import RegistroNavigator from "./RegistroNavigator";
import OptionsEntrepreneur from "./OptionsEntrepreneur";
import BusinessDetails from "../screens/Entrepreuner/BusinessDetails";
import OptionsAdmin from "./OptionsAdmin";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeStack" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={RegistroNavigator} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
    </Stack.Navigator>
  );
}

function AppStack({ user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {(() => {
        switch (user.idRol) {
          case 1: 
            return (
              <>
                <Stack.Screen name="Emprendedor" component={OptionsEntrepreneur} />
                <Stack.Screen name="NegocioDetalles" component={BusinessDetails} />
              </>
            );

          case 2:
            return (
              <>
                <Stack.Screen name="Cliente" component={Home} />
              </>
            );

          case 3: 
            return (
              <>
                <Stack.Screen name="Admin" component={OptionsAdmin} />
              </>
            );

          default:
            return (
              <Stack.Screen
                name="Login"
                component={Login}
              />
            );
        }
      })()}
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
