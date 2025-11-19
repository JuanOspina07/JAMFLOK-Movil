import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import colors from "../styles/colors";
import AdminBusiness from "../screens/Admin/AdminBusiness";
import AdminUsers from "../screens/Admin/AdminUsers";

const Tab = createBottomTabNavigator();

export default function OptionsAdmin() {
  return (
    <Tab.Navigator
      initialRouteName="AdminUsers"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "AdminUsers") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AdminBusiness") {
            iconName = focused ? "add-circle" : "add-circle-outline";
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
      <Tab.Screen name="AdminUsers" component={AdminUsers} options={{ tabBarLabel: "Usuarios" }}/>
      <Tab.Screen name="AdminBusiness" component={AdminBusiness} options={{ tabBarLabel: "Negocios" }}/>
    </Tab.Navigator>
  );
}
