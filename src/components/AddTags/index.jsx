import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Title from "./Title";
import Container from "../Container";
import { verticalScale, horizontalScale } from "../../utils/Spacing";
import { Fonts } from "../../utils/Strings";
import { useTheme } from "@react-navigation/native";
import { height } from "../../utils/Size";
export default function AddTags({ label, onPress, bgColor, bcolor = false }) {
  const { colors, dark } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.tagContainer,
        { backgroundColor: bgColor ? bgColor : colors.background, borderColor: bcolor ? colors.modalBackground : colors.border }
      ]}
      onPress={onPress}
    >
      <Text style={[styles.AddTagsTitle, { color: colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    height: horizontalScale(38),
    width: horizontalScale(108),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginStart: 4
  },
  AddTagsTitle: {
    fontFamily: Fonts.medium,
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: 14
  }
});
