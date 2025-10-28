import api from "./api";
import { saveSession, clearSession, getSession } from "./storageService";

export const loginUser = async (nombreUsuario, contraseña) => {
  try {
    const response = await api.post("/login", {
      nombreUsuario,
      contraseña,
    });

    const data = response.data;

    if (data.success) {
      await saveSession(data.token, data.user.idRol, data.user.idUsuario);
      return {
        success: true,
        token: data.token,
        user: data.user,
      };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.log("Error en login:", error);
    return { success: false, message: "Error de conexión con el servidor" };
  }
};

export const logout = async () => {
  try {
    await clearSession();
    return { success: true };
  } catch (error) {
    console.log("Error al cerrar sesión:", error);
    return { success: false };
  }
};

export const getCurrentSession = async () => {
  return await getSession();
};
