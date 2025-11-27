import api from "./api";

export const getAllBusinesses = async () => {
  try {
    const response = await api.get("/negocios");
    return response.data;
  } catch (error) {
    console.error("Error fetching businesses:", error);
    throw error;
  }
};

export const changeStatusBusiness = async (id, estado) => {
  try {
    const response = await api.patcha(`/negocio/estado/${id}`, {
      estado,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing business status:", error);
    throw error;
  }
};
