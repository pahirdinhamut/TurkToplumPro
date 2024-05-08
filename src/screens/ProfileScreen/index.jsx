import { Text, View, Share, Image, Pressable, Alert } from "react-native";
import { Container, Logout, SettingsLabel, ModalView, Button, LoadingModal } from "../../components";
import styles from "./styles.style";
import { useTheme } from "@react-navigation/native";
import { AddAdvSvg, EditSvg, FlySvg, HaertSvg } from "../../components/svgComponents";
import { useAuth } from "../../context/AuthContex";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { App, Translation } from "../../utils/Strings.js";

function ProfileScreen({ route, navigation }) {
  const { colors, dark } = useTheme();
  const { token, user, logoutUser, likedCount, postCount, isIos } = useAuth();
  const [activeOpacity, setActiveOpacity] = React.useState(1);
  const [isLogoutAlert, setIsLogoutAlert] = React.useState(false);
  const [logoutWait, setLogoutWait] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "flex" } });
  }, [navigation, route]);

  const handlePressLogin = useCallback(() => {
    if (user.usertype == 1) {
      setIsLogoutAlert(true);
    } else {
      navigation.navigate("Login");
    }
  }, [user.usertype, token]);

  //console.log("profile screen user: ", user);

  React.useEffect(() => {
    if (user.usertype == 1) {
      setActiveOpacity(0.1);
    } else {
      setActiveOpacity(1);
    }
  }, [user]);

  const handleLogout = useCallback(async () => {
    setIsLogoutAlert(false);
    setLogoutWait(true);

    logoutUser()
      .then(() => {
        setTimeout(
          () => {
            setLogoutWait(false);
          },
          isIos ? 500 : 0
        );
      })
      .catch((err) => {
        console.error("logout error from profile: " + err);
        setTimeout(
          () => {
            setLogoutWait(false);
          },
          isIos ? 500 : 0
        );
      });
  }, [user.usertype]);

  const AuthControllerStyle = {
    color: user.usertype == 1 ? colors.blue : colors.darkgrey
  };

  const handleShareClick = useCallback(async () => {
    try {
      console.log("try to share");
      const result = await Share.share(
        {
          message: App.base_url + "/upload/download/",
          url: App.base_url
        },
        { dialogTitle: "Android Title" }
      );
      console.log("share result: ", result);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert(error.message);
    }
  }, []);

  return (
    <Container bcColor={colors.modalBackground}>
      <View style={styles.HeaderView}>
        {/* user profile   */}
        <View style={styles.UserProfileView}>
          <Pressable
            style={[styles.UserImage, { backgroundColor: colors.background }]}
            onPress={() => {
              if (user.usertype == "1") {
                navigation.navigate("EditProfile");
                return;
              }
              navigation.navigate("Login");
            }}
          >
            {user.logo !== null && <Image style={styles.Photo} source={{ uri: user.logo }} />}
            <View style={[styles.Edit, { backgroundColor: colors.modalBackground }]}>
              <EditSvg width={18} height={18} stroke={colors.text} />
            </View>
          </Pressable>
          <View style={styles.UserName}>
            <Text style={[styles.name, { color: colors.text }]}>{token ? user.username : "Welcome 🥳"}</Text>
            <Pressable>
              <Text style={styles.subName}>{token ? user.email : " - - - -"}</Text>
            </Pressable>
          </View>
        </View>
        {/*  User status*/}
        <View style={styles.UserStatus}>
          <TouchableOpacity
            style={styles.HStackView}
            activeOpacity={activeOpacity}
            onPress={() => {
              if (user.usertype == 1) navigation.navigate("ModifyPosts");
            }}
          >
            <Text style={[styles.UserStatusText, AuthControllerStyle]}>İlanlarım</Text>
            <AddAdvSvg stroke={AuthControllerStyle.color} />
            <Text style={[styles.UserStatusText, styles.UserStatusCount, AuthControllerStyle]}>{postCount}</Text>
          </TouchableOpacity>

          <View style={styles.Line} />

          <TouchableOpacity
            style={styles.HStackView}
            activeOpacity={activeOpacity}
            onPress={() => {
              if (user.usertype == 1) navigation.navigate("SavedPosts");
            }}
          >
            <Text style={[styles.UserStatusText, AuthControllerStyle]}>Favorilerim</Text>
            <HaertSvg stroke={AuthControllerStyle.color} />
            <Text style={[styles.UserStatusText, styles.UserStatusCount, AuthControllerStyle]}>{likedCount}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.SettingView, { backgroundColor: colors.background }]}>
        <Text style={[styles.SettingTitle, { color: colors.text }]}>Ayarlar</Text>
        <SettingsLabel
          label="Uygulama Ayarları"
          icon={"settings"}
          isDark={dark}
          onPress={() => navigation.navigate("ApplocationSettings")}
        />
        <SettingsLabel label="Gizlilik sözleşmesi" icon={"lock"} isDark={dark} onPress={() => navigation.navigate("Privacy")} />
        <SettingsLabel label="Hakkımızda" icon={"info"} isDark={dark} onPress={() => navigation.navigate("Aboutus")} />
        <SettingsLabel
          label="Geri bildirim"
          icon={"send"}
          isDark={dark}
          onPress={() => navigation.navigate("Report", { type: 0 })}
        />
        <SettingsLabel label="arkadaşlarınızı davet edin" icon={"share"} isDark={dark} onPress={handleShareClick} />
        <Logout
          title={user.usertype == 1 ? Translation("Logout your account") : Translation("Login your account")}
          icon={"login"}
          auht={!!token}
          isDark={dark}
          onPress={handlePressLogin}
        />
      </View>
      <ModalView
        type={"alert"}
        open={isLogoutAlert}
        onPress={() => setIsLogoutAlert(false)}
        // height={verticalScale(180)}
        // height={verticalScale(180)}
        title={Translation("Are you sure you want to log out?")}
        okButtonPress={handleLogout}
        cancelButtonPress={() => setIsLogoutAlert(false)}
      />
      <LoadingModal visible={logoutWait} text={Translation("Logging out...")} />
    </Container>
  );
}

export default ProfileScreen;
