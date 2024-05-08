import React from "react";
import { StyleSheet, View } from "react-native";

type HStackProps = {
  children: React.ReactNode;
  marginVertical?: number;
};

export default function HSteck({ children, marginVertical }: HStackProps) {
  return <View style={[styles.container, { marginVertical: marginVertical }]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
