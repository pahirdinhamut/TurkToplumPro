import { useNavigation, useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Alert, View, TouchableOpacity } from "react-native";
import { Container, SettingsLabel } from "../../components";
import { CheckBoxEmpSvg, CheckBoxSvg, ThemeSvg } from "../../components/svgComponents";
import { useAuth } from "../../context/AuthContex";
import DatabaseManager from "../../utils/Storage";
import { App, Translation } from "../../utils/Strings";

const iconSize = 30;
const cbSize = 20;
opacityRate = 0.9;

export default function ApplicationSettings() {
  const { colors, dark } = useTheme();
  const [isNotification, setIsNotification] = React.useState(false);
  const [dbSize, setDBSize] = React.useState("");
  const [selected, setSelected] = React.useState("0"); //0 is auto, 1 is dark mode, 2 is light mode
  const { changeAppTheme, themeOption, setNewsNotificationSwitch, newsNotification } = useAuth();
  const naivgation = useNavigation();

  React.useEffect(() => {
    setIsNotification(newsNotification === "1" ? true : false);
  }, [newsNotification]);

  React.useEffect(() => {
    setSelected(themeOption);
    getSize();
  }, [themeOption]);

  const handleThemeMode = async (key) => {
    setSelected(key);
    await DatabaseManager.setString(App.theme_options, key);
    changeAppTheme(key);
  };

  // notofication switch
  const handleNotification = () => {
    setIsNotification(!isNotification);
    if (!isNotification) {
      setNewsNotificationSwitch("1");
    } else {
      setNewsNotificationSwitch("0");
    }
  };

  let themeMode = selected === "0" ? "Otomatik" : selected === "1" ? "Koyu" : "Acik";

  const handleDarkSettingsPress = () => {
    naivgation.navigate("SettingDarkMode");
  };

  const getSize = async () => {
    const size = await DatabaseManager.calculateSize();
    setDBSize(size);
  };

  const handleClearCache = React.useCallback(async () => {
    Alert.alert(
      Translation("clear cache"),
      Translation("your search history,last used filters and recent viwed caches will be deleted. would you like to continue?"),
      [
        {
          text: Translation("cancel"),
          onPress: null,
          style: "cancel"
        },
        {
          text: Translation("ok"),
          onPress: async () => {
            await DatabaseManager.clearTables();
            getSize();
          }
        }
      ]
    );
  }, []);

  return (
    <Container px={15} bcColor={colors.background}>
      <SettingsLabel
        label="Bildirim Ayarlari"
        icon="bell"
        siwtch
        value={isNotification}
        onValueChange={handleNotification}
        isDark={dark}
      />
      <SettingsLabel
        label="Theme ayarlari"
        icon="moon"
        isDark={dark}
        darkModeSettings={themeMode}
        onPress={handleDarkSettingsPress}
      />
      <SettingsLabel
        label={Translation("Cache size")}
        icon="size"
        darkModeSettings={dbSize}
        onPress={handleClearCache}
        isDark={dark}
      />
      {/*<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 5 }}>*/}
      {/*  <TouchableOpacity activeOpacity={opacityRate} style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", height: 100 }} onPress={() => handleThemeMode("1")}>*/}
      {/*    <ThemeSvg stroke={selected === "1" ? colors.primary : colors.inActive} width={iconSize} height={iconSize} />*/}
      {/*    <Text style={{ color: selected === "1" ? colors.primary : colors.inActive }}>Dark mode</Text>*/}
      {/*    {selected === "1" ? <CheckBoxSvg height={cbSize} width={cbSize} stroke={colors.primary} /> : <CheckBoxEmpSvg height={cbSize} width={cbSize} stroke={colors.inActive} />}*/}
      {/*  </TouchableOpacity>*/}

      {/*  <TouchableOpacity activeOpacity={opacityRate} style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", height: 100 }} onPress={() => handleThemeMode("2")}>*/}
      {/*    <ThemeSvg stroke={selected == "2" ? colors.primary : colors.inActive} width={iconSize} height={iconSize} />*/}
      {/*    <Text style={{ color: selected == "2" ? colors.primary : colors.inActive }}>Light mode</Text>*/}
      {/*    {selected == "2" ? <CheckBoxSvg height={cbSize} width={cbSize} stroke={colors.primary} /> : <CheckBoxEmpSvg height={cbSize} width={cbSize} stroke={colors.inActive} />}*/}
      {/*  </TouchableOpacity>*/}

      {/*  <TouchableOpacity activeOpacity={opacityRate} style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", height: 100 }} onPress={() => handleThemeMode("0")}>*/}
      {/*    <ThemeSvg stroke={selected == "0" ? colors.primary : colors.inActive} width={iconSize} height={iconSize} />*/}
      {/*    <Text style={{ color: selected == "0" ? colors.primary : colors.inActive }}>Auto</Text>*/}
      {/*    {selected == "0" ? <CheckBoxSvg height={cbSize} width={cbSize} stroke={colors.primary} /> : <CheckBoxEmpSvg height={cbSize} width={cbSize} stroke={colors.inActive} />}*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
    </Container>
  );
}

const styles = StyleSheet.create({});
