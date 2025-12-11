import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ActivityIndicator  } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import ProgressBar from "../../components/ProgressBar";
import GradientBackground from "../../hooks/gradientBackground";
import { useUbicacionLogic } from "../../logic/RegisterLogic";
import stylesGlobal from "../../styles/stylesGlobal";

export default function Ubicacion() {
  const navigation = useNavigation();
  const route = useRoute();
  const datosPrevios = route.params;

  const [celular, setCelular] = useState("");

  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [paisSeleccionado, setPaisSeleccionado] = useState("");
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");

  const {
    loading,
    tiposDocumento,
    paises,
    departamentos,
    ciudades,
    loadDepartamentos,
    loadCiudades,
    handleNext: handleNextLogic
  } = useUbicacionLogic();

  useEffect(() => {
    if (paisSeleccionado) {
      loadDepartamentos(paisSeleccionado);
    }
  }, [paisSeleccionado]);

  useEffect(() => {
    if (departamentoSeleccionado) {
      loadCiudades(departamentoSeleccionado);
    }
  }, [departamentoSeleccionado]);

  const handleNext = () => {
    handleNextLogic(navigation, datosPrevios, {
      idCiudad: ciudadSeleccionada,
      celular,
      numeroDocumento,
      idTipoDocumento: tipoDocumento,
    });
  };

  return (
    <View style={stylesGlobal.container}>
      <GradientBackground>
        <ProgressBar step={2} totalSteps={3} />
        <Text style={stylesGlobal.title}>Ubicación y Documento</Text>

        <View style={{...stylesGlobal.input,paddingVertical: 0,justifyContent: "center",}}>
          {loading ? (
            <ActivityIndicator color="#000"/> 
          ) : (
            <Picker selectedValue={paisSeleccionado} onValueChange={(value) => setPaisSeleccionado(value)} >
              <Picker.Item label="Selecciona tu país" value="" style={stylesGlobal.text} />
              {paises.map((item) => (
                <Picker.Item key={item.ID_PAIS} label={item.Nombre} value={item.ID_PAIS} style={stylesGlobal.text}/>
              ))}
            </Picker>
            )
          }
        </View>
        <View style={{ ...stylesGlobal.input, paddingVertical: 0, justifyContent: "center" }}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Picker
              selectedValue={departamentoSeleccionado}
              onValueChange={(value) => setDepartamentoSeleccionado(value)}
            >
              <Picker.Item label="Selecciona tu departamento" value="" style={stylesGlobal.text}/>
              {departamentos.map((item) => (
                <Picker.Item
                  key={item.ID_DEPARTAMENTO}
                  label={item.Nombre}
                  value={item.ID_DEPARTAMENTO} style={stylesGlobal.text}
                />
              ))}
            </Picker>
          )}
        </View>

        <View style={{ ...stylesGlobal.input, paddingVertical: 0, justifyContent: "center" }}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Picker
              selectedValue={ciudadSeleccionada}
              onValueChange={(value) => setCiudadSeleccionada(value)} 
              
            >
              <Picker.Item label="Selecciona tu ciudad" value="" style={stylesGlobal.text}/>
              {ciudades.map((item) => (
                <Picker.Item
                  key={item.ID_CIUDAD}
                  label={item.Nombre}
                  value={item.ID_CIUDAD} style={stylesGlobal.text}
                />
              ))}
            </Picker>
          )}
        </View>
        
        <View style={{...stylesGlobal.input,paddingVertical: 0,justifyContent: "center",}}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Picker selectedValue={tipoDocumento} onValueChange={(value) => setTipoDocumento(value)}>
              <Picker.Item label="Selecciona el tipo de documento" value="" style={stylesGlobal.text}/>
              {tiposDocumento.map((item) => (
                <Picker.Item key={item.ID_TIPO_DOCUMENTO} label={item.Nombre} value={item.ID_TIPO_DOCUMENTO} style={stylesGlobal.text}/>
              ))}
            </Picker>
            )
          }
        </View>

        <TextInput placeholder="Número de Documento" placeholderTextColor="#999" style={stylesGlobal.input} keyboardType="numeric" value={numeroDocumento} onChangeText={setNumeroDocumento} />
        <TextInput placeholder="Celular" placeholderTextColor="#999" style={stylesGlobal.input} keyboardType="numeric" value={celular} onChangeText={setCelular} />
        
        <TouchableOpacity style={stylesGlobal.button} onPress={handleNext} activeOpacity={0.8}>
          <Text style={stylesGlobal.buttonText}>Siguiente</Text>
        </TouchableOpacity>

      </GradientBackground>
    </View>
  );
}