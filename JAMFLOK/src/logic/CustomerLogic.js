import Toast from "react-native-toast-message";
import {
  addFavorite,
  deleteFavorite,
  getBusinessCustomer,
  getFavorites,
} from "../services/Customer";

// Cargar todos los negocios para clientes
export const getBusinessCustomerLogic = async (setNegocios, setLoading) => {
  try {
    const data = await getBusinessCustomer();
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

// Filtrar negocios
export const filtrarNegociosLogic = (negocios, search) => {
  return negocios.filter((n) =>
    n?.NombreNegocio?.toLowerCase().includes(search.toLowerCase())
  );
};

// Lógica de estrellas
export const renderStarsLogic = (rating) => {
  return Array.from({ length: 5 }, (_, i) => ({
    filled: i + 1 <= rating,
  }));
};

// Añadir/Quitar un favorito
export const toggleFavoritoLogic = async (
  idNegocio,
  idUsuario,
  favoritos,
  setFavoritos
) => {
  try {
    const esFavorito = favoritos.some((f) => f.ID_NEGOCIOS === idNegocio);

    if (esFavorito) {
      await deleteFavorite(idNegocio, idUsuario);

      setFavoritos(favoritos.filter((f) => f.ID_NEGOCIOS !== idNegocio));

      Toast.show({
        type: "success",
        text1: "Favorito eliminado",
        text2: "El negocio se eliminó de tus favoritos.",
        position: "bottom",
      });
    } else {
      await addFavorite(idNegocio, idUsuario);

      setFavoritos([...favoritos, { ID_NEGOCIOS: idNegocio }]);

      Toast.show({
        type: "success",
        text1: "Agregado a favoritos",
        text2: "El negocio se agregó correctamente.",
        position: "bottom",
      });
    }
  } catch (error) {
    console.log("Error con favoritos:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo modificar favoritos.",
      position: "bottom",
    });
  }
};

// Cargar favoritos
export const getFavoritesLogic = async (idUsuario, setFavoritos, setLoading) => {
  try {
    const data = await getFavorites(idUsuario);
    setFavoritos(data);
  } catch (error) {
    console.log("Error cargando favoritos", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudieron cargar los favoritos",
      position: "bottom",
    });
  } finally {
    if (setLoading) setLoading(false);
  }
};
