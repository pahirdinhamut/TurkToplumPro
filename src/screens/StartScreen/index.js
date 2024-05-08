import { useEffect, useState } from "react";
import { Text, ImageBackground, TouchableOpacity, StyleSheet, StatusBar, View } from "react-native";
import { Translation } from "../../utils/Strings";
import { useAuth } from "../../context/AuthContex";
import Network from "../../utils/Network";

export default function StartScreen({ navigation }) {
  const { isFirstLaunch, getLocationApi, getSelectedLocation, user, logoutUser, checkUnseenMessages } = useAuth();
  const [timer, setTimer] = useState(2);
  const [imageData, setImageData] = useState({ duration: 2, url: "https://turktoplum.net/media/starter_images/default.png" });
  const canSkip = true;

  const getImgage = async () => {
    let result = await Network("BASH_RESIM", "get");
    console.log("start screen", result);
    if (result.code === "1") {
      try {
        const webduration = parseInt(result.msg.duration);
        if (result.msg.url !== imageData.url) {
          setImageData(result.msg);
          if (webduration !== imageData.duration) {
            setTimer(webduration);
          }
        }
      } catch (e) {
        console.log("start image request error: ", e);
      }
    } else if (result.code === "0") {
      if (user.usertype == "1") {
        logoutUser();
      }
    }
  };

  useEffect(() => {
    checkUnseenMessages();
  }, []);

  useEffect(() => {
    console.log("start screen: ", isFirstLaunch);
    const getLocationInfo = async () => {
      await getLocationApi();
      await getSelectedLocation();
    };
    if (isFirstLaunch === "1") {
      navigation.replace("WelcomeScreen");
      return;
    } else if (isFirstLaunch === "0") {
      getImgage();
      getLocationInfo();
    }
  }, [isFirstLaunch]);

  useEffect(() => {
    if (timer == 0) {
      navigation.replace("MainScreen");
    }
    let update = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => {
      clearInterval(update);
    };
  }, [timer]);

  return (
    <ImageBackground source={{ uri: imageData.url }} style={styles.ss_image} resizeMode="cover">
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "flex-end" }}>
        <TouchableOpacity
          style={styles.skip}
          onPress={() => {
            if (canSkip) {
              navigation.replace("MainScreen");
            }
          }}
        >
          <Text style={styles.ss_text}>
            {timer}s {Translation("skip")}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ss_image: {
    flex: 1,
    justifyContent: "space-between"
  },
  ss_text: {
    fontSize: 13,
    color: "black"
  },
  skip: {
    width: "17%",
    padding: 12,
    borderTopStartRadius: 100,
    borderBottomStartRadius: 100,
    backgroundColor: "white",//"#050640",
    marginTop: 100
  },
  name: {
    fontWeight: "bold",
    color: "#050640",
    fontSize: 20,
    marginBottom: 100
  }
});
