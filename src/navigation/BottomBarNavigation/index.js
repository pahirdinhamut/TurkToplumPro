import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, AddScreen, ProfileScreen, ChatScreen, NotificationScreen } from "../../screens";
import { LogoSvg } from "../../components/svgComponents";
import { ScreenOption } from "../navigationOptions/ScreenOptions";
import { Pressable, View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useTheme } from "@react-navigation/native";
import { Translation } from "../../utils/Strings";
const Tab = createBottomTabNavigator();

function BottomBarNavigation({ navigation, route }) {
  const lastPressTimeRef = React.useRef(0);
  const { colors, dark } = useTheme();
  const defaultScreenOptions = {
    tabBarLabelStyle: {
      fontSize: 10,
      fontWeight: "500",
      color: dark ? colors.text : colors.PremiumTextColor
    }
  };

  return (
    /**ScreenOption has all the icon used in bottom navigation*/
    <Tab.Navigator screenOptions={ScreenOption}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          ...defaultScreenOptions,
          headerTitle: "",
          title: Translation("homepage"),
          headerLeft: () => (
            <Pressable style={{ marginLeft: 10 }}>
              <LogoSvg height={70} width={130} dark={dark} />
            </Pressable>
          )
        }}
        listeners={{
          tabPress: (e) => {
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - lastPressTimeRef.current;
            lastPressTimeRef.current = currentTime;

            if (timeDiff < 300) {
              // Adjust the time of double tap threshold as needed (300ms in this example)
              console.log("double click");
              navigation.navigate("Home", { scrollTop: true });
              e.preventDefault();
            }
          }
        }}
      />
      <Tab.Screen
        name="Messages"
        component={ChatScreen}
        options={{
          ...defaultScreenOptions,
          headerShown: true,
          title: Translation("Messages")
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          ...defaultScreenOptions,
          headerShown: false,
          title: "Ilan Ver",
          tabBarIcon: ({ focused, name }) => (
            <View
              style={{
                backgroundColor: "#2BBAF9",
                height: 40,
                width: 40,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                marginTop: -28
              }}
            >
              <Icon name="plus" size={24} color={"white"} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          ...defaultScreenOptions,
          title: Translation("Notification")
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          ...defaultScreenOptions,
          headerShown: true,
          title: Translation("Profile")
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomBarNavigation;
