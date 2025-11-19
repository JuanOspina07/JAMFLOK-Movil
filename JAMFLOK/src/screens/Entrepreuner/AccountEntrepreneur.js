import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import GradientBackground from "../../hooks/gradientBackground";
import useAccountEntrepreneur from "../../logic/AccountEntrepreneurLogic";
import { AuthContext } from "../../context/authContext";
import styles from "../../styles/styleAccountEntrepreneur";
import colors from "../../styles/colors";

export default function AccountEntrepreneur() {
  const { user, logout } = useContext(AuthContext);
  const { modalVisible, setModalVisible, userData, loading, error } = useAccountEntrepreneur(user.idUsuario);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <GradientBackground>
        <Text style={styles.loadingText}>Cargando información...</Text>
        <ActivityIndicator size="large" color="#fff" />
      </GradientBackground>
    );
  }

  if (error) {
    return (
      <GradientBackground>
        <Text style={styles.errorText}>{error}</Text>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Ajustes</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="ellipsis-vertical" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalOption} onPress={() => {/* acción editar */}}>
                <Ionicons name="create-outline" size={20} style={styles.modalOptionIcon} />
                <Text style={styles.modalOptionText}>Editar perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOptionLogout} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} style={styles.modalOptionIconLogout} />
                <Text style={styles.modalOptionTextLogout}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Ionicons name="person-circle-outline" size={32} color={colors.textSecundary}/>
            <View>
              <Text style={styles.label}>Nombre de Usuario</Text>
              <Text style={styles.value}>{userData.NombreUsuario}</Text>
            </View>
           
          </View>

          <View style={styles.card}>
            <Ionicons name="id-card-outline" size={32} color={colors.textSecundary}/>
            <View>
              <Text style={styles.label}>Rol</Text>
              <Text style={styles.value}>{userData.NombreRol}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Ionicons name="lock-closed-outline" size={32} color={colors.textSecundary}/>
            <View>
              <Text style={styles.label}>Contraseña</Text>
              <Text style={styles.value}>********</Text>
            </View>
            
          </View>

          <View style={styles.card}>
            <Ionicons name="person-outline" size={32} color={colors.textSecundary}/>
            <View>
              <Text style={styles.label}>Datos personales</Text>
              <Text style={styles.value}>
                Nombre: {userData.PrimerNombre}
                {userData.SegundoNombre ? ` ${userData.SegundoNombre}` : ""}
              </Text>
              <Text style={styles.value}>
                Apellidos: {userData.PrimerApellido} {userData.SegundoApellido}
              </Text>
              <Text style={styles.value}>
                Documento: {userData.NumDocumento}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Ionicons name="call-outline" size={32} color={colors.textSecundary}/>
            <View>
              <Text style={styles.label}>Contacto</Text>
              <Text style={styles.value}>Teléfono: {userData.NumTelefono}</Text>
              <Text style={styles.value}>
                Correo: {userData.CorreoElectronico}
              </Text>
              <Text style={styles.value}>Ciudad: {userData.Ciudad}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </GradientBackground>
  );
}
