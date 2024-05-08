import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { getFocusedRouteNameFromRoute, useTheme } from "@react-navigation/native";
export default function AddScreenStack({ route, navigation }) {
  const Stack = createStackNavigator();
  const { colors, dark } = useTheme();

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideTabBar = ["Home", "Shopping", "Jobs", "UploadPost", "ProductList"];
    if (hideTabBar.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return <Stack.Navigator></Stack.Navigator>;
}

const styles = StyleSheet.create({});
