import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { verticalScale, horizontalScale } from "../../utils/Spacing";
import { HomeSaleSvg } from "../../components/svgComponents";
import { Fonts } from "../../utils/Strings";
import Container from "../Container";
export default function Title({ icon, title = "title", id }) {
  let iconComponent = null;
  switch (icon) {
    case "home":
      iconComponent = <HomeSaleSvg />;
      break;
    case "job":
      iconComponent = <HomeSaleSvg />;
      break;
    case "shopping":
      iconComponent = <HomeSaleSvg />;
      break;
    default:
      iconComponent = <HomeSaleSvg />;
      break;
  }

  return (
    <View style={styles.titleContainer}>
      {iconComponent}
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    height: horizontalScale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: verticalScale(10)
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: horizontalScale(10),
    fontFamily: Fonts.semibold,
    letterSpacing: 0.5
  }
});
