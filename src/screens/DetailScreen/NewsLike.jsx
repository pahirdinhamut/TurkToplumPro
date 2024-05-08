import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, RefreshControl, ScrollView, Image, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { EyeSvg, CommentsSvg, ProfileFillSvg } from "../../components/svgComponents";
import { App, Color, Fonts, Translation } from "../../utils/Strings";
import { height, horizontalScale, width } from "../../utils/Spacing";
import Icon from "react-native-vector-icons/AntDesign";
import Network from "../../utils/Network.js";
import Report from "../../components/Report/Report";
import { Line, NoDataView } from "../../components";
import { WebView } from "react-native-webview";
import ImageView from "react-native-image-viewing";
import { useAuth } from "../../context/AuthContex";
import DatabaseManager from "../../utils/Storage";
import { formatDateTime } from "../../utils/utils";

export default function NewsLike({ navigation, nk, pageName }) {
  const { dark, colors } = useTheme();
  const [details, setDetails] = React.useState({ details: false });
  const [refresh, setRefresh] = React.useState(true);
  const [sliderImages, setSliderImages] = React.useState([{ uri: "https://turktoplum.net/media/headers/no_image.png" }]);
  const [clickedIndex, setClickedIndex] = React.useState(0);
  const [visible, setIsVisible] = React.useState(false);
  const [noData, setNoData] = React.useState(false);
  const { logoutUser, token } = useAuth();

  const handlePress = () => {
    setIsVisible(true);
  };
  // handle press comment view button

  const handleCommentPress = () => {
    navigation.navigate("Comments", { nk: nk });
  };
  const requestContent = async (request_refresh = false) => {
    if (request_refresh) {
      const response = await Network("MEZMUN", "GET", { nk: nk, category: pageName });
      if (response.code && response.code === "1") {
        console.log(response.msg, "stamo not same");
        await DatabaseManager.setCache(nk, JSON.stringify(response.msg));
        setDetails(response.msg);
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
      setRefresh(false);
      return;
    }
    const detail = await DatabaseManager.getCache(nk);
    let details = { stamp: "-" };
    if (detail) {
      details = JSON.parse(detail);
      setDetails(details);
    }

    const response = await Network("MEZMUN", "GET", { nk: nk, category: pageName });
    if (response.code && response.code === "1") {
      if (details.stamp !== response.msg.stamp) {
        console.log(response.msg, "stamo not same");
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

    setRefresh(false);
  };

  React.useEffect(() => {
    requestContent();
    console.log(nk, pageName);
  }, [nk]);

  React.useEffect(() => {
    if (!details.details) {
      return;
    }
    let images = [];
    let counter = 0;
    if (!details.header_image.endsWith("no_image.png")) {
      images.push({ uri: details.header_image, index: counter });
      counter++;
    }

    if (details.images.length > 0) {
      details.images.forEach((obj) => {
        images.push({ uri: obj.image, index: counter });
        counter++;
      });
    }
    setSliderImages(images);
  }, [details]);

  return (
    <View style={{ flex: 1, paddingHorizontal: details.details.link ? 15 : 15 }}>
      {noData ? (
        <NoDataView activeRetry={false} internet={false} />
      ) : (
        <>
          {details.details.link ? (
            <>
              <Text style={[styles.ContentsTitle, { color: colors.text, fontWeight: "bold" }]}>{details.title}</Text>
              <NewsLikeInfo date={details.date} seen={details.seen} source={details.details.source} comments={details.comments} />
              <WebView source={{ uri: details.content }} />
            </>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.ScrolView}
              refreshControl={
                <RefreshControl
                  colors={[colors.text, colors.primary]} //for android
                  tintColor={colors.text} //for ios
                  progressBackgroundColor={colors.modalBackground}
                  refreshing={refresh}
                  onRefresh={() => {
                    setRefresh(true);
                    requestContent(true);
                  }}
                />
              }
            >
              {sliderImages.length > 0 && !sliderImages[0].uri.endsWith("no_image.png") ? (
                <ImageView
                  images={sliderImages}
                  imageIndex={clickedIndex}
                  visible={visible}
                  animationType="slide"
                  onRequestClose={() => setIsVisible(false)}
                  FooterComponent={({ imageIndex }) => (
                    <Text
                      style={{
                        alignSelf: "center",
                        color: "white",
                        marginBottom: 20
                      }}
                    >
                      {imageIndex + 1}/{sliderImages.length}
                    </Text>
                  )}
                />
              ) : (
                <></>
              )}

              <Text style={[styles.ContentsTitle, { color: colors.text, fontWeight: "bold" }]}>{details.title}</Text>
              <NewsLikeInfo
                date={details.date}
                seen={details.seen}
                source={details.details.source}
                comments={details.comments}
                owner_name={pageName == "community" ? details.owner_name : ""}
              />
              {/* Content image and News decription */}
              {details.header_image && !details.header_image.endsWith("no_image.png") ? (
                <Pressable onPress={handlePress}>
                  <Image
                    source={{
                      uri: details.header_image
                    }}
                    style={styles.Newsimage}
                  />
                </Pressable>
              ) : null}

              <RenderTextWithImages text={details.content} imgs={details.images} colors={colors} dark={dark} />

              {pageName == "community" ? (
                <View>
                  <Report navigation={navigation} nk={nk} />
                  <Line width={1} />
                  <Text style={{ marginBottom: 25, fontSize: 15, color: colors.grey }}>{Translation("disclaimer")}</Text>
                </View>
              ) : null}
            </ScrollView>
          )}
          <Pressable style={styles.CommentCount} onPress={handleCommentPress}>
            <Text style={[styles.CommentCountTex, { color: dark ? colors.text : Color.PremiumTextColor }]}>
              Yorumlar&nbsp;({details.comments})
            </Text>
            <Icon name="right" size={25} color={dark ? colors.text : Color.PremiumTextColor} />
          </Pressable>
        </>
      )}
    </View>
  );
}

const RenderTextWithImages = ({ text, imgs, colors }) => {
  if (!text) {
    return null;
  }
  const parts = text.split(/{{\d+}}/); // Split the text based on {{number}} pattern
  const images = text.match(/{{(\d+)}}/g); // Extract the image placeholders {{number}}
  const real_images = []; // collect only the tag corresponding images {{1}} if there is a tag {{6}} but no image it will not be collected

  if (parts.length === 1) {
    // that means there is no image tags inside description {{1}}...
    //render text and at the bottom render all images
    //imgs are [{image:"url",index:1}]
    return (
      <View>
        <Text style={[styles.NewsDescText, { color: colors.text }]} selectable>
          {parts[0]}
        </Text>
        {imgs.map((im, indx) => (
          <Image key={indx} source={{ uri: im.image }} style={styles.Newsimage} />
        ))}
      </View>
    );
  }
  let counter = 0;
  let tot_slider_images = [];
  if (images && imgs) {
    //iterateing over image placeholders {{1}}
    images.forEach((indexer) => {
      const foundImage = imgs.find((image) => "{{" + String(image.index) + "}}" === indexer);
      if (foundImage) {
        real_images.push(foundImage.image);
        tot_slider_images.push([{ uri: foundImage.image, index: counter }]);
        counter++;
      }
    });
  }

  let not_tagged_images = [];
  if (imgs.length) {
    imgs.forEach((image) => {
      const foundIndex = images.find((indexer) => indexer === "{{" + String(image.index) + "}}");
      if (!foundIndex) {
        not_tagged_images.push(image);
        tot_slider_images.push([{ uri: image, index: counter }]);
        counter++;
      }
    });
  }
  //setSliderImages(tot_slider_images);

  //console.log(parts, images, real_images, imgs, not_tagged_images);
  if (real_images.length) {
    return (
      <View>
        {parts.map((part, index) => {
          //if (part.trim() === "") {
          //  return null; // Skip rendering if the part is an empty string
          //}
          //console.log(index, real_images.length > index);
          return (
            <View key={index}>
              {part.trim() === "" ? null : (
                <Text style={[styles.NewsDescText, { color: colors.text }]} selectable>
                  {part}
                </Text>
              )}
              {real_images.length > index ? <Image source={{ uri: real_images[index] }} style={styles.Newsimage} /> : null}
            </View>
          );
        })}
        {not_tagged_images.map((im, index) => (
          <Image key={index} source={{ uri: im.image }} style={styles.Newsimage} />
        ))}
      </View>
    );
  } else {
    return (
      <View>
        <Text style={[styles.NewsDescText, { color: colors.text }]} selectable>
          {text}
        </Text>
      </View>
    );
  }
};

const NewsLikeInfo = ({ date, seen, source, comments, owner_name }) => {
  return (
    <View style={styles.ContentsDataView}>
      {/* date  */}
      <Text style={{ fontSize: 12, color: Color.darkgrey }}>{formatDateTime(date)}</Text>
      {/* Viewer count */}
      <View style={styles.IconView}>
        {/* <Eye color={Color.darkgrey} /> */}
        <EyeSvg height={17} width={17} stroke={"#b8b8bc"} />
        <Text style={[styles.ContentsDataText, { marginLeft: 5 }]}>{seen}</Text>
      </View>
      {/* Comment count */}
      <View style={styles.IconView}>
        {/* <CommentOut color={Color.darkgrey} /> */}
        {source ? (
          <>
            <ProfileFillSvg height={17} width={17} fill={"#b8b8bc"} />
            <Text style={[styles.ContentsDataText, { marginLeft: 5 }]}>{source}</Text>
          </>
        ) : (
          <>
            <CommentsSvg height={17} width={17} stroke={"#b8b8bc"} />
            <Text style={[styles.ContentsDataText, { marginLeft: 5 }]}>{comments}</Text>
          </>
        )}
      </View>
      <View style={styles.IconView}>
        {owner_name ? (
          <>
            <ProfileFillSvg height={17} width={17} fill={"#b8b8bc"} />
            <Text style={[styles.ContentsDataText, { marginLeft: 5 }]}>{owner_name}</Text>
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1
  },
  CommentCount: {
    marginTop: 25,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20
  },
  CommentCountTex: {
    fontSize: 17,
    fontWeight: "bold",
    color: Color.PremiumTextColor,
    lineHeight: 22,
    fontFamily: Fonts.semibold
  },
  //  body styles news details
  ScrolView: {
    // marginTop: 10
  },
  Newsimage: {
    width: "100%",
    height: height * 0.25,
    borderRadius: 10,
    resizeMode: "cover",
    marginVertical: 5
  },
  NewsDescText: {
    fontSize: 17,
    color: Color.PremiumTextColor,
    marginTop: 10,
    lineHeight: 25,
    fontFamily: Fonts.regular,
    fontWeight: "400"
  },
  // comment input view

  IconBar: {
    flexDirection: "row",
    alignItems: "center"
  },

  ContentsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Color.PremiumTextColor,
    lineHeight: 30,
    marginVertical: 8,
    fontFamily: Fonts.semibold
  },
  ContentsDataView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 8,
    width: "80%"
  },
  ContentsDataText: {
    fontSize: 12,
    color: Color.darkgrey
  },
  IconView: {
    marginStart: horizontalScale(24),
    flexDirection: "row",
    alignItems: "center"
  }
});
