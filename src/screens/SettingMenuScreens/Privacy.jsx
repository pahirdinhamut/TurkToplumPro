import React from "react";
import { Container } from "../../components";
import { WebView } from "react-native-webview";

export default function Privacy() {
  return (
    <Container py={3} px={3}>
      <WebView source={{ uri: "https://turktoplum.net/privacypolicy/" }} />
    </Container>
  );
}
