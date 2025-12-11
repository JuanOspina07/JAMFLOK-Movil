import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/cartContext';
import colors from '../styles/colors';

export default function CartIconWithBadge({ focused, color, size }) {
  const { cartItems } = useContext(CartContext);
  
  const cartItemCount = cartItems.reduce((total, item) => total + (item.cantidad || 1), 0);
  
  return (
    <View style={styles.container}>
      <Ionicons 
        name={focused ? "cart" : "cart-outline"} 
        size={size} 
        color={color} 
      />
      
      {cartItemCount > 0 && (
        <View style={[
          styles.badge,
          cartItemCount > 9 && styles.badgeLarge
        ]}>
          <Text style={styles.badgeText}>
            {cartItemCount > 9 ? '9+' : cartItemCount}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -4,
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.colorEnd,
  },
  badgeLarge: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});