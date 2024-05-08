import React from "react";
import styled from "styled-components/native";
import { horizontalScale, verticalScale } from "../../utils/Spacing";
import { NewsSvg, SaleSvg, HomeSaleSvg, JobSvg, ShopSvg, Community, SvgDiscour } from "../svgComponents";
import { useTheme } from "@react-navigation/native";
import { Fonts } from "../../utils/Strings";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { useAuth } from "../../context/AuthContex.js";

export default function CategoryViewer({ title, onPress }) {
  const { colors, dark } = useTheme();
  const { isIos } = useAuth();
  let icon;
  const icon_size = 50;

  switch (title) {
    case "Gündem":
      icon = <NewsSvg width={icon_size} height={icon_size} />;
      break;
    case "Sosyal":
      icon = <Community width={icon_size} height={icon_size} />;
      break;
    case "Emlak":
      icon = <HomeSaleSvg width={icon_size} height={icon_size} />;
      break;
    case "Alışveriş":
      icon = <ShopSvg width={icon_size} height={icon_size} />;
      break;
    case "İş İlanları":
      icon = <JobSvg width={icon_size} height={icon_size} />;
      break;
    case "Keşfet":
      icon = <SvgDiscour width={icon_size} height={icon_size} />;
      break;
    default:
      icon = <NewsSvg width={icon_size} height={icon_size} />;
      break;
  }

  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={onPress}>
      <View style={[styles.IconBox, { backgroundColor: colors.categoryBackground }]}>{icon}</View>
      <Text style={[styles.Title, { color: colors.text, fontSize: isIos ? 12.5 : 11 }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(60),
    //height: verticalScale(83),
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 6
  },
  IconBox: {
    //width: horizontalScale(60),
    //height: verticalScale(63),
    padding: 8,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  Title: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 5,
    fontFamily: Fonts.semibold
  }
});
