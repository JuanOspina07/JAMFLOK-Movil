import { getBusinessDetails, getProductsByBusiness, getReviewByBusiness, updateBusinessStatus, updateProductStatus,} from "../services/Entrepreneur";
import Toast from "react-native-toast-message";

export const cargarDatosBusiness = async (idNegocio, setNegocio, setProductos, setEstadoNegocio, setLoading) => {
  try {
    const data = await getBusinessDetails(idNegocio);
    const prods = await getProductsByBusiness(idNegocio);

    setNegocio(data);
    setProductos(prods);
    setEstadoNegocio(data.Estado === 1);
  } catch (error) {
    console.log("Error cargando detalles", error);
  } finally {
    setLoading(false);
  }
};

export const cambiarEstadoNegocioLogic = async (
  idNegocio,
  estadoNegocio,
  negocio,
  setEstadoNegocio,
  setNegocio
) => {
  const nuevoEstado = estadoNegocio ? 0 : 1;

  try {
    await updateBusinessStatus(idNegocio, nuevoEstado);

    setEstadoNegocio(!estadoNegocio);
    setNegocio({ ...negocio, Estado: nuevoEstado });

    Toast.show({
      type: "success",
      text1: "Estado actualizado",
      text2: "El negocio cambió su estado correctamente.",
      position: "bottom",
      visibilityTime: 2000,
    });
  } catch (e) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo cambiar el estado.",
      position: "bottom",
      visibilityTime: 2000,
    });
  }
};

export const cambiarEstadoProductoLogic = async (
  producto,
  setProductos
) => {
  const nuevoEstado = producto.Estado === 1 ? 0 : 1;

  try {
    await updateProductStatus(producto.ID_PRODUCTOS, nuevoEstado);

    setProductos((prev) =>
      prev.map((p) =>
        p.ID_PRODUCTOS === producto.ID_PRODUCTOS
          ? { ...p, Estado: nuevoEstado }
          : p
      )
    );

    Toast.show({
      type: "success",
      text1: "Producto actualizado",
      text2: "Estado cambiado correctamente.",
      position: "bottom",
      visibilityTime: 2000,
    });
  } catch (err) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo cambiar el estado del producto.",
      position: "bottom",
      visibilityTime: 2000,
    });
  }
};

export const cargarReviewBusiness = async (idNegocio, setReseñas) => {
  try {
    const data = await getReviewByBusiness(idNegocio);
    setReseñas(data);
  } catch (error) {
    console.log("Error cargando reseñas", error);
  }
};
