import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { App, Color } from "./utils/Strings";
import ProfileStack from "./navigation/ProfileStack";
import { useAuth } from "./context/AuthContex";

export default function Root() {
  const [isDarkTheme, setIsDarkTheme] = React.useState("0");
  const { themeOption, changeLocation } = useAuth();

  const autoTheme = useColorScheme() === "dark";

  React.useEffect(() => {
    if (themeOption === "0" || themeOption === "") {
      setIsDarkTheme(autoTheme);
    } else if (themeOption === "1") {
      setIsDarkTheme(true);
    } else {
      setIsDarkTheme(false);
    }
  }, [themeOption, autoTheme]);

  const DefaultTheme = {
    dark: false,
    colors: {
      background: "#FFFFFF",
      card: "#FFFFFF",
      text: "#000000", //"#03045E",
      border: "#F2F2F7",
      notification: "rgb(255, 59, 48)",
      modalBackground: "#F5F5F5",
      inActive: "#8a8a8a",
      welcomeBg: "#0CA0ED",
      categoryBackground: "#DDF4FE",
      ...Color
    }
  };

  const DarkThemeOption = {
    dark: true,
    colors: {
      background: "#000000", // background color
      card: "#000000", // background color
      text: "#FFFFFF", // text color
      border: "#FFFFFF", // border color
      notification: "rgb(255, 59, 48)", //The color of Tab Navigator badge.
      modalBackground: "#222222",
      inActive: "#8a8a8a",
      welcomeBg: "black",
      categoryBackground: "#1D1D1D",
      ...Color
    }
  };

  return (
    <NavigationContainer theme={isDarkTheme ? DarkThemeOption : DefaultTheme}>
      <ProfileStack />
    </NavigationContainer>
  );
}
