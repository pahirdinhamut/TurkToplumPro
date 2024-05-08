import { useTheme } from "@react-navigation/native";
import authContex from "../context/AuthContex";
import { Color } from "./Strings";
import { useCallback } from "react";

const { colors, dark } = useTheme();
const { user } = authContex;
const DarkBackgroundTheme = {};

const DarkTextColorTheme = {
  color: dark ? colors.text : Color.PremiumTextColor
};

const isAuthControls = {
  color: user.usertype == 1 ? Color.error : Color.green
};

export { DarkBackgroundTheme, DarkTextColorTheme, isAuthControls };
