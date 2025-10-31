import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { getRol } from "../services/RolService";
import { registerUser } from "../services/RegisterService";
import { documentTypes } from "../services/DocumentType";
import {pais, departamentos as getDepartamento,ciudades as getCiudades,} from "../services/UbicationService";

// Lógica para DatosPersonales
const isAgeConsistent = (fechaNacimiento, edad) => {
  const birthDate = new Date(fechaNacimiento);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthday = today.getMonth() > birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasHadBirthday) {
    age--;
  }

  return age === parseInt(edad, 10);
};

export const useDatosPersonalesLogic = (navigation) => {
  const handleNext = (formData) => {
    const {primerNombre,segundoNombre,primerApellido,segundoApellido,edad,fechaNacimiento,} = formData;

    if (!primerNombre || !primerApellido || !segundoApellido || !edad || !fechaNacimiento) {
      Alert.alert("Campos incompletos","Por favor, llena todos los campos obligatorios.");
      return;
    }

    if (!isAgeConsistent(fechaNacimiento, edad)) {
      Alert.alert("Inconsistencia de edad","La edad no coincide con la fecha de nacimiento."
      );
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

// Lógica para Ubicación
export const useUbicacionLogic = () => {
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [tipos, paisesData] = await Promise.all([documentTypes(),pais(),]);
        setTiposDocumento(tipos);
        setPaises(paisesData);
      } catch (error) {
        console.log("Error al cargar datos:", error);
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
    }
  };

  const loadCiudades = async (departamentoId) => {
    if (!departamentoId) return;
    try {
      const ciudadesData = await getCiudades(departamentoId);
      setCiudades(ciudadesData);
    } catch (error) {
      console.log("Error al cargar ciudades:", error);
    }
  };

  const handleNext = (navigation, datosPrevios, formData) => {
    const { idCiudad, celular, numeroDocumento, idTipoDocumento } = formData;

    if (!idCiudad || !celular || !numeroDocumento || !idTipoDocumento) {
      Alert.alert("Campos incompletos","Por favor, llena todos los campos obligatorios.");
      return;
    }

  if (!/^\d{10}$/.test(celular)) {
    Alert.alert("Número de celular inválido", "Debe tener exactamente 10 dígitos numéricos.");
    return;
  }

  switch (idTipoDocumento) {
    case 1: // Cédula de Ciudadanía
      if (!/^\d{8,10}$/.test(numeroDocumento)) {
        Alert.alert("Cédula inválida", "Debe contener entre 8 y 10 dígitos numéricos.");
        return;
      }
      break;

    case 2: // Tarjeta de Identidad
      if (!/^\d{10,11}$/.test(numeroDocumento)) {
        Alert.alert("Tarjeta de identidad inválida", "Debe contener entre 10 y 11 dígitos numéricos.");
        return;
      }
      break;

    case 3: // Cédula de Extranjería
      if (!/^[A-Za-z0-9]{6,15}$/.test(numeroDocumento)) {
        Alert.alert("Cédula de extranjería inválida", "Debe contener entre 6 y 15 caracteres alfanuméricos.");
        return;
      }
      break;

    default:
      Alert.alert("Tipo de documento inválido", "Selecciona un tipo de documento válido.");
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

// Lógica para Cuenta

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
        Alert.alert("Error", "No se pudieron cargar los roles.");
      } finally {
        setLoading(false);
      }
    };
    loadRoles();
  }, []);

  // Validación de campos de cuenta (excepto contraseña)
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
      return {
        valid: false,
        message: "Por favor, ingresa un correo electrónico válido.",
      };
    }
    return { valid: true };
  };

  const handleRegister = async (datos, formData) => {
    const { nombreUsuario, correo, contraseña, rolSeleccionado } = formData;

    // Validar campos primero (excepto contraseña)
    const fieldValidation = validateAccountFields({ nombreUsuario, correo, rolSeleccionado });
    if (!fieldValidation.valid) {
      Alert.alert("Campos inválidos", fieldValidation.message);
      return false;
    }

    // Validar contraseña
    const { isValid, passwordChecks } = validatePassword(contraseña, true);
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
      return new Promise((resolve) => {
        Alert.alert(
          "Registro Exitoso",
          "Tu cuenta ha sido creada correctamente.",
          [
            {
              text: "OK",
              onPress: () => resolve(true),
            },
          ],
          { cancelable: false }
        );
      });
    } catch (error) {
      Alert.alert(
        "Error de Registro",
        "Hubo un problema al crear tu cuenta. Por favor, intenta nuevamente."
      );
      return false;
    }
  };

  return {
    roles,
    loading,
    handleRegister,
    validateAccountFields,
  };
};
export const validatePassword = (contraseña, showAlert = true) => {
  const passwordChecks = {
    length: contraseña.length >= 8,
    uppercase: /[A-Z]/.test(contraseña),
    number: /\d/.test(contraseña),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(contraseña),
  };

  const isValid = Object.values(passwordChecks).every(Boolean);

  if (!isValid && showAlert) {
    Alert.alert(
      "Contraseña inválida",
      "Debe cumplir todos los requisitos:\n- Mínimo 8 caracteres\n- Al menos una mayúscula\n- Un número\n- Un carácter especial"
    );
  }

  return { isValid, passwordChecks };
};