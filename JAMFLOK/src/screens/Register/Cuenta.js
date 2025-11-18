import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import ProgressBar from "../../components/ProgressBar";
import GradientBackground from "../../hooks/gradientBackground";
import { useCuentaLogic, validatePassword } from "../../logic/RegisterLogic";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import stylesGlobal from "../../styles/stylesGlobal";

export default function Cuenta() {
  const navigation = useNavigation();
  const route = useRoute();
  const datos = route.params;

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState("");
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const { roles, loading, handleRegister: handleRegisterLogic } = useCuentaLogic();

  // Actualiza los checks de la contraseña en tiempo real
  useEffect(() => {
    const { passwordChecks } = validatePassword(contraseña, false);
    setPasswordChecks(passwordChecks);
  }, [contraseña]);

  const handleRegister = async () => {
    // Usamos la lógica completa de handleRegisterLogic
    const success = await handleRegisterLogic(datos, {
      nombreUsuario,
      correo,
      contraseña,
      rolSeleccionado,
    });

    if (success) {
      navigation.replace("Login");
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
        <View style={styles.passwordRequirements}>
          <Text style={[ styles.requirement,{ color: passwordChecks.length ? colors.primary : colors.textPrimary,fontFamily: passwordChecks.length ? fonts.bold : fonts.regular }]}>
            • Mínimo 8 caracteres
          </Text>
          <Text style={[styles.requirement, { color: passwordChecks.uppercase ? colors.primary : colors.textPrimary,fontFamily: passwordChecks.uppercase ? fonts.bold : fonts.regular }]}>
            • Al menos una letra mayúscula
          </Text>
          <Text style={[styles.requirement,{ color: passwordChecks.number ?colors.primary : colors.textPrimary,fontFamily: passwordChecks.number ? fonts.bold : fonts.regular }]}>
            • Al menos un número
          </Text>
          <Text style={[styles.requirement,{ color: passwordChecks.special ? colors.primary : colors.textPrimary,fontFamily: passwordChecks.special ? fonts.bold : fonts.regular }]}>
            • Al menos un carácter especial (!@#$%^&*)
          </Text>
        </View>

        <TouchableOpacity style={stylesGlobal.button} onPress={handleRegister} activeOpacity={0.8}>
          <Text style={stylesGlobal.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </GradientBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  passwordRequirements: {
    alignSelf: "flex-start",
    marginHorizontal: 50,
    marginTop: 5,
    fontFamily: fonts.regular,
  },
  requirement: {
    fontSize: 13,
    marginVertical: 2,
    
  },
});