import api from "./api";
export const getBusiness = async (id)=>{
    try {
        const response = await api.get(`/negocios/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al obtener mis negocios."
        );
    }
}
export const getBusinessDetails = async (id)=>{
    try {
        const response = await api.get(`/negocios/detalle/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al obtener mis negocios."
        );
    }
}
export const getProductsByBusiness = async (id)=>{
    try {
        const response = await api.get(`/productos/negocio/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al obtener mis negocios."
        );
    }
}
export const updateBusinessStatus = async (idNegocio, estado) => {
  try {
    const response = await api.patch(`/negocio/estado/${idNegocio}`, {
      estado,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Error al actualizar el estado del negocio."
    );
  }
}
export const updateProductStatus = async (idProducto, estado) => {
  try {
    const response = await api.patch(`/producto/estado/${idProducto}`, {
      estado,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Error al actualizar el estado del producto."
    );
  }
}
export const getReviewByBusiness = async (idNegocio) => {
  try {
        const response = await api.get(`/resenas/negocio/${idNegocio}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al obtener reseñas del negocio."
        );
    }
}
export const getCities = async () => {
  try {
        const response = await api.get(`/todas-ciudades`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al obtener las ciudades."
        );
    }
}
export const getCategoriesBusiness = async () => {
  try {
        const response = await api.get(`/categorias`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al obtener las categorias."
        );
    }
}
export const postBusiness = async (data) => {
  try {
    const response = await api.post(`/negociosnuevo`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Error al registrar el negocio."
    );
  }
};
