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