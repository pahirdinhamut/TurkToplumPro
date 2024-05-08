import React, { memo } from "react";
import { Color, Fonts } from "../../utils/Strings";
import { EyeSvg, CommentsSvg } from "../svgComponents";

import HStack from "../HStack";
import { useTheme } from "@react-navigation/native";
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { normalize } from "../../utils/Size";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { verticalScale } from "../../utils/Spacing";
import { useAuth } from "../../context/AuthContex";
import { formatDateTime } from "../../utils/utils";

type NewsItemProps = {
  title: string;
  onPress: (a?: string, b?: string, c?: string) => void;
  date?: string;
  seen?: string;
  comments?: string;
  image: string;
  customElement?: React.ReactNode;
  location?: string;
  price?: string;
  children?: Element[];
  nk?: string;
  type?: string;
  newslike?: string;
  imgCount?: number;
};

function NewsItem({
  title,
  onPress,
  date,
  seen,
  comments,
  image,
  customElement,
  location,
  price,
  children,
  nk,
  type,
  newslike,
  imgCount
}: NewsItemProps) {
  const { colors, dark } = useTheme();
  const { isIos, currency } = useAuth();
  //console.log("newsitem", nk);

  //console.log("image uzunluk", image.length);
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(nk, type, newslike)} activeOpacity={0.8}>
      {image ? ( //&& !image.includes("headers/no_image")?
        <View
          style={{
            flex: 0.5,
            position: "relative",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.background,
            backgroundColor: Color.grey
          }}
        >
          <Image source={{ uri: image }} style={styles.image} resizeMode={isIos ? "cover" : "contain"} />
          {/*  if type is product image length > 0 show image length */}
          {imgCount && imgCount > 0 ? (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: 5,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 4
              }}
            >
              <Feather name="camera" size={12} color={Color.white} />
              <Text style={{ color: "#fff", fontSize: 12 }}>{imgCount}</Text>
            </View>
          ) : null}
        </View>
      ) : null}
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {title}
        </Text>
        {location ? (
          <View
            style={{
              flex: 1,
              marginTop: verticalScale(5)
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
              <Ionicons name="location-outline" size={14} color={Color.grey} />
              <Text style={{ marginLeft: 5, fontSize: 12, color: Color.grey }}>{location}</Text>
            </View>
            {price ? (
              <View style={{ flexDirection: "row", alignItems: "center", marginStart: 3 }}>
                <Text style={{ color: Color.blue, fontSize: 15 }}>{currency}</Text>
                <Text style={{ marginLeft: 8, fontSize: 12, color: Color.blue, fontWeight: "bold" }}>{price}</Text>
              </View>
            ) : null}
          </View>
        ) : null}
        <View style={styles.ContentInfo}>
          {date ? (
            <View>
              <Text style={styles.infoText} numberOfLines={3}>
                {formatDateTime(date)}
              </Text>
            </View>
          ) : null}
          {seen ? (
            <HStack>
              <EyeSvg height={12} width={12} stroke={Color.grey} />
              <Text style={styles.infoText}>{seen}</Text>
            </HStack>
          ) : null}
          {comments ? (
            <HStack>
              <CommentsSvg height={12} width={12} stroke={Color.grey} />
              <Text style={styles.infoText}>{comments}</Text>
            </HStack>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(NewsItem);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    height: 95, //height * 0.128,
    flexDirection: "row",
    marginVertical: 5
  },
  // image container styles
  imageContainer: {
    flex: 0.9
  },

  image: {
    height: "100%",
    width: "100%",
    borderRadius: 10
  },
  // content container styles
  contentContainer: {
    flex: 1,
    marginStart: 10,
    justifyContent: "space-between"
    // paddingVertical: 5,
  },
  // title styles
  title: {
    fontSize: normalize(15),
    lineHeight: normalize(18),
    fontWeight: "600",
    fontFamily: Fonts.semibold,
    color: "#000",
    flexWrap: "wrap"
  },
  isDarkTitle: {
    color: "#fff"
  },
  // content info styles
  ContentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  // info text styles
  infoText: {
    fontSize: normalize(12),
    color: Color.grey,
    marginStart: 3
  }
});
