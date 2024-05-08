import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  RefreshControl,
  FlatList,
  Keyboard,
  SafeAreaView
} from "react-native";
import React, { useState } from "react";
import { BottomSheetModalView, Container, HStack, Input, Line, LoadingModal, MessageInput } from "../../components";
import { Fonts, Translation } from "../../utils/Strings";
import Icon from "react-native-vector-icons/AntDesign";
import { useTheme } from "@react-navigation/native";
import CommentCard from "./CommentCard";
import Network from "../../utils/Network.js";
import { useAuth } from "../../context/AuthContex";
import { DeleteSvg, ReportSvg } from "../../components/svgComponents";
import { horizontalScale } from "../../utils/Spacing";

export default function Comments({ navigation, route }) {
  const { colors, dark } = useTheme();
  const [comments, setComments] = useState([]);
  const { user, isIos } = useAuth();
  const [actionModal, setActionModal] = useState({ id: "", vis: false });
  const [commentNxtPage, setCommentNxtPage] = useState(null);
  const [refresh, setRefresh] = React.useState(true);
  const [isLoad, setIsLoad] = React.useState(false);
  const [loadingModal, setLoadingModal] = useState({ vis: false, msg: "" });
  const [kbHeight, setKbHeight] = useState(0);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (e) => {
      setKbHeight(e.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKbHeight(0);
    });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleOnPress = () => {
    navigation.goBack();
  };

  const reportHandler = async (commentID) => {
    navigation.navigate("Report", { type: 2, nk: commentID });
  };

  const requestCommentsNextPage = async () => {
    const endPoint = user.usertype == "2" ? "INKASLAR2" : "INKASLAR";
    const response = await Network(endPoint, "GET", {}, {}, false, false, false, { state: true, url: commentNxtPage });
    if (response.code === "1") {
      setComments([...comments, ...response.msg]);
    }

    setIsLoad(false);
    setRefresh(false);
  };

  const requestComments = async () => {
    const endPoint = user.usertype == "2" ? "INKASLAR2" : "INKASLAR";
    //type p(main) c(sub comment)
    //nk is the posts natural key
    const response = await Network(endPoint, "GET", { nk: route.params.nk, type: "p" });
    //console.log(response);
    if (response.code && response.code === "1") {
      //console.log(response.msg);
      setCommentNxtPage(response.nxt || null);
      setComments(response.msg);
    }

    setIsLoad(false);
    setRefresh(false);
  };

  const uploadComment = React.useCallback(async (text) => {
    setLoadingModal({ vis: true, msg: Translation("Uploading...") });

    const response = await Network("INKASLAR", "POST", { nk: route.params.nk }, { content: text });
    console.log(response);
    if (response.code && response.code === "1") {
      //console.log(response.msg);
    }
    setLoadingModal({ vis: false, msg: "" });
    requestComments();
  }, []);

  const handleDeleteComment = async (id) => {
    if (!id) return;
    const response = await Network("INKAS_OCHURUSH", "DELETE", `${id}/`, {}, false, false, true);
    console.log(response);
    if (response.code === "1") {
      setActionModal({ vis: false, id: "" });
      requestComments();
    }
  };

  const handleLikeComment = React.useCallback(async (id, value) => {
    // Check if the user is logged in (assuming the user object is available in the component)
    if (user.usertype === 2) {
      navigation.navigate("Login");
      return;
    }
    //value 1 to save the like, value 0 to delete the like
    if (!id) return;

    let val = value ? "0" : "1";
    //console.log(id, value, val, rootComment);
    // **************update local comment ****************************
    setComments((prevComments) => {
      const updatedComments = prevComments.map((com) => {
        if (com.id === id) {
          return { ...com, isLiked: !value };
        }
        return com;
      });
      return updatedComments;
    });

    //****************************************************************

    try {
      // Assuming the Network function handles the API request
      const response = await Network("SAHLANGHANLAR", "POST", {}, { nk_list: [{ id: id, value: val }], type: "1" });
      requestComments();

      console.log(response);
    } catch (error) {
      console.log("Error while processing the like:", error);
      // Handle the error if needed
    }
  }, []);

  const on3DotsPress = React.useCallback((commentId) => {
    setActionModal({ id: commentId, vis: true });
  }, []);

  const commnetPress = React.useCallback((name, thumbnail, comment_time, content, likes, isLiked, id) => {
    navigation.navigate("SubComments", {
      rootComment: {
        name: name,
        thumbnail: thumbnail,
        comment_time: comment_time,
        content: content,
        likes: likes,
        isLiked: isLiked,
        id: id
      },
      nk: route.params.nk
    });
  }, []);

  React.useEffect(() => {
    if (route.params && route.params.nk) {
      requestComments();
    }
  }, [route]);

  const renderComment = React.useCallback(
    ({ item, index }) => {
      return (
        <CommentCard
          key={index}
          commentId={item.id}
          owner_name={item.name}
          owner_logo={item.thumbnail} //{"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          comment_date={item.comment_time}
          comment={item.content}
          likes={item.likes}
          isLiked={item.isLiked}
          subcomments={item.sub_commnets}
          onCommentPress={commnetPress}
          onModifyPress={on3DotsPress}
          onLikePress={handleLikeComment}
        />
      );
    },
    [comments]
  );
  //animated={true} backgroundColor={colors.background}
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isIos ? (dark ? "light-content" : "dark-content") : dark ? "light-content" : "dark-content"} />

      <FlatList
        data={comments}
        renderItem={renderComment}
        refreshControl={
          <RefreshControl
            colors={[colors.text, colors.primary]} //for android
            tintColor={colors.text} //for ios
            progressBackgroundColor={colors.modalBackground}
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              setCommentNxtPage(null);
              requestComments();
            }}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (commentNxtPage && !isLoad) {
            setIsLoad(true);
            requestCommentsNextPage();
          }
        }}
      />

      <View style={{ marginBottom: isIos ? kbHeight : 0 }}>
        {user.usertype == 2 ? null : <MessageInput onUploadPress={uploadComment} />}
      </View>

      <LoadingModal visible={loadingModal.vis} text={loadingModal.msg} />

      <BottomSheetModalView
        data={[
          { name: Translation("Report"), icon: "flag", color: colors.text, action: "report" },
          { name: Translation("Delete"), icon: "delete", color: "red", action: "delete" }
        ]}
        open={actionModal.vis}
        closeCallBack={() => setActionModal({ id: "", vis: false })}
        snapPercents={["25%"]}
        renderItemFunc={(item, index) => {
          return (
            <View key={index} style={{ flex: 1, flexDirection: "column", margin: 8, padding: 10 }}>
              <TouchableOpacity
                style={{ marginStart: 5, flex: 1 }}
                onPress={() => {
                  if (item.action === "delete") {
                    handleDeleteComment(actionModal.id);
                  } else if (item.action === "report") {
                    reportHandler(actionModal.id);
                  }
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <View style={{ flexDirection: "row" }}>
                    {item.action === "delete" ? <DeleteSvg /> : <ReportSvg />}
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: item.color, marginStart: 8 }}>{item.name}</Text>
                  </View>
                  <Icon name={"right"} size={10} color={colors.text} />
                </View>
              </TouchableOpacity>
              <Line length={horizontalScale(300)} width={0.5} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // header container Style
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  HeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Fonts.semibold
  }
});
