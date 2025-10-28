import { Alert } from "react-native";

export const LoginLogic = (login, navigation) => {
  const handleLogin = async (nombreUsuario, contraseña, setLoading) => {
    if (!nombreUsuario || !contraseña) {
      Alert.alert("Campos vacíos", "Por favor completa todos los campos.");
      return;
    }

    try {
      setLoading(true);
      const result = await login(nombreUsuario, contraseña);
      setLoading(false);

      if (!result.success) {
        Alert.alert("Error", result.message || "Credenciales incorrectas");
      }
    } catch (error) {
      setLoading(false);
      console.log("Error en loginLogic:", error);
      Alert.alert("Error", "Ocurrió un problema al iniciar sesión.");
    }
  };

  const handleRecuperar = () => {
    navigation.navigate("Recuperar");
  };

  return { handleLogin, handleRecuperar };
};
