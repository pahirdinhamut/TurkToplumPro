import {
  View,
  StatusBar,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
  Text,
  RefreshControl,
  Alert,
  AppState,
  Linking
} from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { HStack, ImageSlider, CategoryViewer, ModalView, NewsItem, NoDataView } from "../../components";
import LanguageItemView from "../../components/Modal/LanguageItemView";
import { useTheme, useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import { height, width } from "../../utils/Size";
import { useAuth } from "../../context/AuthContex";
import Network from "../../utils/Network";
import DatabaseManager from "../../utils/Storage";
import { SearchSvg } from "../../components/svgComponents";
import { ScrollView } from "react-native-gesture-handler";
import { Translation } from "../../utils/Strings";

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import NotificationReceiver from "../../utils/NFReceiver";
import { ExtractFromLink } from "../../utils/utils";

const default_slider = {
  uri: "https://turktoplum.net/media/starter_images/default.png",
  clickable: false
};

let totalrender = 0;
let locationrender = 0;
let locationflag = 0;
let sliderapi = 0;
let getcountryapi = 0;

export default function HomeScreen({ navigation, route }) {
  const { colors, dark } = useTheme();
  const [postData, setPostData] = React.useState([]);
  const [isLoad, setIsLoad] = React.useState(false);
  const [locations, setLocations] = React.useState([]); //list of countries to select (country modal data)
  const [visModal, setVisModal] = React.useState(false); // country modal visibility
  const [imgSliders, setImgSliders] = React.useState([default_slider]);
  const {
    changeLocation,
    location,
    locationFlag,
    categories,
    getSelectedLocation,
    getLocationApi,
    logoutUser,
    updateNotificationToken,
    token,
    user,
    checkUnseenMessages,
    isIos
  } = useAuth();
  const [nextPage, setNextPage] = React.useState(null);
  const [refresh, setRefresh] = React.useState(true);
  const flatListRef = React.useRef(null);
  const catRef = React.useRef(null);
  const socketRef = React.useRef(null);

  React.useEffect(() => {
    if (token && user.username && user.usertype === 1) {
      if (socketRef.current) {
        socketRef.current.close_socket();
        socketRef.current = new NotificationReceiver(token, user.username, () => {
          checkUnseenMessages(false, true);
        });
      } else {
        socketRef.current = new NotificationReceiver(token, user.username, () => {
          checkUnseenMessages(false, true);
        });
      }

      return () => {
        console.log("deleting notification reeciver");
        socketRef.current.close_socket();
      };
    }
  }, [token, user.username, user.usertype]);

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "background" && user.usertype === 1) {
        socketRef.current.close_socket();
      } else if (nextAppState === "active" && user.usertype === 1) {
        if (socketRef.current.CLOSED === socketRef.current.readyState) {
          socketRef.current.connect();
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [user.usertype]);

  React.useEffect(() => {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.createChannel({
      channelId: "news-channel", // (required)
      channelName: "news channel", // (required)
      color: "red"
    });

    PushNotification.createChannel({
      channelId: "messaging", // (required)
      channelName: "messaging", // (required)
      color: "red"
    });

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
        updateNotificationToken(token.token, token.os);
      },

      channelId: "1",

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: async function (notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
        let data = notification.data;

        //when user clicked the notification
        if (data && Object.keys(data).length) {
          if (data.TTCATEGORY === "1") {
            navigation.navigate("Detail", {
              id: data.TTID,
              type: data.TTTYPE,
              newslike: data.TTNEWSLIKE === "True" ? true : false
            });
          } else if (data.TTCATEGORY === "2") {
            const roomId = data.TTID;
            const sender = data.TTSENDER;
            navigation.navigate("ChatRoom", { room_id: roomId, title: sender, unseen_msg_count: "1" });
          }
        }
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION on action:", notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      // (optional) default: true
      // - Specified if permissions (ios) and token (android and ios) will requested or not,
      // - if not, you must call PushNotificationsHandler.requestPermissions() later
      // - if you are not using remote notification or do not have Firebase installed, use this:
      //     requestPermissions: Platform.OS === 'ios'

      requestPermissions: true
    });
  }, []);

  const getCountriesApi = async () => {
    getcountryapi++;
    let countries_info = await DatabaseManager.getLocations();
    //console.log("location from database:", countries_info);
    if (countries_info.length == 0) {
      await getLocationApi(); //get location from api set it to database
      await getSelectedLocation(); //get the current selected location or get it from users position(geopositioning)
    } else {
      setLocations(countries_info);
    }
  };

  const setModalCountries = async () => {
    if (locations.length == 0) {
      await getCountriesApi();
    }
    setVisModal(true);
  };

  const requestSliders = async () => {
    sliderapi++;
    const response = await Network("BASHBET_RASIM", "GET", { country: location });
    if (response.code == "1") {
      if (response.msg.length == 0) {
        setImgSliders([default_slider]);
      } else {
        setImgSliders(response.msg); //[{"clickable": true, "key": "m746831686920552", "type": "1", "uri": "https:/asdasd.jpg"}]
      }
    } else {
      setImgSliders([default_slider]);
    }
    console.log("slider response: ", response);
  };

  React.useEffect(() => {
    //locationflag++;
    navigation.setOptions({
      // show Location in header Search bar
      headerRight: () => (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginRight: 15 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")} activeOpacity={0.5}>
            <SearchSvg height={25} width={25} stroke={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              //getCountriesApi();
              //setVisModal(true);
              setModalCountries();
            }}
            activeOpacity={0.5}
            style={{
              bagroundColor: colors.card,
              marginStart: 18
            }}
          >
            <Image height={25} width={25} source={{ uri: locationFlag }} />
          </TouchableOpacity>
        </View>
      )
    });
  }, [locationFlag, colors]);

  const request = async (nxtpUrl) => {
    let response;
    let start = performance.now();
    if (nxtpUrl) {
      response = await Network("BASHBET", "GET", {}, {}, false, false, false, { state: true, url: nxtpUrl });
    } else {
      response = await Network("BASHBET", "GET", { country: location });
    }
    //console.log(response);
    if (response.code === "1") {
      setNextPage(response.nxt || null);
      setPostData(nxtpUrl ? [...postData, ...response.msg] : response.msg);
    } else if (response.code == "0" && response.msg === "relogin") {
      Alert.alert(Translation("relogin_title"), Translation("relogin_msg"), [
        {
          text: Translation("ok"),
          onPress: () => {
            logoutUser(true);
          }
        }
      ]);
    }
    console.log("request time homepage: ", performance.now() - start);

    //console.log("all the responses:", response.msg[0]);
    setIsLoad(false);
    setRefresh(false);
  };

  React.useEffect(() => {
    if (location) {
      getCountriesApi();
      request();
      requestSliders();
    }
  }, [location]);

  // header components for home screen

  const handleLocationSettingPress = (country) => {
    //console.log("country: ", country);
    changeLocation(country);
    setVisModal(false);
    setIsLoad(true);
    setRefresh(true);
  };

  const handleNewsItemPress = React.useCallback((key, type, newslike) => {
    navigation.navigate("Detail", { id: key, type: type, newslike: newslike });
  }, []);

  React.useEffect(() => {
    const deepLinking = Linking.addEventListener("url", ({ url }) => {
      console.log("url listener: " + url);
      if (url) {
        const obj = ExtractFromLink(url);
        //console.log(obj);
        if (obj) {
          navigation.navigate("Detail", obj);
        }
      }
    });
    Linking.getInitialURL()
      .then((url) => {
        console.log("url init: " + url);
        if (url) {
          const obj = ExtractFromLink(url);
          //console.log(obj);
          if (obj) {
            navigation.navigate("Detail", obj);
          }
        }
      })
      .catch((error) => {
        console.log("getting url errorrr: ", error);
      });

    if (route.params && route.params.scrollTop && flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
    }
    return () => {
      deepLinking.remove();
    };
  }, [route]);

  //scroll to side, let users know there is another cateogry at the end of scrollview
  React.useEffect(() => {
    if (catRef) {
      console.log("using scroll here");
      setTimeout(
        () => {
          catRef.current.scrollTo({ animated: true, x: 35, y: 0 });
        },
        isIos ? 500 : 0
      );
    }
  }, [catRef]);

  const HeaderComponents = React.useMemo(() => {
    return (
      <>
        <Carousel
          loop
          width={width - 16}
          height={180}
          autoPlay={true}
          data={imgSliders}
          autoPlayInterval={3500}
          //scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                if (item.clickable) {
                  navigation.navigate("Detail", { id: item.key, type: item.type, newslike: item.newslike });
                }
              }}
            >
              <ImageSlider image={item.uri} />
            </Pressable>
          )}
          //style={{ marginVertical: 5 }}
        />
        <View
          style={{
            marginVertical: 15
          }}
        >
          {/* category list components */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={catRef}>
            {String(categories).toLowerCase().includes("community") ? (
              <CategoryViewer title={"Sosyal"} onPress={() => navigation.navigate("ListPosts", { category: "community" })} />
            ) : null}

            {String(categories).toLowerCase().includes("market") ? (
              <CategoryViewer title={"Alışveriş"} onPress={() => navigation.navigate("ListPosts", { category: "market" })} />
            ) : null}

            {String(categories).toLowerCase().includes("work") ? (
              <CategoryViewer title={"İş İlanları"} onPress={() => navigation.navigate("ListPosts", { category: "work" })} />
            ) : null}

            {String(categories).toLowerCase().includes("house") ? (
              <CategoryViewer title={"Emlak"} onPress={() => navigation.navigate("ListPosts", { category: "house" })} />
            ) : null}

            {String(categories).toLowerCase().includes("promote") ? (
              <CategoryViewer title={"Keşfet"} onPress={() => navigation.navigate("ListPosts", { category: "promote" })} />
            ) : null}

            {String(categories).toLowerCase().includes("news") ? (
              <CategoryViewer title={"Gündem"} onPress={() => navigation.navigate("ListPosts", { category: "news" })} />
            ) : null}
          </ScrollView>
        </View>
      </>
    );
  }, [imgSliders, categories]);

  const renderItem = ({ item, index }) => {
    //console.log(item.key, index);
    return (
      <NewsItem
        title={item.title}
        image={item.image_thumbnail}
        comments={item.comments}
        seen={item.seen}
        date={item.date}
        nk={item.key}
        type={item.type}
        newslike={item.newslike}
        onPress={handleNewsItemPress}
      />
    );
  };
  totalrender++;
  //console.log("home page total render", totalrender, locationrender, locationflag, sliderapi, getcountryapi);
  return (
    <Container bcColor={colors.background}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} backgroundColor={colors.background} translucent={true} />
      {/* Location  Modal */}
      <ModalView open={visModal} type={"location"} onPress={() => setVisModal(false)}>
        <FlatList
          style={{ marginTop: 6 }}
          showsVerticalScrollIndicator={false}
          data={locations}
          renderItem={({ item }) => (
            <LanguageItemView
              icon={item.flag}
              title={item.name}
              onPress={() => handleLocationSettingPress(item.name)}
              key={item.id}
            />
          )}
          bounces={false}
        />
      </ModalView>
      <FlatList
        ref={flatListRef}
        style={{ margin: 8 }}
        ListHeaderComponent={HeaderComponents}
        data={postData} //{posts}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        keyExtractor={(item, index) => item.key + index}
        ListEmptyComponent={() => (refresh ? <></> : <NoDataView internet={false} />)}
        refreshControl={
          <RefreshControl
            colors={[colors.text, colors.primary]} //for android
            tintColor={colors.text} //for ios
            progressBackgroundColor={colors.modalBackground}
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              setNextPage(null);
              request();
            }}
          />
        }
        renderItem={renderItem}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          if (nextPage && !isLoad) {
            setIsLoad(true);
            request(nextPage);
          }
        }}
        ListFooterComponent={() =>
          isLoad ? (
            <Text style={{ alignSelf: "center", color: colors.text, margin: 15 }}>{Translation("loading...")}</Text>
          ) : (
            <></>
          )
        }
      />
    </Container>
  );
}
