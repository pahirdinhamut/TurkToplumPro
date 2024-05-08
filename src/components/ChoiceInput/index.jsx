import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { height, verticalScale } from "../../utils/Spacing";

export default function ChoiceInput({ onPress, value, margin = false, bcolor, bgcolor }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bgcolor ? bgcolor : null,
        borderWidth: 1,
        borderColor: bcolor ? bcolor : colors.border,
        borderRadius: 5,
        paddingLeft: 10,
        margin: margin ? verticalScale(10) : undefined,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: height * 0.06
      }}
    >
      <Text style={{ color: colors.text }}>{value}</Text>
    </TouchableOpacity>
  );
}
