import { recoverPasswordService } from "../services/RecoverPasswordService"; 

export const recoverPassword = async (email) => {
  try {
    const response = await recoverPasswordService(email.trim().toLowerCase());

    if (!response.success) {
      throw new Error(response.message || "Error al procesar la solicitud");
    }

    return response;
  } catch (error) {
    if (error.message.includes("Network") || error.message.includes("timeout")) {
      throw new Error("Sin conexión a internet");
    }
    throw error;
  }
};