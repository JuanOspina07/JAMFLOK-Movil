import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import ProgressBar from "../../components/ProgressBar";
import GradientBackground from "../../hooks/gradientBackground";
import { useDatosPersonalesLogic } from "../../logic/RegisterLogic";
import stylesGlobal from "../../styles/stylesGlobal";
import colors from "../../styles/colors";
import { formatDate } from "../../utils/formDate"; 

export default function DatosPersonales() {
  const navigation = useNavigation();

  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { handleNext: handleNextLogic } = useDatosPersonalesLogic(navigation);

  const handleNext = () => {
    handleNextLogic({
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      edad,
      fechaNacimiento,
    });
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFechaNacimiento(formatDate(selectedDate));
    }
  };

  return (
    <View style={stylesGlobal.container}>
      <GradientBackground>
        <ProgressBar step={1} totalSteps={3} />
        <Text style={stylesGlobal.title}>Datos Personales</Text>

        <TextInput placeholder="Primer Nombre" style={stylesGlobal.input} value={primerNombre} onChangeText={setPrimerNombre}/>
        <TextInput placeholder="Segundo Nombre" style={stylesGlobal.input} value={segundoNombre} onChangeText={setSegundoNombre} />
        <TextInput placeholder="Primer Apellido" style={stylesGlobal.input} value={primerApellido} onChangeText={setPrimerApellido}/>
        <TextInput placeholder="Segundo Apellido" style={stylesGlobal.input} value={segundoApellido} onChangeText={setSegundoApellido}/>
        <TextInput placeholder="Edad" keyboardType="numeric" style={stylesGlobal.input} value={edad} onChangeText={setEdad}/>

        <TouchableOpacity style={[stylesGlobal.input, { justifyContent: "center" }]} onPress={() => setShowDatePicker(true)} activeOpacity={0.7}>
          <Text style={{ color: fechaNacimiento ? colors.textSecundary: "#999" }}>
            {fechaNacimiento || "Selecciona tu fecha de nacimiento"}
          </Text>
        </TouchableOpacity>

        {/* Picker nativo */}
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            value={new Date()}
            onChange={onChangeDate}
          />
        )}

        <TouchableOpacity
          style={stylesGlobal.button}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={stylesGlobal.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </GradientBackground>
    </View>
  );
}
