import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking, Pressable, Alert } from "react-native";
import React, { useCallback } from "react";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { EmailSvg, LocationSvg, PhoneSvg, SmsSvg } from "../../components/svgComponents";
import { App, Color, Fonts, Translation } from "../../utils/Strings";

import Network, { LocationRequest, LogoutApi } from "../../utils/Network";
import { useAuth } from "../../context/AuthContex";
import Carousel from "react-native-reanimated-carousel";
import { height, width } from "../../utils/Spacing";
import ImageView from "react-native-image-viewing";
import MapView, { Circle, Marker, Overlay, Polygon } from "react-native-maps";
import { Line, NoDataView } from "../../components";
import Report from "../../components/Report/Report";
import DatabaseManager from "../../utils/Storage";
import Tags from "./Tags";
import { formatDateTime } from "../../utils/utils";

export default function MarketLike({ navigation, nk, pageName }) {
  const { colors, dark } = useTheme();
  const [details, setDetails] = React.useState({});
  const { isIos, logoutUser, location, user, currency } = useAuth();
  //const carsouelRef = React.useRef(null);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [clickedIndex, setClickedIndex] = React.useState(0);
  const [visible, setIsVisible] = React.useState(false);
  const [sliderImages, setSliderImages] = React.useState([{ uri: "https://turktoplum.net/media/headers/no_image.png" }]);
  const [locationCord, setLocationCord] = React.useState({ lat: 52.3676, lon: 4.9041, radius: 50 });
  const mapRef = React.useRef(null);
  const [noData, setNoData] = React.useState(false);

  const handlePress = (indx) => {
    setClickedIndex(indx);
    setIsVisible(true);
  };
  /**
   * load the data from local storage,while loading request from api
   * check if api detail different from local reset the detail data
   * save the new data in local storage, if data is deleted than also delete
   * it from local storage
   */
  const requestContent = async () => {
    const detail = await DatabaseManager.getCache(nk);
    //console.log(detail);
    let details = { stamp: "-" };
    if (detail) {
      details = JSON.parse(detail);
      setDetails(details);
    }
    const response = await Network("MEZMUN", "GET", { nk: nk, category: pageName });
    //console.log(response);
    if (response.code && response.code === "1") {
      if (details.stamp !== response.msg.stamp) {
        console.log(response.msg);
        await DatabaseManager.setCache(nk, JSON.stringify(response.msg));
        setDetails(response.msg);
      } else {
        console.log("local and remote details are the same!!!");
      }
    } else if (response.code == "0" && response.msg === "relogin") {
      Alert.alert(Translation("relogin_title"), Translation("relogin_msg"), [
        {
          text: Translation("ok"),
          onPress: () => {
            logoutUser(true);
          }
        }
      ]);
    } else {
      setNoData(true);
      if (response.code == "0" && response.msg === "deleted") {
        await DatabaseManager.delCache(nk);
      }
    }
  };

  const getCityLocation = React.useCallback(
    async (cityName, postcode = false) => {
      if (cityName) {
        let response = await LocationRequest(cityName, location, postcode);
        if (response) {
          setLocationCord(response);
          //mapRef.current?.animateToRegion({ latitude: response.lat, longitude: response.lon, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
        } else {
          if (details.latitude != "" && details.longitude != "") {
            setLocationCord({ lat: details.latitude, lon: details.longitude, radius: 0 });
          }
        }
        console.log(response, "location lat,lon", cityName);
      }
    },
    [details.latitude, details.longitude]
  );

  React.useEffect(() => {
    if (details.header_image && !details.header_image.includes("no_image.png")) {
      let imgs = [{ uri: details.header_image, index: 0 }];
      if (details.images.length > 0) {
        details.images.forEach((imObj, index) => {
          //imObj = {image:"url",index:"number"}
          imgs.push({ uri: imObj.image, index: index + 1 });
        });
      }
      setSliderImages(imgs);
    }
    if (details.post_code) {
      getCityLocation(details.post_code, true);
    } else {
      getCityLocation(details.city);
    }
  }, [details]);

  React.useEffect(() => {
    requestContent();
    console.log(nk, height);
  }, [nk]);

  const handelLinking = React.useCallback(
    async (linkType) => {
      if (linkType === "phone") {
        Linking.openURL(`tel:${details.phone}`).catch((err) => {
          Alert.alert("Tel: " + details.phone);
          console.log("error tel: ", err);
        });
      } else if (linkType === "email") {
        Linking.openURL(`mailto:${details.email}?subject=${pageName}&body=`).catch((err) => {
          Alert.alert("Email: " + details.email);
          console.log("error tel: ", err);
        });
      } else if (linkType === "sms") {
        if (isIos) {
          Linking.openURL(`sms:${details.phone}`).catch((err) => {
            Alert.alert("Tel: " + details.phone);
            console.log("error tel: ", err);
          });
        } else {
          Linking.openURL(`sms:${details.phone}`).catch((err) => {
            Alert.alert("Tel: " + details.phone);
            console.log("error tel: ", err);
          });
        }
      } else if (linkType === "map") {
        if (isIos) {
          await Linking.openURL(`maps://0,0?q=${locationCord.lat},${locationCord.lon}`);
        } else {
          await Linking.openURL(`geo:0,0?q=${locationCord.lat},${locationCord.lon}`);
        }
      }
    },
    [details.phone, details.email, locationCord.lat, locationCord.lon, pageName]
  );

  const create_room = React.useCallback(async () => {
    if (user.usertype === 2) {
      navigation.navigate("Login");
      return;
    }
    let chat_id = await DatabaseManager.getRoomId(nk);
    if (chat_id) {
      navigation.navigate("ChatRoom", { room_id: chat_id, title: details.owner_name, unseen_msg_count: "0" });
    } else {
      navigation.navigate("FirstMessage", {
        nk: nk,
        send_to: details.owner_name,
        msg: "Merhaba " + details.owner_name + "! [" + details.title + "] gönderiniz nedeniyle sizinle iletişime geçiyorum."
      });
    }
  }, [nk, details.owner_name, user.usertype]);

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      {noData ? (
        <NoDataView activeRetry={false} internet={false} />
      ) : (
        <>
          {/* imageSlider */}
          <View>
            {!sliderImages[0].uri.endsWith("no_image.png") ? (
              <>
                <ImageView
                  images={sliderImages}
                  imageIndex={clickedIndex}
                  visible={visible}
                  animationType="slide"
                  onRequestClose={() => setIsVisible(false)}
                  FooterComponent={({ imageIndex }) => (
                    <Text
                      style={{
                        padding: 8,
                        borderRadius: 20,
                        alignSelf: "center",
                        color: colors.text,
                        marginBottom: 20,
                        width: 60,
                        textAlign: "center",
                        backgroundColor: colors.modalBackground
                      }}
                    >
                      {imageIndex + 1}/{sliderImages.length}
                    </Text>
                  )}
                />

                <Carousel
                  loop={false}
                  //ref={carsouelRef}
                  width={width}
                  height={height / 3.7}
                  data={sliderImages}
                  renderItem={({ item }) => (
                    <Pressable onPress={() => handlePress(item.index)}>
                      <Image style={{ width: "100%", height: height / 3 }} source={{ uri: item.uri }} resizeMode="cover" />
                    </Pressable>
                  )}
                  onSnapToItem={(index) => {
                    setCurrentPage(index);
                  }}
                />
                {/**
            <View style={[styles.PriceContainer, { backgroundColor: colors.background }]}>
              <Icon name="euro" size={16} color={colors.text} />
              <Text style={{ marginLeft: 5, color: colors.text }}>{getPrice(details.details)}</Text>
            </View>
            */}
                <View style={styles.pageinationContainer}>
                  <Text style={styles.pagenumber}>
                    {currentPage + 1}/{sliderImages.length}
                  </Text>
                </View>
              </>
            ) : null}
          </View>
          {/* owner info  */}
          <View style={[styles.owneInfoContainer, { backgroundColor: colors.modalBackground }]}>
            {/* left side */}
            <View style={styles.ownerInfoView}>
              <Image
                source={{ uri: details.logo ? details.logo : "https://turktoplum.net/media/logos/default.png" }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
              <View style={styles.ownerInfo}>
                <Text style={[styles.ownerName, { color: colors.text }]}>{details.owner_name}</Text>
                <Text style={[styles.Date, { color: colors.text }]}>{formatDateTime(details.date)}</Text>
              </View>
            </View>
            {/* right side */}
            {/* have a email */}
            {user.username === details.owner_name ? null : (
              <View style={styles.contactContainer}>
                {details.email ? (
                  <TouchableOpacity
                    style={[styles.iconView, { backgroundColor: "#2bbaf9" }]}
                    onPress={() => handelLinking("email")}
                  >
                    <EmailSvg stroke={"white"} />
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
                {/* have a phone  */}
                {details.phone ? (
                  <TouchableOpacity
                    style={[styles.iconView, { backgroundColor: "#2bbaf9" }]}
                    onPress={() => handelLinking("phone")}
                  >
                    <PhoneSvg stroke={"white"} />
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
                <TouchableOpacity style={[styles.iconView, { backgroundColor: "#2bbaf9" }]} onPress={create_room}>
                  <SmsSvg fill={"white"} />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/*content to scroll*/}
          <ScrollView
            style={{
              marginHorizontal: 10
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* title */}
            <Text
              style={{
                marginTop: 15,
                marginBottom: 5,
                fontSize: 17,
                fontFamily: Fonts.semibold,
                color: colors.text,
                textTransform: "capitalize"
              }}
            >
              {details.title}
            </Text>
            {/* ad id  */}
            <Text style={{ fontFamily: Fonts.regular, fontSize: 12, color: colors.text, marginBottom: 5 }}>
              İlan Numarası : {nk}
            </Text>
            {/* price  */}
            {getPrice(details.details) ? (
              <Text style={{ marginLeft: 5, color: colors.blue, fontSize: 24 }}>
                {getPrice(details.details)} {currency}
              </Text>
            ) : null}

            {/* adress */}
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
              <LocationSvg height={15} width={15} color={colors.blue} />
              <Text style={{ color: colors.blue, marginLeft: 2, fontSize: 14, fontFamily: Fonts.semibold }}>{details.city}</Text>
            </View>
            {/*  home  Tags
          style={{ marginTop: 10, marginBottom: 5, flexDirection: "row", flex: 1, flexWrap: "wrap" }}*/}
            {details.details ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {details.details.map((item, index) => {
                  if (item.icon.toLowerCase() != "price" && item.value != null && item.value !== "") {
                    return <Tags key={index} name={item.tag} icon={item.icon} value={item.value} />;
                  }
                })}
              </ScrollView>
            ) : null}
            {/* description */}
            <View>
              <Text style={{ fontWeight: "bold", fontFamily: Fonts.semibold, color: colors.text }}>Açıklama:</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Fonts.regular,
                  color: colors.text,
                  lineHeight: 20,
                  marginTop: 5
                }}
                selectable
              >
                {details.content}
              </Text>
            </View>
            {/* deatil adress  */}
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: "bold", fontFamily: Fonts.semibold, fontSize: 14, color: colors.text }}>
                {details.post_code}
              </Text>
              {locationCord.lat && locationCord.lon ? (
                <MapView
                  style={{ width: width, height: height * 0.2, marginTop: 10, borderRadius: 10 }}
                  onPress={() => {
                    handelLinking("map");
                  }}
                  ref={mapRef}
                  region={{
                    latitude: locationCord.lat,
                    longitude: locationCord.lon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  }}
                >
                  <Marker coordinate={{ latitude: locationCord.lat, longitude: locationCord.lon }} />

                  {/**     <Circle
              center={{
                latitude: locationCord.lat,
                longitude: locationCord.lon,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              radius={locationCord.radius * 1000}
            /> */}
                </MapView>
              ) : null}
              <Report navigation={navigation} nk={nk} />
            </View>
            <Line mt={10} mb={10} />
            <Text style={{ marginBottom: 25, fontSize: 15, color: colors.grey }}>{Translation("Disclaimer")}</Text>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const getPrice = (list) => {
  let price = "";
  if (!list) {
    return price;
  }
  list.forEach((item) => {
    if (item.icon === "price") {
      price = item.value;
    }
  });
  return price;
};

const styles = StyleSheet.create({
  pagenumber: {
    margin: 5,
    fontSize: 16
  },
  pageinationContainer: {
    position: "absolute",
    left: width / 2,
    top: height / 4.3,
    backgroundColor: "transparent",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5
  },
  /**
  PriceContainer: {
    position: "absolute",
    left: 20,
    top: 20,
    backgroundColor: "#fff",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
  },
 */
  // Owner info
  owneInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
  },
  ownerInfoView: {
    flexDirection: "row",
    alignItems: "center"
  },
  ownerInfo: {
    marginLeft: 10
  },
  ownerName: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: Fonts.medium
  },
  Date: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: "#666"
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 140
  },
  iconView: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 50,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
  }
});
