import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import colors from "../styles/colors";
import Entrepreneur from "../screens/Entrepreuner/Entrepreneur";
import AddBusiness from "../screens/Entrepreuner/AddBusiness";
import AccountEntrepreneur from "../screens/Entrepreuner/AccountEntrepreneur";

const Tab = createBottomTabNavigator();

export default function OptionsEntrepreneur() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AddBusiness") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }  else if (route.name === "AccountEntrepreneur") {
            iconName = focused ? "person-circle" : "person-circle-outline";
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
      <Tab.Screen name="Home" component={Entrepreneur} options={{ tabBarLabel: "Inicio" }}/>
      <Tab.Screen name="AddBusiness" component={AddBusiness} options={{ tabBarLabel: "Agregar" }}/>
      <Tab.Screen name="AccountEntrepreneur" component={AccountEntrepreneur} options={{ tabBarLabel: "Yo" }}/>
    </Tab.Navigator>
  );
}
