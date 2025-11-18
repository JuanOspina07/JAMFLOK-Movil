import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { getRol } from "../services/RolService";
import { registerUser } from "../services/RegisterService";
import { documentTypes } from "../services/DocumentType";
import {
  pais,
  departamentos as getDepartamento,
  ciudades as getCiudades,
} from "../services/UbicationService";


const isAgeConsistent = (fechaNacimiento, edad) => {
  const birthDate = new Date(fechaNacimiento);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasHadBirthday) age--;

  return age === parseInt(edad, 10);
};

export const useDatosPersonalesLogic = (navigation) => {
  const handleNext = (formData) => {
    const { primerNombre, segundoNombre, primerApellido, segundoApellido, edad, fechaNacimiento } = formData;

    if (!primerNombre || !primerApellido || !segundoApellido || !edad || !fechaNacimiento) {
      Toast.show({
        type: "error",
        text1: "Campos incompletos",
        text2: "Por favor, llena todos los campos obligatorios.",
        position: "bottom",
        visibilityTime: 2000,
      });
      return;
    }

    if (!isAgeConsistent(fechaNacimiento, edad)) {
      Toast.show({
        type: "error",
        text1: "Inconsistencia de edad",
        text2: "La edad no coincide con la fecha de nacimiento.",
        position: "bottom",
        visibilityTime: 2000,
      });
      return;
    }

    navigation.navigate("Paso2", {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      edad,
      fechaNacimiento,
    });
  };

  return { handleNext };
};


export const useUbicacionLogic = () => {
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [tipos, paisesData] = await Promise.all([documentTypes(), pais()]);
        setTiposDocumento(tipos);
        setPaises(paisesData);
      } catch (error) {
        console.log("Error al cargar datos:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se pudieron cargar los datos iniciales.",
          position: "bottom",
          visibilityTime: 2000,
        });
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const loadDepartamentos = async (paisId) => {
    if (!paisId) return;
    try {
      const deptos = await getDepartamento(paisId);
      setDepartamentos(deptos);
    } catch (error) {
      console.log("Error al cargar departamentos:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudieron cargar los departamentos.",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  const loadCiudades = async (departamentoId) => {
    if (!departamentoId) return;
    try {
      const ciudadesData = await getCiudades(departamentoId);
      setCiudades(ciudadesData);
    } catch (error) {
      console.log("Error al cargar ciudades:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudieron cargar las ciudades.",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  const handleNext = (navigation, datosPrevios, formData) => {
    const { idCiudad, celular, numeroDocumento, idTipoDocumento } = formData;

    if (!idCiudad || !celular || !numeroDocumento || !idTipoDocumento) {
      Toast.show({
        type: "error",
        text1: "Campos incompletos",
        text2: "Por favor, llena todos los campos obligatorios.",
        position: "bottom",
        visibilityTime: 2000,
      });
      return;
    }

    if (!/^\d{10}$/.test(celular)) {
      Toast.show({
        type: "error",
        text1: "Número de celular inválido",
        text2: "Debe tener exactamente 10 dígitos numéricos.",
        position: "bottom",
        visibilityTime: 2000,
      });
      return;
    }

    switch (idTipoDocumento) {
      case 1: // Cédula de Ciudadanía
        if (!/^\d{8,10}$/.test(numeroDocumento)) {
          Toast.show({
            type: "error",
            text1: "Cédula inválida",
            text2: "Debe contener entre 8 y 10 dígitos numéricos.",
            position: "bottom",
            visibilityTime: 2000,
          });
          return;
        }
        break;

      case 2: // Tarjeta de Identidad
        if (!/^\d{10,11}$/.test(numeroDocumento)) {
          Toast.show({
            type: "error",
            text1: "Tarjeta de identidad inválida",
            text2: "Debe contener entre 10 y 11 dígitos numéricos.",
            position: "bottom",
            visibilityTime: 2000,
          });
          return;
        }
        break;

      case 3: // Cédula de Extranjería
        if (!/^[A-Za-z0-9]{6,15}$/.test(numeroDocumento)) {
          Toast.show({
            type: "error",
            text1: "Cédula de extranjería inválida",
            text2: "Debe contener entre 6 y 15 caracteres alfanuméricos.",
            position: "bottom",
            visibilityTime: 2000,
          });
          return;
        }
        break;

      default:
        Toast.show({
          type: "error",
          text1: "Tipo de documento inválido",
          text2: "Selecciona un tipo de documento válido.",
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
    }

    navigation.navigate("Paso3", {
      ...datosPrevios,
      idCiudad,
      celular,
      numeroDocumento,
      idTipoDocumento,
    });
  };

  return {
    loading,
    tiposDocumento,
    paises,
    departamentos,
    ciudades,
    loadDepartamentos,
    loadCiudades,
    handleNext,
  };
};


export const useCuentaLogic = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await getRol();
        setRoles(data);
      } catch (error) {
        console.log("Error al obtener roles:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se pudieron cargar los roles.",
          position: "bottom",
          visibilityTime: 2000,
        });
      } finally {
        setLoading(false);
      }
    };
    loadRoles();
  }, []);

  const validateAccountFields = ({ nombreUsuario, correo, rolSeleccionado }) => {
    if (!nombreUsuario || !correo || !rolSeleccionado) {
      return { valid: false, message: "Por favor, llena todos los campos." };
    }

    const usernameRegex = /^(?![._])(?!.*[._]{2})(?!.*[.]$)[a-zA-Z0-9._]+$/;
    if (!usernameRegex.test(nombreUsuario)) {
      return {
        valid: false,
        message:
          "El nombre solo puede tener letras, números, puntos y guiones bajos.\nNo puede iniciar con guion o punto, terminar con punto ni tener dos guiones o puntos seguidos.",
      };
    }

    if (nombreUsuario.length < 6 || nombreUsuario.length > 13) {
      return {
        valid: false,
        message: "El nombre de usuario debe tener entre 6 y 13 caracteres.",
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return { valid: false, message: "Por favor, ingresa un correo electrónico válido." };
    }

    return { valid: true };
  };

  const handleRegister = async (datos, formData) => {
    const { nombreUsuario, correo, contraseña, rolSeleccionado } = formData;

    const fieldValidation = validateAccountFields({ nombreUsuario, correo, rolSeleccionado });
    if (!fieldValidation.valid) {
      Toast.show({
        type: "error",
        text1: "Campos inválidos",
        text2: fieldValidation.message,
        position: "bottom",
        visibilityTime: 3000,
      });
      return false;
    }

    const { isValid } = validatePassword(contraseña, true);
    if (!isValid) return false;

    const usuarioData = {
      ...datos,
      nombreUsuario,
      correo,
      contraseña,
      rol: rolSeleccionado,
    };

    try {
      await registerUser(usuarioData);
      Toast.show({
        type: "success",
        text1: "Registro exitoso",
        text2: "Tu cuenta ha sido creada correctamente.",
        position: "bottom",
        visibilityTime: 2000,
      });
      return true;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error de registro",
        text2: "Hubo un problema al crear tu cuenta. Por favor, intenta nuevamente.",
        position: "bottom",
        visibilityTime: 2000,
      });
      return false;
    }
  };

  return { roles, loading, handleRegister, validateAccountFields };
};


export const validatePassword = (contraseña, showToast = true) => {
  const passwordChecks = {
    length: contraseña.length >= 8,
    uppercase: /[A-Z]/.test(contraseña),
    number: /\d/.test(contraseña),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(contraseña),
  };

  const isValid = Object.values(passwordChecks).every(Boolean);

  if (!isValid && showToast) {
    Toast.show({
      type: "error",
      text1: "Contraseña inválida",
      text2:
        "Debe cumplir todos los requisitos:\n- Mínimo 8 caracteres\n- Al menos una mayúscula\n- Un número\n- Un carácter especial",
      position: "bottom",
      visibilityTime: 3000,
    });
  }

  return { isValid, passwordChecks };
};
