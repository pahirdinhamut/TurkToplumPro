import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import React, { memo } from "react";
import { useTheme } from "@react-navigation/native";
import { Color, Fonts } from "../../utils/Strings";
import { width, height, verticalScale } from "../../utils/Spacing";
import { Container, HStack } from "../../components";
import { FlySvg, HaertSvg, CommentsSvg, BrokenHeartSvg } from "../../components/svgComponents";
import Icon from "react-native-vector-icons/AntDesign";
import { formatDateTime } from "../../utils/utils";

function CommentCard({
  owner_name,
  owner_logo,
  comment_date,
  comment,
  likes,
  subcomments,
  onCommentPress,
  onLikePress,
  onModifyPress,
  commentId,
  canSubComment = true,
  fullComment = false,
  isLiked = false
}) {
  const { colors } = useTheme();
  //"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  //console.log("comment card rendered ......................", commentId, owner_logo);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginVertical: 8,
        marginHorizontal: 10,
        backgroundColor: colors.modalBackground,
        borderRadius: 10
      }}
    >
      <TouchableOpacity
        activeOpacity={canSubComment ? 0.3 : 1}
        onPress={() => {
          if (onCommentPress) onCommentPress(owner_name, owner_logo, comment_date, comment, likes, isLiked, commentId);
        }}
        style={{ flex: 0.93 }}
      >
        <View
          style={{
            margin: 10,
            flexDirection: "row"
          }}
        >
          {/****************************************user icon logo****************************** */}
          <View style={{ flex: 0.12, marginEnd: 5 }}>
            <Image source={{ uri: owner_logo }} style={styles.commentHeaderUserProfile} resizeMode={"cover"} />
          </View>
          {/************************************************************************************* */}

          {/******************************user info comments like sub comment******************** */}
          <View style={{ flex: 1, flexDirection: "column", marginStart: 5, justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: 5 }}>
              <Text style={{ marginEnd: 5, color: colors.text, fontSize: 18, fontWeight: "400" }}>{owner_name}</Text>
              <Text style={{ marginStart: 5, fontSize: 10, color: colors.text }}>{formatDateTime(comment_date)}</Text>
            </View>

            <View style={{ marginTop: 5, marginBottom: 5 }}>
              <Text style={{ color: colors.text }} numberOfLines={fullComment ? 0 : 4}>
                {comment}
              </Text>
            </View>
            {/****************************** Like icon and subCommet icon is here******************** */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                borderTopWidth: 0.5,
                borderColor: Color.lightBorder,
                alignItems: "center",
                paddingTop: verticalScale(8),
                paddingBottom: verticalScale(10),
                marginVertical: verticalScale(10)
              }}
            >
              <TouchableOpacity style={{ marginEnd: 10 }} onPress={() => onLikePress(commentId, isLiked)}>
                <HStack>
                  <HaertSvg height={20} width={20} stroke={colors.text} fill={isLiked ? "red" : undefined} />
                  <Text style={{ marginStart: 5, color: colors.grey }}>{likes}</Text>
                </HStack>
              </TouchableOpacity>
              {canSubComment ? (
                <HStack>
                  <CommentsSvg height={20} width={20} stroke={colors.text} />
                  <Text style={{ marginStart: 5, color: colors.grey }}>{subcomments}</Text>
                </HStack>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.3} style={{ flex: 0.07, marginEnd: 10 }}>
        {/*************************************report comment or modify************************ */}
        <TouchableOpacity style={styles.dot} onPress={() => onModifyPress(commentId)}>
          <Icon name="ellipsis1" size={25} color={colors.text} />
        </TouchableOpacity>

        {/************************************************************************************* */}
      </TouchableOpacity>
    </View>
  );
}
export default memo(CommentCard);

const styles = StyleSheet.create({
  commentHeaderUserProfile: {
    height: 40,
    width: 40,
    borderRadius: 25
  }
});
