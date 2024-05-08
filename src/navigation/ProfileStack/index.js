import React, { useLayoutEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/ProfileScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import LoginScreen from "../../screens/LoginScreen";
import {
  WelcomeScreen,
  StartScreen,
  EditProfileScreen,
  DetailScreen,
  FilterScreen,
  SearchScreen,
  ListPostScreen,
  Comments,
  ModifyPostScreen,
  SavedPosts,
  ProductListScreen,
  UploadPostScreen,
  AddScreen,
  MapScreen,
  SubCommentScreen,
  DarkModeSelectedScreen,
  ChatRoom,
  FirstMessage,
  UseTerms,
  ResendVerification
} from "../../screens";
import BottomBarNavigation from "../BottomBarNavigation";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ApplicationSettings, Privacy, Aboutus } from "../../screens/SettingMenuScreens";
import ResetPasswordScreen from "../../screens/ResetPasswordScreen";
import ReportScreen from "../../screens/ReportScreen";
import { Translation } from "../../utils/Strings";

function ProfileStack() {
  const Stack = createStackNavigator();
  const { colors } = useTheme();
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01
    }
  };

  const simpleStackOptions = {
    headerBackTitle: "Geri",
    headerBackTitleStyle: {
      color: colors.text
    },
    headerTintColor: colors.text,
    headerTitleStyle: {
      color: colors.text
    },
    headerStyle: {
      shadowColor: "transparent"
    }
  };

  return (
    <Stack.Navigator initialRouteName="StartScreen">
      <Stack.Screen
        name="Profiles"
        component={ProfileScreen}
        options={{
          headerTitle: "Profil",
          ...simpleStackOptions
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTitle: "Profil Düzenle",
          presentation: "modal",
          ...simpleStackOptions
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: true,
          headerTitle: "Hesap oluştur",
          ...simpleStackOptions
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: true,
          headerTitle: "Giriş yap",
          ...simpleStackOptions
        }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ResetPasswordScreen}
        options={{
          headerShown: true,
          headerTitle: "Şifremi Unuttum",
          presentation: "modal",
          ...simpleStackOptions
        }}
      />
      <Stack.Screen
        name="ApplocationSettings"
        component={ApplicationSettings}
        options={{
          headerShown: true,
          headerTitle: "Uygulama Ayarlari",
          ...simpleStackOptions
        }}
      />
      {/*dark mode stack */}
      <Stack.Screen
        name={"SettingDarkMode"}
        component={DarkModeSelectedScreen}
        options={{
          headerShown: true,
          headerTitle: "Theme Ayarları",
          ...simpleStackOptions
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerShown: true,
          headerTitle: "Gizlilik Politikası",
          headerBackTitle: "Geri",
          ...simpleStackOptions
        }}
      />
      <Stack.Screen
        name="Aboutus"
        component={Aboutus}
        options={{
          headerShown: true,
          headerTitle: "Gizlilik sözleşmesi",
          headerBackTitle: "Geri",
          ...simpleStackOptions
        }}
      />
      <Stack.Screen
        name="SavedPosts"
        component={SavedPosts}
        options={{
          headerShown: true,
          headerTitle: "Favorilerim",
          ...simpleStackOptions
        }}
      />
      <Stack.Screen
        name="ModifyPosts"
        component={ModifyPostScreen}
        options={{
          headerShown: true,
          headerTitle: "Ilanlarim",
          headerBackTitle: "Geri",
          ...simpleStackOptions
        }}
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{
          headerShown: true,
          headerTitle: "Şikayet/Geri bildirim",
          headerBackTitle: "Geri",
          ...simpleStackOptions
        }}
      />

      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="MainScreen"
        component={BottomBarNavigation}
        options={{
          headerShown: false,
          animationEnabled: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{
          headerShown: false,
          animationEnabled: false,
          gestureEnabled: false
        }}
      />

      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name={"Detail"}
        component={DetailScreen}
        options={{
          headerTitle: "",
          headerBackTitle: "Geri",
          headerBackTitleStyle: {
            color: colors.text
          },
          headerTintColor: colors.text
        }}
      />

      <Stack.Screen
        name={"ListPosts"}
        component={ListPostScreen}
        options={{
          headerTitle: "",
          headerBackTitle: "Geri",
          headerBackTitleStyle: {
            color: colors.text
          },
          headerTintColor: colors.text
        }}
      />

      <Stack.Screen
        name={"Comments"}
        component={Comments}
        options={{
          headerTitle: Translation("comments"),
          headerBackTitle: "Geri",
          headerBackTitleStyle: {
            color: colors.text
          },
          headerTintColor: colors.text
        }}
      />

      <Stack.Screen
        name={"SubComments"}
        component={SubCommentScreen}
        options={{
          headerTitle: Translation("Responses"),
          headerBackTitle: "Yorumlar",
          headerBackTitleStyle: {
            color: colors.text
          },
          headerTintColor: colors.text
        }}
      />

      <Stack.Screen
        name={"filter"}
        component={FilterScreen}
        options={{
          headerTitle: Translation("filters"),
          headerBackTitleVisible: false,
          headerTintColor: colors.text
        }}
      />
      <Stack.Screen
        name={"location"}
        component={MapScreen}
        options={{
          headerTitle: Translation("Location"),
          headerBackTitleVisible: false,
          headerTintColor: colors.text
        }}
      />

      <Stack.Screen
        name="addScreen"
        component={AddScreen}
        options={{
          title: "",
          headerBackTitle: "Geri",
          headerTintColor: colors.text
        }}
      />
      <Stack.Screen
        name="UploadPost"
        component={UploadPostScreen}
        options={{
          headerBackTitle: "Geri",
          headerTintColor: colors.text,
          headerBackTitleStyle: {
            color: colors.text
          },
          headerTitleStyle: {
            color: colors.text,
            textTransform: "capitalize"
          }
        }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          headerBackTitle: "Geri",
          headerTintColor: colors.text,
          headerBackTitleStyle: {
            color: colors.text
          },
          headerTitleStyle: {
            color: colors.text,
            textTransform: "capitalize"
          }
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
          presentation: "card",
          headerBackTitle: "Geri",
          ...simpleStackOptions
        }}
      />
      <Stack.Screen
        name="FirstMessage"
        component={FirstMessage}
        options={{ presentation: "modal", headerTitle: Translation("contact the user"), ...simpleStackOptions }}
      />

      <Stack.Screen
        name="UseTerms"
        component={UseTerms}
        options={{ presentation: "modal", headerTitle: Translation("usecoditiontitle"), ...simpleStackOptions }}
      />
      <Stack.Screen
        name="ResendVerification"
        component={ResendVerification}
        options={{ presentation: "modal", headerTitle: Translation("ResendVerification"), ...simpleStackOptions }}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
