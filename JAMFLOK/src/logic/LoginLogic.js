import Toast from "react-native-toast-message";

export const LoginLogic = (login, navigation) => {
  const handleLogin = async (nombreUsuario, contraseña, setLoading) => {
    if (!nombreUsuario || !contraseña) {
      Toast.show({
        type: "error",
        text1: "Campos vacíos",
        text2: "Por favor completa todos los campos." ,
        position: "bottom",
        visibilityTime: 2000,
      });
      return;
    }

    try {
      setLoading(true);
      const result = await login(nombreUsuario, contraseña);
      setLoading(false);

      if (!result.success) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: result.message || "Credenciales incorrectas",
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error en loginLogic:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Ocurrió un problema al iniciar sesión.",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  const handleRecuperar = () => {
    navigation.navigate("Recuperar");
  };

  return { handleLogin, handleRecuperar };
};
