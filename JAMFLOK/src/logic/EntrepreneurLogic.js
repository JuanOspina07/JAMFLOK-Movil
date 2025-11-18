import { getBusiness } from "../services/Entrepreneur";
import Toast from "react-native-toast-message";

export const cargarNegociosLogic = async (idUsuario, setNegocios, setLoading) => {
  try {
    const data = await getBusiness(idUsuario);
    setNegocios(data);
  } catch (error) {
    console.log("Error cargando negocios", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudieron cargar los negocios.",
      position: "bottom",
      visibilityTime: 2000,
    });
  } finally {
    setLoading(false);
  }
};


export const filtrarNegociosLogic = (negocios, search) => {
  return negocios.filter((n) =>
    n?.NombreNegocio?.toLowerCase().includes(search.toLowerCase())
  );
};


export const renderStarsLogic = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push({
      filled: i <= rating,
    });
  }
  return stars;
};
