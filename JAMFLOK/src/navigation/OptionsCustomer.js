import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

import colors from "../styles/colors";
import Customer from "../screens/Customer/Customer";
import Favorites from "../screens/Customer/Favorites";
import AccountCustomer from "../screens/Customer/AccountCustomer";
import ShoppingCart from "../screens/Customer/ShoppingCart";
import { CartContext } from "../context/cartContext";

const Tab = createBottomTabNavigator();

export default function OptionCustomer() {
  // Obtén 'cart' del contexto (no 'cartItems')
  const { cart = [] } = useContext(CartContext);
  
  // Calcular el total de productos en el carrito
  const cartItemCount = Array.isArray(cart) 
    ? cart.reduce((total, item) => total + (item.cantidad || 1), 0)
    : 0;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "ShoppingCart") {
            iconName = focused ? "cart" : "cart-outline";
            
            if (cartItemCount > 0) {
              return (
                <View style={{ position: 'relative' }}>
                  <Ionicons name={iconName} size={size} color={color} />
                  <View style={{
                    position: 'absolute',
                    right: -6,
                    top: -3,
                    backgroundColor: colors.primary,
                    borderRadius: 10,
                    width: 18,
                    height: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      color: '#fff',
                      fontSize: 10,
                      fontWeight: 'bold',
                    }}>
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </Text>
                  </View>
                </View>
              );
            }
            
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "AccountCustomer") {
            iconName = focused ? "person-circle" : "person-circle-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          }
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
      <Tab.Screen 
        name="Home" 
        component={Customer} 
        options={{ tabBarLabel: "Inicio" }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{ tabBarLabel: "Favoritos" }}
      />
      <Tab.Screen 
        name="ShoppingCart" 
        component={ShoppingCart} 
        options={{ tabBarLabel: "Carrito" }}
      />
      <Tab.Screen 
        name="AccountCustomer" 
        component={AccountCustomer} 
        options={{ tabBarLabel: "Yo" }}
      />
    </Tab.Navigator>
  );
}