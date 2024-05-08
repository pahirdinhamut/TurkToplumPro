import { View, Text, Image, StyleSheet, StatusBar, ImageBackground } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Button, ModalView, WarningModal } from "../../components";
import { Color } from "../../utils/Strings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContex";
import { useEffect, useState } from "react";
import { getPassengerData } from "../../utils/Network";
import { verticalScale } from "../../utils/Spacing";
import { WelcomeLightSvg } from "components/svgComponents";

function WelcomeScreen() {
  const { colors, dark } = useTheme();
  const { isFirstLaunch, changeIsFirstLaunch, loginAsGuest, getLocationApi, loginUserErrorText, getSelectedLocation } = useAuth();
  const [modalVis, setModalVis] = useState(false);

  const navigation = useNavigation();

  const handleGuestPressed = async () => {
    await loginAsGuest();
    await getLocationApi();
    await getSelectedLocation();
  };

  useEffect(() => {
    console.log("welcome screen login error text: ", loginUserErrorText);
    if ((loginUserErrorText + "").startsWith("success")) {
      setModalVis(false);
      if (isFirstLaunch === "1") {
        changeIsFirstLaunch("0");
      }
      navigation.replace("MainScreen");
    } else if (loginUserErrorText != "") {
      setModalVis(true);
    } else {
      setModalVis(false);
    }
  }, [loginUserErrorText]);

  const handleLogin = async () => {
    //await AsyncStorage.clear();
    await getLocationApi();
    getSelectedLocation();
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between", backgroundColor: colors.welcomeBg }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.welcomeBg} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/**<WelcomeLightSvg/> */}
        <Image //source={{uri: welcomeScreenImage}}
          source={dark ? require("../../../assets/images/dark-welcome.png") : require("../../../assets/images/light-welcome.png")}
          style={{ width: "100%", height: "60%" }}
        />
      </View>
      <View style={styles.footer}>
        <Button
          title={"Misafirim"}
          textColor={"white"}
          onPress={handleGuestPressed}
          bgColor={colors.welcomeBg}
          brColor={"white"}
          bw={1.5}
        />
        <Button title={"Kullanıcıyım"} textColor={"#050640"} onPress={handleLogin} bgColor={"white"} mt={15} />
      </View>
      <WarningModal visible={modalVis} content={loginUserErrorText} buttonPress={() => setModalVis(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    color: "white",
    fontSize: 50,
    flex: 0.3,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
    justifyContent: "center"
  }
});

export default WelcomeScreen;
