import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import modalStyles from "../styles/modalStyles";

export default function ConfirmModal({ visible, mensaje, onCancel, onConfirm }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={modalStyles.overlay}>
        <View style={modalStyles.modal}>
          <Text style={modalStyles.text}>{mensaje}</Text>

          <View style={modalStyles.row}>
            <TouchableOpacity style={modalStyles.btnCancel} onPress={onCancel}>
              <Text style={modalStyles.btnText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={modalStyles.btnOk} onPress={onConfirm}>
              <Text style={modalStyles.btnText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
