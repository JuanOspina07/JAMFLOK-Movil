import AsyncStorage from "@react-native-async-storage/async-storage";

//Claves 
const TOKEN_KEY = "userToken";
const ROLE_KEY = "userRole";
const USER_ID_KEY = "userId";

export const saveSession = async (token, idRol, idUsuario) => {
  try {
    await AsyncStorage.multiSet([
      [TOKEN_KEY, token],
      [ROLE_KEY, idRol.toString()],
      [USER_ID_KEY, idUsuario.toString()],
    ]);
    console.log("Sesión guardada correctamente");
  } catch (error) {
    console.error("Error guardando sesión:", error);
  }
};

export const getSession = async () => {
  try {
    const values = await AsyncStorage.multiGet([TOKEN_KEY, ROLE_KEY, USER_ID_KEY]);
    const token = values[0][1];
    const idRol = values[1][1];
    const idUsuario = values[2][1];

    if (token && idRol && idUsuario) {
      return {
        token,
        idRol: parseInt(idRol),
        idUsuario: parseInt(idUsuario),
      };
    }
    return null;
  } catch (error) {
    console.error("Error obteniendo sesión:", error);
    return null;
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, ROLE_KEY, USER_ID_KEY]);
    console.log("Sesión eliminada correctamente");
  } catch (error) {
    console.error("Error eliminando sesión:", error);
  }
};