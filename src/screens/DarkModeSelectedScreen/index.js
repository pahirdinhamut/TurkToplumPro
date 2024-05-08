import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { App, Color, Fonts } from "../../utils/Strings";
import { Container } from "../../components";
import Feather from "react-native-vector-icons/Feather";
import DatabaseManager from "../../utils/Storage";
import { useAuth } from "../../context/AuthContex";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";
function DarkModeSelectedScreen() {
  const [selected, setSelected] = React.useState("0");
  const { changeAppTheme, themeOption } = useAuth();
  const { colors, dark } = useTheme();
  React.useEffect(() => {
    setSelected(themeOption);
  }, [themeOption]);

  const handleThemeMode = async (key) => {
    setSelected(key);
    await DatabaseManager.setString(App.theme_options, key);
    changeAppTheme(key);
  };

  return (
    <Container bcColor={dark ? "black" : colors.background} px={18} py={10}>
      <Pressable
        onPress={() => handleThemeMode("0")}
        style={[
          styles.container,
          {
            backgroundColor: colors.modalBackground
          }
        ]}
      >
        <Text
          style={[
            styles.labelText,
            {
              color: colors.text
            }
          ]}
        >
          Automatik
        </Text>
        {selected === "0" && <Feather name={"check"} size={26} color={colors.text} style={styles.selected} />}
      </Pressable>
      <Pressable onPress={() => handleThemeMode("1")} style={[styles.container, { backgroundColor: colors.modalBackground }]}>
        <Text style={[styles.labelText, { color: colors.text }]}>Koyu mod</Text>
        {selected === "1" ? <Feather name={"check"} size={24} color={colors.text} style={styles.selected} /> : <View />}
      </Pressable>
      <Pressable onPress={() => handleThemeMode("2")} style={[styles.container, { backgroundColor: colors.modalBackground }]}>
        <Text style={[styles.labelText, { color: colors.text }]}>Açik mod</Text>
        {selected === "2" && <Feather name={"check"} size={30} color={colors.text} style={styles.selected} />}
      </Pressable>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10
  },
  labelText: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: Fonts.medium,
    letterSpacing: 0.5
  },
  selected: {
    position: "absolute",
    right: 10
  }
});

export default DarkModeSelectedScreen;
