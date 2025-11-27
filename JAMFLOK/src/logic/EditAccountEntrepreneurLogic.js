import Toast from "react-native-toast-message";
import { getCities, getInfoEntrepreneur, updateInfoEntrepreneur,} from "../services/Entrepreneur";
import { documentTypes } from "../services/DocumentType";

export const cargarDatosUsuario = async (idUsuario, setUsuario, setLoading) => {
  try {
    const data = await getInfoEntrepreneur(idUsuario);
    setUsuario(data);
  } catch (error) {
    console.log("Error cargando usuario", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudieron cargar los datos.",
      position: "bottom",
    });
  } finally {
    setLoading(false);
  }
};

export const typesDocument = async (setTiposDocumento) => {
  try {
    const data = await documentTypes();
    setTiposDocumento(data);
  } catch (error) {
    console.log("Error cargando tipos de documento", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudieron cargar los tipos de documento.",
      position: "bottom",
    });
  }
};
export const cargarCiudades = async (setCiudades) => {
  try {
    const data = await getCities();
    setCiudades(data);
  } catch (error) {
    console.log("Error cargando ciudades", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudieron cargar las ciudades.",
      position: "bottom",
    });
  }
};


export const guardarCambiosLogic = async (
  idUsuario,
  usuario,
  setUsuario,
  form
) => {
  try {
    const datosEnviar = {};

    if (!form.username.trim()) {
      return Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2: "El nombre de usuario no puede estar vacío.",
        position: "bottom",
      });
    }
    if (!form.primerNombre.trim()) {
      return Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2: "El primer nombre no puede estar vacío.",
        position: "bottom",
      });
    }
    if (!form.primerApellido.trim()) {
      return Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2: "El primer apellido no puede estar vacío.",
        position: "bottom",
      });
    }
    if (!form.segundoApellido.trim()) {
      return Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2: "El segundo apellido no puede estar vacío.",
        position: "bottom",
      });
    }
     if (!form.tipoDocumento) {
      return Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2: "Debes seleccionar un tipo de documento.",
        position: "bottom",
      });
    }

    if (!form.numDocumento.trim()) {
      return Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2: "El numero de documento no puede estar vacío.",
        position: "bottom",
      });
    }

    if (!form.ciudad) {
      return Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2: "Debes seleccionar una ciudad.",
        position: "bottom",
      });
    }


    if (!form.correo.trim()) {
      return Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2: "El correo no puede estar vacío.",
        position: "bottom",
      });
    }

    if (!form.telefono.trim()) {
      return Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2: "El teléfono no puede estar vacío.",
        position: "bottom",
      });
    }

    if (!form.fechaNacimiento) {
      return Toast.show({
        type: "error",
        text1: "Campo vacío",
        text2: "Debes seleccionar una fecha.",
        position: "bottom",
      });
    }

    if (form.username !== usuario.NombreUsuario)
      datosEnviar.NombreUsuario = form.username;

    if (form.primerNombre !== usuario.PrimerNombre)
      datosEnviar.PrimerNombre = form.primerNombre;

    if (form.segundoNombre !== usuario.SegundoNombre)
      datosEnviar.SegundoNombre = form.segundoNombre;

    if (form.primerApellido !== usuario.PrimerApellido)
      datosEnviar.PrimerApellido = form.primerApellido;

    if (form.segundoApellido !== usuario.SegundoApellido)
      datosEnviar.SegundoApellido = form.segundoApellido;

    if (form.tipoDocumento !== usuario.IDTipoDocumento) {
      datosEnviar.ID_TIPO_DOCUMENTO = form.tipoDocumento;
      datosEnviar.ID_DOCUMENTO = usuario.ID_DOCUMENTO;
    }

    if (form.numDocumento !== usuario.NumeroDocumento)
      datosEnviar.NumeroDocumento = form.numDocumento;

    if (form.ciudad && form.ciudad !== usuario.ID_CIUDAD) {
      datosEnviar.ID_CIUDAD = form.ciudad;
    }

    if (form.correo !== usuario.CorreoElectronico)
      datosEnviar.CorreoElectronico = form.correo;

    if (form.telefono !== usuario.NumTelefono)
      datosEnviar.NumTelefono = form.telefono;

    const normalizar = (f) => f?.split("T")[0];

    if (normalizar(form.fechaNacimiento) !== normalizar(usuario.FechaNacimiento)) {
      datosEnviar.FechaNacimiento = normalizar(form.fechaNacimiento);
    }

    if (form.passNueva || form.passConfirmar) {
      if (!form.passNueva.trim() || !form.passConfirmar.trim()) {
        return Toast.show({
          type: "error",
          text1: "Contraseña vacía",
          text2: "No puedes dejar campos de contraseña vacíos.",
          position: "bottom",
        });
      }

      if (form.passNueva !== form.passConfirmar) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: "Las contraseñas no coinciden.",
          position: "bottom",
        });
      }

      datosEnviar.ContrasenaNueva = form.passNueva;
    }

    if (Object.keys(datosEnviar).length === 0) {
      return Toast.show({
        type: "info",
        text1: "Sin cambios",
        text2: "No realizaste ninguna modificación.",
        position: "bottom",
      });
    }

    await updateInfoEntrepreneur(idUsuario, datosEnviar);

    setUsuario({ ...usuario, ...datosEnviar });

    Toast.show({
      type: "success",
      text1: "Guardado",
      text2: "Cambios actualizados correctamente.",
      position: "bottom",
    });

  } catch (error) {
    console.log(error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No fue posible guardar los cambios.",
      position: "bottom",
    });
  }
};
