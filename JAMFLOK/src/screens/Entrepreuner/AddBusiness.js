import React, { useState, useEffect,useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../context/authContext";

import GradientBackground from "../../hooks/gradientBackground";
import useAddBusinessLogic from "../../logic/AddBusinessLogic";
import styles from "../../styles/stylesAddBusiness";
import colors from "../../styles/colors";

export default function AddBusinessScreen() {

  const {
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
  pickImage,
  limpiarFormulario,
  registrarNegocioLogic,
  ciudades, 
  ciudad, setCiudad,
  searchCity, setSearchCity, 
} = useAddBusinessLogic();


  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!searchCity) {
      setFilteredCities([]);
      setShowDropdown(false);
    } else {
      const results = ciudades.filter(
        c => c.Nombre && c.Nombre.toLowerCase().includes(searchCity.toLowerCase())
      );
      setFilteredCities(results);
      setShowDropdown(results.length > 0);
    }
  }, [searchCity, ciudades]);

  return (
    <GradientBackground>
      <View style={styles.headerContainer}> 
        <Text style={styles.title}>Registrar negocio</Text>
        <Image source={require("../../../assets/images/logo.png")} style={styles.headerLogo} />
      </View>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
        <Text style={styles.label}>Imagen de fondo (banner):</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage(setBanner)}>
          {banner ? (
            <Image source={{ uri: banner }} style={styles.previewImage} />
          ) : (
            <View style={styles.uploadContent}>
              <Ionicons name="image-outline" size={32} color={colors.textSecundary} />
              <Text style={styles.uploadText}>Subir imagen</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Logo del negocio:</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage(setLogo)}>
          {logo ? (
            <Image source={{ uri: logo }} style={styles.previewLogo} />
          ) : (
            <View style={styles.uploadContent}>
              <Ionicons name="image-outline" size={32} color={colors.textSecundary} />
              <Text style={styles.uploadText}>Subir logo</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.inputBox}>
          <Ionicons name="storefront-outline" size={22} style={styles.inputIcon} />
          <TextInput
            placeholder="Nombre del negocio"
            placeholderTextColor="#999"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="document-text-outline" size={22} style={styles.inputIcon} />
          <TextInput
            placeholder="Número del RUT" placeholderTextColor="#999"
            style={styles.input}
            value={rut}
            onChangeText={setRut}
          />
        </View>

        <Text style={styles.label}>Descripción de tu negocio:</Text>
        <TextInput
          placeholder="Describe tu negocio..." placeholderTextColor="#999"
          style={styles.textArea}
          multiline
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <View style={{ marginBottom: 10, position: 'relative' }}>
          <Text style={styles.label}>Ciudad:</Text>
          <TextInput
            placeholder="Escribe la ciudad..." placeholderTextColor="#999"
            style={styles.inputBox}
            value={searchCity}
            onChangeText={(text) => setSearchCity(text)}
            onFocus={() => searchCity && setShowDropdown(filteredCities.length > 0)}
          />
          {showDropdown && (
            <ScrollView
              style={{
                position: 'absolute',
                top: 45,
                left: 0,
                right: 0,
                maxHeight: 150,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                backgroundColor: "#fff",
                zIndex: 10,
              }}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              {filteredCities.map(item => (
                <TouchableOpacity
                  key={item.ID_CIUDAD}
                  style={{ padding: 10, borderBottomWidth: 1, borderColor: "#eee" }}
                  onPress={() => {
                    setCiudad(item.ID_CIUDAD);
                    setSearchCity(item.Nombre);
                    setShowDropdown(false);
                  }}
                >
                  <Text>{item.Nombre}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="location-outline" size={22} style={styles.inputIcon} />
          <TextInput
            placeholder="Dirección" placeholderTextColor="#999"
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="time-outline" size={22} style={styles.inputIcon} />
          <TextInput
            placeholder="Horario (Ej: 8:00 AM - 6:00 PM)" placeholderTextColor="#999"
            style={styles.input}
            value={horario}
            onChangeText={setHorario}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="call-outline" size={22} style={styles.inputIcon} />
          <TextInput
            placeholder="Número de Teléfono"
            style={styles.input} placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={telefono}
            onChangeText={setTelefono}
          />
        </View>

        <Text style={styles.label}>Categoría:</Text>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={categoria}
            onValueChange={(value) => setCategoria(value)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona una categoría" value="" color="#999" />
            {categorias.map(cat => (
              <Picker.Item
                key={cat.ID_CATEGORIAS}
                label={cat.NombreCategoria}
                value={cat.ID_CATEGORIAS}
                color={colors.textSecundary}
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={registrarNegocioLogic}
        >
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#f60505ff", marginTop: 20 }]}
          onPress={limpiarFormulario}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>Limpiar</Text>
        </TouchableOpacity>
      </ScrollView>
    </GradientBackground>
  );
}
