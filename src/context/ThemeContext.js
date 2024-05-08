import { createContext, useContext, useEffect, useState } from "react";
import { userColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const [isThemeSwitch, setIsThemeSwitch] = useState(false);

  const isDarkTheme = userColorScheme === "dark";
  const values = {
    isDarkTheme,
    isThemeSwitch,
    setIsThemeSwitch,
  };

  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
export default ThemeContextProvider;
