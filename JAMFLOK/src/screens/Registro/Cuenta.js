import React, { useEffect,useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";


import ProgressBar from "../../components/ProgressBar";
import stylesGlobal from "../../styles/stylesGlobal";
import GradientBackground from "../../hooks/gradientBackground";

import { registerUser } from "../../services/RegisterService";
import {getRol} from "../../services/RolService";

export default function Cuenta() {
  const navigation = useNavigation();
  const route = useRoute();
  const datos = route.params;

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  
   useEffect(() => {
    const fetchRoles = async () => {
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
    fetchRoles();
  }, []);

  const handleRegister = async () => {
    if (!nombreUsuario || !correo || !contraseña || !rolSeleccionado) {
      Alert.alert("Campos incompletos", "Por favor, llena todos los campos.");
      return;
    }
    const usuarioData = {
      ...datos,
      nombreUsuario,
      correo,
      contraseña,
      rol : rolSeleccionado,
    };
    console.log("Datos de usuario a registrar:", usuarioData);

    try {
      await registerUser(usuarioData);
      Alert.alert("Registro Exitoso", "Tu cuenta ha sido creada correctamente.");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error de Registro", "Hubo un problema al crear tu cuenta. Por favor, intenta nuevamente.");
    }
  };

  return (
    <View style={stylesGlobal.container}>
      <GradientBackground>
        <ProgressBar step={3} totalSteps={3} />
        <Text style={stylesGlobal.title}>Datos de Cuenta</Text>

        <View style={{ ...stylesGlobal.input, paddingVertical: 0, justifyContent: "center" }}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Picker
              selectedValue={rolSeleccionado}
              onValueChange={(value) => setRolSeleccionado(value)}
            >
              <Picker.Item label="Selecciona tu rol" value=""style={stylesGlobal.text} />
              {roles.map((item) => (
                <Picker.Item
                  key={item.ID_ROL}
                  label={item.Nombre}
                  value={item.ID_ROL} style={stylesGlobal.text}
                />
              ))}
            </Picker>
          )}
        </View>

        <TextInput placeholder="Nombre de Usuario" style={stylesGlobal.input} value={nombreUsuario} onChangeText={setNombreUsuario} />
        <TextInput placeholder="Correo" style={stylesGlobal.input} value={correo} onChangeText={setCorreo} />
        <TextInput placeholder="Contraseña" secureTextEntry style={stylesGlobal.input} value={contraseña} onChangeText={setContraseña} />

        <TouchableOpacity style={stylesGlobal.button} onPress={handleRegister} activeOpacity={0.8}>
          <Text style={stylesGlobal.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </GradientBackground>
    </View>
  );
}
