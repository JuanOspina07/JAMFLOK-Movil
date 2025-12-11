import React, { createContext, useState, useEffect } from "react";
import { LayoutAnimation } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

const STORAGE_KEY = "@jamflok_cart_v1";



export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setCart(JSON.parse(json));
      } catch (e) {
        console.log("Error cargando carrito", e);
      }
    })();
  }, []);

  // Persist cart on change
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {
        console.log("Error guardando carrito", e);
      }
    })();
  }, [cart]);

  // Helper: animate layout changes
  const animate = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const addToCart = (producto) => {
    animate();
    setCart((prev) => {
      const existe = prev.find((p) => p.ID_PRODUCTOS === producto.ID_PRODUCTOS);
      if (existe) {
        return prev.map((p) =>
          p.ID_PRODUCTOS === producto.ID_PRODUCTOS
            ? { ...p, cantidad: (p.cantidad || 1) + 1 }
            : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const increaseQty = (id) => {
    animate();
    setCart((prev) =>
      prev.map((p) =>
        p.ID_PRODUCTOS === id ? { ...p, cantidad: (p.cantidad || 1) + 1 } : p
      )
    );
  };

  const decreaseQty = (id) => {
    animate();
    setCart((prev) =>
      prev
        .map((p) =>
          p.ID_PRODUCTOS === id
            ? { ...p, cantidad: Math.max(1, (p.cantidad || 1) - 1) }
            : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  const removeFromCart = (id) => {
    animate();
    setCart((prev) => prev.filter((p) => p.ID_PRODUCTOS !== id));
  };

  const clearCart = () => {
    animate();
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
