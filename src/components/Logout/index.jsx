import React from "react";
import { height, normalize, width } from "../../utils/Size";
import { horizontalScale, verticalScale } from "../../utils/Spacing";
import { Color } from "../../utils/Strings";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";
import { Text, View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { LogoSvg, LogoutSvg, LoginSvg } from "../svgComponents";
import { useAuth } from "../../context/AuthContex";

export default function Logout({ onPress, title, icon }) {
  const { dark, colors } = useTheme();
  const { user } = useAuth();

  //console.log("logout menu user type: ", user.usertype);

  let Icon = user.usertype == 1 ? <LogoutSvg /> : <LoginSvg />;

  const authControl = {
    color: user.usertype == 1 ? colors.error : colors.green
  };

  return (
    <TouchableOpacity style={[styles.LogoutContainer]} themaOption={dark} onPress={onPress}>
      {Icon}
      <Text style={[styles.Title, authControl]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  LogoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 5
  },
  Title: {
    fontSize: 17,
    marginLeft: 18
  }
});
