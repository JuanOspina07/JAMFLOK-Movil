import { ToastConfig } from "./src/components/ToasConfig";
import { AuthProvider } from "./src/context/authContext";
import { CartContext, CartProvider } from "./src/context/cartContext";
import AppNavigator from "./src/navigation/AppNavigator";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppNavigator />
        <Toast config={ToastConfig} />
      </CartProvider>
    </AuthProvider>
  );
}
