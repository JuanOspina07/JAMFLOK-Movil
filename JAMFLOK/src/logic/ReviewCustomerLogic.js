import { useState, useEffect, useContext } from "react";
import { getBusinessDetails } from "../services/Entrepreneur";
import Toast from "react-native-toast-message";
import { addReview } from "../services/Customer";
import { AuthContext } from "../context/authContext";

export default function useReviewLogic(idNegocio, navigation) {
  const { user } = useContext(AuthContext);

  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [procesando, setProcesando] = useState(false);

  const [negocio, setNegocio] = useState(null); // <-- info del negocio

  // Traer detalles del negocio
  useEffect(() => {
    const fetchNegocio = async () => {
      try {
        const data = await getBusinessDetails(idNegocio);
        setNegocio(data);
      } catch (error) {
        console.log("Error cargando negocio:", error);
        Toast.show({ type: "error", text1: "Error", text2: "No se pudo cargar el negocio" });
      }
    };
    fetchNegocio();
  }, [idNegocio]);

  // Función para enviar reseña
  const enviarReseña = async () => {
    if (calificacion === 0 || comentario.trim() === "") return;

    setProcesando(true);

    try {
      const reviewData = {
        ID_NEGOCIO: idNegocio,
        ID_USUARIO: user.idUsuario,
        ID_CALIFICACION: calificacion,
        Descripcion: comentario,
      };

      await addReview(reviewData);

      Toast.show({ type: "success", text1: "Reseña enviada", text2: "Gracias por tu opinión!" });
      navigation.goBack();
    } catch (error) {
      console.log("Error enviando reseña:", error);
      Toast.show({ type: "error", text1: "Error", text2: "No se pudo enviar la reseña" });
    } finally {
      setProcesando(false);
    }
  };

  return {
    calificacion,
    setCalificacion,
    comentario,
    setComentario,
    procesando,
    enviarReseña,
    negocio, // <-- devolvemos los datos del negocio
  };
}
