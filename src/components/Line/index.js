import React from "react";
import { horizontalScale, verticalScale } from "../../utils/Spacing";
import { useTheme } from "@react-navigation/native";
import { View } from "react-native";

export default function BottomLine({ length, width, color }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        alignSelf: "center",
        width: length || horizontalScale(500),
        borderBottomWidth: width || 1,
        borderBottomColor: color || colors.text,
        marginVertical: 5
      }}
    />
  );
}
