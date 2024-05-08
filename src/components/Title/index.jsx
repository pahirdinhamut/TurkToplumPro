import React from "react";
import styled from "styled-components/native";
import { Color, Fonts } from "../../utils/Strings";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
export default function Title({ title, ...props }) {
  const { colors, dark } = useTheme();
  const defaultStyled = {
    color: colors.text
  };
  return (
    <Text style={[defaultStyled, styles.Title, props.style]}>
      {props.required ? <Text style={{ color: "red" }}>* </Text> : null}
      {title}
    </Text>
  );
}
const styles = StyleSheet.create({
  Title: {
    fontSize: 14,
    marginVertical: 5,
    letterSpacing: 0.3,
    fontFamily: Fonts.semibold
  }
});
