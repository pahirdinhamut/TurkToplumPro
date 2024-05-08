import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

export default function Report({ navigation, nk }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8, justifyContent: "space-between" }}>
      <Text style={{ flex: 1, color: colors.grey }}>
        Platform’da kullanıcılar tarafından paylaşılan gerçek olmayan, yanlış, kandırma ve dolandırma amaçlı olduğunu düşündüğünüz
        bilgileri, lütfen rapor butonuna tıklayarak bize bildirin!
      </Text>

      <TouchableOpacity
        style={{ borderWidth: 1, borderColor: "red", borderRadius: 10, padding: 5 }}
        onPress={() => navigation.navigate("Report", { type: 1, nk: nk })}
      >
        <Text style={{ color: colors.text }}>Rapor</Text>
      </TouchableOpacity>
    </View>
  );
}
