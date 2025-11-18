import { ToastConfig } from "./src/components/ToasConfig";
import { AuthProvider } from "./src/context/authContext";
import AppNavigator from "./src/navigation/AppNavigator";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <Toast config={ToastConfig} />
    </AuthProvider>
  );
}
