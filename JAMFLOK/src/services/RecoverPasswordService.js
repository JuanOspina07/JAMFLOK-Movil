import api from "./api";

export const recoverPasswordService = async (email) => {  // ← Nombre correcto
  try {
    const response = await api.post("/recuperar-contrasena", { email });
    return { success: true, message: "Correo enviado correctamente", data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Correo no encontrado o error del servidor",
    };
  }
};