import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { verticalScale, horizontalScale } from "../../utils/Spacing";
import { HomeSaleSvg, ShopSvg, JobSvg, Community, SvgDiscour } from "../../components/svgComponents";
import { Fonts } from "../../utils/Strings";
import { useTheme } from "@react-navigation/native";
export default function AddTagsTitle({ icon, title = "title", id }) {
  const { colors, dark } = useTheme();
  let iconComponent = null;
  switch (icon) {
    case "house":
      iconComponent = <HomeSaleSvg />;
      break;
    case "work":
      iconComponent = <JobSvg />;
      break;
    case "market":
      iconComponent = <ShopSvg />;
      break;
    case "community":
      iconComponent = <Community />;
      break;
    case "promote":
      iconComponent = <SvgDiscour />;
      break;
    default:
      iconComponent = <HomeSaleSvg />;
      break;
  }

  return (
    <View style={styles.titleContainer}>
      {iconComponent}
      <Text style={[styles.titleText, { color: colors.text }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    height: horizontalScale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: verticalScale(15)
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: horizontalScale(10),
    fontFamily: Fonts.semibold,
    letterSpacing: 0.5,
    textTransform: "capitalize"
  }
});
