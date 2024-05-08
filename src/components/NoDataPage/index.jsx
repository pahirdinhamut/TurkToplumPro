import { View, Text } from "react-native";
import React from "react";
import { NoInternetSvg } from "../svgComponents";
import Button from "../Button";
import NotFoundSvg from "../svgComponents/NotFoundSvg";
import { useTheme } from "@react-navigation/native";
import { Translation } from "../../utils/Strings";

export default function NoDataView({
  color,
  onRetry,
  internet = true,
  text = Translation("Retry"),
  activeRetry = false,
  message
}) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 8 }}>
      <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
        {internet ? <NoInternetSvg fill={color ? color : "red"} /> : <NotFoundSvg />}
        <Text style={{ fontSize: 25, color: colors.text }}>{internet ? "Ops..." : Translation("No Result")}</Text>
      </View>
      <Text style={{ fontSize: 17, marginBottom: 10, color: colors.text }}>
        {internet
          ? Translation("No internet connection please check your connections!!!")
          : message
          ? message
          : Translation("No data found on the server!!!")}
      </Text>
      <View style={{ flex: 1, width: "30%", marginTop: 5 }}>
        {activeRetry ? <Button title={text} textColor={"white"} onPress={onRetry} /> : null}
      </View>
    </View>
  );
}
