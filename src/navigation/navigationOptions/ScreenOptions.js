import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { HomeSvg, HomeFillSvg, ProfileSvg, ProfileFillSvg, NotificationSvg } from "../../components/svgComponents";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../context/AuthContex";

const ScreenOption = ({ route }) => {
  const { colors, dark } = useTheme();
  const { msgCount } = useAuth();
  const focusFill = dark ? colors.text : colors.PremiumTextColor;
  const darkStroke = dark ? colors.text : colors.PremiumTextColor;

  return {
    tabBarIcon: ({ focused }) => {
      let iconName;
      //console.log("some page focused", focused, msgCount);
      if (route.name === "Home") {
        iconName = focused ? <HomeFillSvg fill={focusFill} lineColor={colors.background} /> : <HomeSvg stroke={darkStroke} />;
      } else if (route.name === "Profile") {
        iconName = focused ? <ProfileFillSvg fill={focusFill} /> : <ProfileSvg stroke={darkStroke} />;
      } else if (route.name === "Messages") {
        iconName = focused ? (
          <View>
            <Ionicons name="chatbubble-sharp" size={24} color={focusFill} />
            {msgCount ? <Text style={styles.badge}></Text> : null}
          </View>
        ) : (
          <View>
            <Ionicons name="chatbubble-outline" size={24} color={focusFill} />
            {msgCount ? <View style={styles.badge}></View> : null}
          </View>
        );
      } else if (route.name === "Notification") {
        iconName = focused ? (
          <NotificationSvg name="notifications-sharp" fill={focusFill} stroke={darkStroke} />
        ) : (
          <NotificationSvg name="notifications-outline" fill={colors.background} stroke={darkStroke} />
        );
      }
      return <>{iconName}</>;
    }
  };
};

export { ScreenOption };

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    fontSize: 10,
    top: 1,
    left: 15,
    color: "white",
    borderRadius: 100,
    height: 10,
    width: 10,
    padding: 3,
    backgroundColor: "#2bbaf9"
  }
});
