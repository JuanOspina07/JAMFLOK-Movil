import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { postProducts } from "../services/Entrepreneur";

export default function useAddProductsLogic(idNegocio) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("file", {
      uri,
      type: "image/*",
      name: `producto_${Date.now()}.jpg`,
    });
    formData.append("upload_preset", "Jamflok");

    const res = await fetch("https://api.cloudinary.com/v1_1/dosnajo1t/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const limpiarFormulario = () => {
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setImagen(null);
  };

  const crearProductoLogic = async () => {
  if (!nombre || !descripcion || !precio || !stock || !imagen) {
    Toast.show({
      type: "error",
      text1: "Campos incompletos",
      text2: "Todos los campos son obligatorios",
    });
    return false;
  }

  try {
    setLoading(true);

    const urlImagen = await uploadImage(imagen);

    const body = {
      ID_NEGOCIOS: idNegocio,
      Nombre: nombre,
      Descripcion: descripcion,
      Precio: precio,
      Stock: stock,
      Imagen: urlImagen,
    };

    await postProducts(body);


    Toast.show({
      type: "success",
      text1: "Producto creado",
      text2: "Se añadió correctamente",
      position: "bottom",
    });

    limpiarFormulario();
    return true;

  } catch (error) {
    console.log("Error creando producto:", error);
    Toast.show({ type: "error", text1: "Error inesperado" });
    return false;

  } finally {
    setLoading(false);
  }
};


  return {
    nombre, setNombre,
    descripcion, setDescripcion,
    precio, setPrecio,
    stock, setStock,
    imagen,
    pickImage,
    crearProductoLogic,
    loading,
  };
}
