import { useState, useEffect, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { getCategoriesBusiness, getCities, postBusiness } from "../services/Entrepreneur";
import Toast from "react-native-toast-message";
import { AuthContext } from "../context/authContext";

export default function useAddBusinessLogic() {
  const { user } = useContext(AuthContext);

  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [categoria, setCategoria] = useState("");
  const [horario, setHorario] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const [ciudad, setCiudad] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  

  // Cargar categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await getCategoriesBusiness();
        setCategorias(response);
      } catch (error) {
        console.log("Error cargando categorías:", error);
      }
    };
    fetchCategorias();
  }, []);

  // Cargar ciudades
  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const response = await getCities();
        setCiudades(response);
      } catch (error) {
        console.log("Error cargando ciudades:", error);
      }
    };
    fetchCiudades();
  }, []);

  const pickImage = async (setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("file", { uri, type: "image/*", name: `image_${Date.now()}` });
    formData.append("upload_preset", "Jamflok");

    const res = await fetch("https://api.cloudinary.com/v1_1/dosnajo1t/image/upload", { method: "POST", body: formData });
    const data = await res.json();
    return data.secure_url;
  };

  const limpiarFormulario = () => {
  setNombre("");
  setRut("");
  setDescripcion("");
  setDireccion("");
  setTelefono("");
  setCategoria("");
  setHorario("");
  setBanner(null);
  setLogo(null);
  setCiudad("");      // limpia el ID
  setSearchCity("");  // limpia el input visible
};


  // Función principal para registrar negocio
  const registrarNegocioLogic = async () => {
    if (!user?.idUsuario || !ciudad || !categoria || !nombre) {
      Toast.show({ type: "error", text1: "Campos vacios", text2: "Por favor completa todos los campos",position: "bottom", visibilityTime: 2000 });
      return;
    }

    try {
      const bannerURL = banner ? await uploadImage(banner) : null;
      const logoURL = logo ? await uploadImage(logo) : null;

      const data = {
        ID_USUARIOS: user.idUsuario,
        ID_CATEGORIA: categoria,
        ID_CIUDAD: ciudad,
        NombreNegocio: nombre,
        RUT: rut,
        Descripcion: descripcion,
        Direccion: direccion,
        NumTelefono: telefono,
        Horario: horario,
        Imagen: bannerURL,
        Logo: logoURL,
      };

      await postBusiness(data);
      limpiarFormulario();
      

      Toast.show({ type: "success", text1: "Negocio registrado", text2: "Se ha registrado correctamente tu negocio", position: "bottom", visibilityTime: 2000 });
    } catch (error) {
      console.log("Error al registrar negocio:", error);
      Toast.show({ type: "error", text1: "Error", text2: "No se pudo registrar el negocio", position: "bottom", visibilityTime: 2000 });
    }
  };

  return {
  nombre, setNombre,
  rut, setRut,
  descripcion, setDescripcion,
  direccion, setDireccion,
  telefono, setTelefono,
  categoria, setCategoria,
  horario, setHorario,
  categorias,
  banner, setBanner,
  logo, setLogo,
  ciudad, setCiudad,
  searchCity, setSearchCity,
  ciudades,
  pickImage,
  limpiarFormulario,
  registrarNegocioLogic,
};

}
