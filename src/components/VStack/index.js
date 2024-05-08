import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function VStack({ children }) {
  return <View style={{ flexDirection: "column", justifyContent: "space-between" }}>{children}</View>;
}
