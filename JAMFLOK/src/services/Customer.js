import api from "./api";
export const getBusinessCustomer = async () => {
  try {
    const response = await api.get(`/negocios`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener los negocios."
    );
  }
};
export const addFavorite = async (ID_NEGOCIO, ID_USUARIOS) => {
  try {
    const res = await api.post("/favoritos/add", { ID_NEGOCIO, ID_USUARIOS });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al guardar en favoritos."
    );
  }
};
export const deleteFavorite = async (ID_NEGOCIO, ID_USUARIOS) => {
  try {
    const res = await api.delete("/favoritos/delete", {
      data: { ID_NEGOCIO, ID_USUARIOS }
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar de favoritos."
    );
  }
};


export const getFavorites = async (idUsuario) => {
  try {
    const res = await api.get(`/favoritos/${idUsuario}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obteenr favoritos."
    );
  }
};

export const addReview = async (data) => {
  try {
    const response = await api.post(`/resenas`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Error al registrar el negocio."
    );
  }
};

export const askAIRecommendation = async (userMessage) => {
  try {
    const response = await api.post("/recomendacion/negocios", {
      mensaje: userMessage, // asegúrate que el backend espera 'mensaje'
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener la recomendación de IA."
    );
  }
};