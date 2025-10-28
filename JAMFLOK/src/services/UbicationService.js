import api from "./api";

export const pais = async () =>{
    try {
        const response = await api.get("/paises");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al obtener los países."
        );
    }
}

export const departamentos = async (idPais) =>{
    try {
        const response = await api.get(`/departamentos/${idPais}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al obtener los departamentos."
        );
    }
}
export const ciudades = async (idDepartamento) =>{
    try {
        const response = await api.get(`/ciudades/${idDepartamento}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al obtener las ciudades."
        );
    }
}