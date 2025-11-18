import Toast from "react-native-toast-message";
import { View, Text } from "react-native";
import colors from "../styles/colors";

export const ToastConfig = {
  error: ({ text1, text2 }) => (
    <View style={{
      backgroundColor: "#fff",
      borderLeftWidth: 7,
      borderLeftColor: "#FF4D4D",
      padding: 10,
      borderRadius: 10,
      width: 350,
    }}>
      <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.textSecundary, marginLeft:10}}>{text1}</Text>
      <Text style={{ fontSize: 14, color: colors.icon, marginTop: 3, marginLeft:10 }}>{text2}</Text>
    </View>
  ),
  success: ({ text1, text2 }) => (
    <View style={{
      backgroundColor: "#fff",
      borderLeftWidth:7,
      borderLeftColor:"#4BB543",
      padding: 10,
      borderRadius: 10,
      width: 350,
    }}>
      <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.textSecundary }}>{text1}</Text>
      <Text style={{ fontSize: 14, color: colors.icon, marginTop: 4 }}>{text2}</Text>
    </View>
  ),
  info: ({ text1, text2 }) => (
    <View style={{
      backgroundColor: "#fff",
      borderLeftWidth:7,
      borderLeftColor:"#4399b5ff",
      padding: 10,
      borderRadius: 10,
      width: 350,
    }}>
      <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.textSecundary }}>{text1}</Text>
      <Text style={{ fontSize: 14, color: colors.icon, marginTop: 4 }}>{text2}</Text>
    </View>
  ),
};
