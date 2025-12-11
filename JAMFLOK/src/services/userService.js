import api from "./api";

export const getUsuarios = async () => {
  try {
    const response = await api.get("/completo");
    return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al obtener los usuarios."
        );
    }
};

export const getUsuarioById = async (id) => {
  try {
    const response = await api.get(`/usuario/${id}`);
    return response.data;
  } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al obtener los usuarios."
      );
  }
};