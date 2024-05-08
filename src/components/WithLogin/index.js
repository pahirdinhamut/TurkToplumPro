import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextSize } from "../../utils/Strings";
import { FacebookSvg, GoogleSvg } from "../svgComponents";

export default function WithLogin({ text, svg, textcolor, bordercolor, ...props }) {
  let icon = null;

  switch (svg) {
    case "google":
      icon = <GoogleSvg width={28} height={28} />;
      break;
    case "facebook":
      icon = <FacebookSvg width={28} height={28} />;
    default:
  }

  return (
    <Pressable style={[styles.Container, { borderColor: bordercolor }]} {...props}>
      <View style={styles.Svg}>{icon}</View>
      <View style={styles.TextContainer}>
        <Text style={[styles.text, { color: textcolor }]}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: 42,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
    borderWidth: 1,
    flexDirection: "row",
    position: "relative",
    marginTop: 20
  },
  Svg: {
    position: "absolute",
    left: 10
  },
  TextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    flexDirection: "row",
    fontSize: 14,
    fontWeight: "500"
  }
});
