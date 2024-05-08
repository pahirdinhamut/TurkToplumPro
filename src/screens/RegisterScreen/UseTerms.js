import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { Container } from "../../components";

export default function UseTerms() {
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: "https://turktoplum.net/conditions/terms/" }} />
    </View>
  );
}
