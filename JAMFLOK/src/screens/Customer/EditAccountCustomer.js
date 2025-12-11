import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import GradientBackground from "../../hooks/gradientBackground";
import { AuthContext } from "../../context/authContext";

import { cargarCiudades, cargarDatosUsuario, guardarCambiosLogic, typesDocument,} from "../../logic/EditAccountEntrepreneurLogic";

import styles from "../../styles/styleEditAccountEntrepreneur";
import { formatDateAccount } from "../../utils/formDate";
import colors from "../../styles/colors";

export default function EditAccountCustomer() {
  const { user } = useContext(AuthContext);
  const idUsuario = user.idUsuario;

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [ciudades, setCiudades] = useState([]); 
  const [searchCity, setSearchCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [ciudad, setCiudad] = useState(usuario?.IDCiudad || null); 
  const navigation = useNavigation();
  const [form, setForm] = useState({
    username: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    tipoDocumento: "",
    numDocumento: "",
    ciudad: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
    passNueva: "",
    passConfirmar: "",
  });

  useEffect(() => {
    typesDocument(setTiposDocumento);
    cargarCiudades(setCiudades); 
    cargarDatosUsuario(idUsuario, (data) => {
      setUsuario(data);

      setForm({
        username: data.NombreUsuario,
        primerNombre: data.PrimerNombre,
        segundoNombre: data.SegundoNombre,
        primerApellido: data.PrimerApellido,
        segundoApellido: data.SegundoApellido,
        tipoDocumento: data.IDTipoDocumento,
        numDocumento: data.NumeroDocumento,
        ciudad: data.ID_CIUDAD || null,
        correo: data.CorreoElectronico,
        telefono: data.NumTelefono,
        fechaNacimiento: data.FechaNacimiento
          ? data.FechaNacimiento.split("T")[0]
          : "",
        passNueva: "",
        passConfirmar: "",
      });
      setCiudad(data.ID_CIUDAD || null);
      setSearchCity(data.Ciudad || "");
      setLoading(false);
    });
  }, []);

 useEffect(() => {
  const sc = searchCity || "";
  if (sc.trim() === "" || (ciudad && sc === ciudades.find(c => c.ID_CIUDAD === ciudad)?.Nombre)) {
    setFilteredCities([]);
    setShowDropdown(false);
  } else {
    const filtered = ciudades.filter(c =>
      c.Nombre.toLowerCase().includes(sc.toLowerCase())
    );
    setFilteredCities(filtered);
    setShowDropdown(filtered.length > 0);
  }
}, [searchCity, ciudad]);



  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <GradientBackground>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: "#fff", marginTop: 10 }}>Cargando...</Text>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={28} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Editar cuenta</Text>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
       
        <View style={styles.profileWrapper}>
          <Ionicons name="person-circle-outline" size={140} color="#fff" />
          <View style={styles.editIconSmall}>
            <Ionicons name="pencil" size={25} color="#fff" />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <View style={styles.inputRow}>
            <Ionicons name="at-outline" size={22} color="#666" />
            <TextInput style={styles.input} value={form.username} onChangeText={(v) => handleChange("username", v)}/>
          </View>

          <Text style={styles.label}>Primer Nombre</Text>
          <View style={styles.inputRow}>
            <Ionicons name="person-outline" size={22} color="#666" />
            <TextInput style={styles.input} value={form.primerNombre} onChangeText={(v) => handleChange("primerNombre", v)}/>
          </View>

          <Text style={styles.label}>Segundo Nombre</Text>
          <View style={styles.inputRow}>
            <Ionicons name="person-add-outline" size={22} color="#666" />
            <TextInput style={styles.input} value={form.segundoNombre} onChangeText={(v) => handleChange("segundoNombre", v)}/>
          </View>

          <Text style={styles.label}>Primer Apellido</Text>
          <View style={styles.inputRow}>
            <Ionicons name="person-circle-sharp" size={22} color="#666" />
            <TextInput style={styles.input} value={form.primerApellido} onChangeText={(v) => handleChange("primerApellido", v)}/>
          </View>

          <Text style={styles.label}>Segundo Apellido</Text>
          <View style={styles.inputRow}>
            <Ionicons name="person-circle-outline" size={22} color="#666" />
            <TextInput style={styles.input} value={form.segundoApellido} onChangeText={(v) => handleChange("segundoApellido", v)}/>
          </View>

          <Text style={styles.label}>Tipo de Documento</Text>
          <View style={styles.inputRow}>
            <Ionicons name="document-outline" size={22} color="#666" />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Picker
                selectedValue={form.tipoDocumento}
                onValueChange={(v) => handleChange("tipoDocumento", v)}
                style={{ color: "#333" }}
              >
                <Picker.Item label="Selecciona un tipo" value="" />
                  {tiposDocumento.map((item) => (<Picker.Item key={item.ID_TIPO_DOCUMENTO} label={item.Nombre} value={item.ID_TIPO_DOCUMENTO} />))}
              </Picker>
            </View>
          </View>

          <Text style={styles.label}>Numero de Documento</Text>
          <View style={styles.inputRow}>
            <Ionicons name="key-outline" size={22} color="#666" />
            <TextInput style={styles.input} value={form.numDocumento} onChangeText={(v) => handleChange("numDocumento", v)}/>
          </View>

          <Text style={styles.label}>Ciudad</Text>
          <View style={{ marginBottom: 10, position: 'relative' }}>
            <View style={styles.inputRow}>
              <Ionicons name="location-outline" size={22} color="#666" />
              <TextInput
                placeholder="Escribe la ciudad..."
                style={{ ...styles.input, flex: 1 }}
                value={searchCity}
                onChangeText={(text) => setSearchCity(text)}
                onFocus={() => searchCity && setShowDropdown(filteredCities.length > 0)}
              />
            </View>

            {showDropdown && (
              <ScrollView
                style={{
                  position: 'absolute',
                  top: 50, 
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
                      handleChange("ciudad", item.ID_CIUDAD);
                      setShowDropdown(false);
                    }}
                  >
                    <Text>{item.Nombre}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          <Text style={styles.label}>Correo electrónico</Text>
          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={22} color="#666" />
            <TextInput style={styles.input} value={form.correo} onChangeText={(v) => handleChange("correo", v)}/>
          </View>

          <Text style={styles.label}>Número de teléfono</Text>
          <View style={styles.inputRow}>
            <Ionicons name="call-outline" size={22} color="#666" />
            <TextInput style={styles.input} keyboardType="numeric" value={form.telefono} onChangeText={(v) => handleChange("telefono", v)}/>
          </View>

          <Text style={styles.label}>Fecha de nacimiento</Text>
          <View style={styles.inputRow}>
            <Ionicons name="calendar-outline" size={22} color="#666" />
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
              <Text style={{ color: form.fechaNacimiento ? colors.textSecundary : "#999" }}>
                {form.fechaNacimiento ? formatDateAccount(form.fechaNacimiento) : "Seleccionar fecha"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nueva contraseña (opcional)</Text>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={22} color="#666" />
            <TextInput secureTextEntry style={styles.input} placeholder="Nueva contraseña" onChangeText={(v) => handleChange("passNueva", v)}/>
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={22} color="#666" />
            <TextInput secureTextEntry style={styles.input} placeholder="Confirmar contraseña" onChangeText={(v) => handleChange("passConfirmar", v)}/>
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={() => guardarCambiosLogic(idUsuario, usuario, setUsuario, form)}>
          <Text style={styles.saveText}>Guardar cambios</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={
              form.fechaNacimiento ? new Date(
                    Number(form.fechaNacimiento.split("-")[0]),
                    Number(form.fechaNacimiento.split("-")[1]) - 1,
                    Number(form.fechaNacimiento.split("-")[2])
                  ) : new Date(2000, 0, 1)
            }
            mode="date"
            display="calendar"
            onChange={(event, selectedDate) => { setShowDatePicker(false);
              if (selectedDate) {
                const year = selectedDate.getFullYear();
                const month = String(selectedDate.getMonth() + 1).padStart(2,"0");
                const day = String(selectedDate.getDate()).padStart(2, "0");
                const localDate = `${year}-${month}-${day}`;
                handleChange("fechaNacimiento", localDate);
              }
            }}
          />
        )}
        <View style={{ height: 60 }} />
      </ScrollView>
    </GradientBackground>
  );
}
