import api from "./api";

export const registerUser = async (usuarioData) => {
  try {
    const response = await api.post("/registro", usuarioData);
    return response.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error en el registro."
    );
  }
};