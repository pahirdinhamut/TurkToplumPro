import { Pressable, StyleSheet, Text, View, Switch } from "react-native";
import React from "react";
import { height, normalizeL, width } from "../../utils/Size";
import { useNavigation, useTheme } from "@react-navigation/native";
import { horizontalScale, verticalScale } from "../../utils/Spacing";
import { Color } from "../../utils/Strings";
import {
  SettingsSvg,
  LockSvg,
  InfoSvg,
  EuroFillSvg,
  LogoutSvg,
  ThemeSvg,
  NotificationSvg,
  FlySvg,
  ShareSvg,
  SpaceSvg
} from "../svgComponents";
import RightSvg from "../svgComponents/RightSvg";

export default function SettingsLabel({ label, icon, darkModeSettings = "", onPress, siwtch, textcolor, isDark, ...props }) {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  const darkThemeStyle = {
    stroke: dark ? colors.text : Color.PremiumTextColor,
    fill: dark ? colors.text : Color.PremiumTextColor
  };
  let LabelIcon;
  switch (icon) {
    case "settings":
      LabelIcon = <SettingsSvg stroke={darkThemeStyle.stroke} />;
      break;
    case "lock":
      LabelIcon = <LockSvg stroke={darkThemeStyle.stroke} />;
      break;
    case "info":
      LabelIcon = <InfoSvg stroke={darkThemeStyle.stroke} />;
      break;
    case "send":
      LabelIcon = <FlySvg stroke={darkThemeStyle.stroke} />;
      break;
    case "gift":
      LabelIcon = <EuroFillSvg />;
      break;
    case "log-out":
      LabelIcon = <LogoutSvg />;
      break;
    case "moon":
      LabelIcon = <ThemeSvg stroke={colors.text} />;
      break;
    case "bell":
      LabelIcon = <NotificationSvg stroke={colors.text} />;
      break;
    case "switch":
      LabelIcon = <Switch />;
      break;
    case "share":
      LabelIcon = <ShareSvg height={22} width={22} stroke={colors.text} />;
      break;
    case "size":
      LabelIcon = <SpaceSvg stroke={colors.text} />;
      break;
    default:
      LabelIcon = null;
  }

  return (
    <Pressable style={styles.Container} onPress={onPress}>
      {LabelIcon}
      <View style={[styles.LabelItem]}>
        <Text style={[styles.LabelText, { color: isDark ? colors.text : Color.PremiumTextColor }]}>{label}</Text>
        {siwtch ? (
          <Switch
            style={styles.LabelIconRight}
            {...props}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
          />
        ) : darkModeSettings ? (
          <Text
            style={{
              color: isDark ? colors.text : Color.PremiumTextColor,
              fontSize: normalizeL(13),
              fontWeight: "400",
              textTransform: "capitalize",
              marginRight: 10
            }}
          >
            {darkModeSettings}
          </Text>
        ) : (
          <RightSvg fill={darkThemeStyle.fill} width={20} height={20} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: horizontalScale(5)
  },
  LabelItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: verticalScale(2),
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingVertical: verticalScale(12) // 1.2%
  },
  LabelText: {
    marginLeft: 10,
    fontSize: normalizeL(13),
    fontWeight: "400"
  },
  LabelIconRight: {
    position: "absolute",
    right: -5
  }
});
