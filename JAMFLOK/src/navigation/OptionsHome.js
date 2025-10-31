import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/Home";
import Information from "../screens/Information";
import Support from "../screens/Support";
import colors from "../styles/colors";

const Tab = createBottomTabNavigator();

export default function OptionsHome() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Information") {
            iconName = focused ? "information-circle" : "information-circle-outline";
          } else if (route.name === "Support") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.icon,
        tabBarStyle: {
          backgroundColor: colors.colorEnd,
          height: "7%",
          borderBlockColor: "transparent",
          paddingBottom: 6,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Support" component={Support} options={{ tabBarLabel: "Soporte" }}/>
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: "Inicio" }}/>
      <Tab.Screen name="Information" component={Information} options={{ tabBarLabel: "Información" }}/>
    </Tab.Navigator>
  );
}
