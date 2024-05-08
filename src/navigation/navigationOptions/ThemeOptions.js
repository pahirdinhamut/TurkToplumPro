import { useTheme } from "@react-navigation/native";

const ThemeOptions = () => {
  const { colors, dark } = useTheme();

  return {
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerTintColor: colors.text,
  };
}

export default ThemeOptions;