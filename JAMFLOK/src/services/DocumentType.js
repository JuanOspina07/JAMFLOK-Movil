import api from "./api";

export const documentTypes = async () => {
  try {
    const response = await api.get("/tipos-documento");
    return response.data;
    } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener los tipos de documento."
    );
  }
};