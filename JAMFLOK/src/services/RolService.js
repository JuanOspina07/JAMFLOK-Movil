import api from "./api";
export const getRol = async ()=>{
    try {
        const response = await api.get("/rol");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al obtener los roles."
        );
    }
}