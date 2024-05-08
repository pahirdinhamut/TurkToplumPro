import { Alert, StyleSheet, Text, View, RefreshControl, FlatList, ScrollView } from "react-native";
import React from "react";
import { Button, Container, NewsItem, SelectPayment } from "../../components";
import { App, Color } from "../../utils/Strings";
import { useTheme } from "@react-navigation/native";
import Network from "../../utils/Network";
import { useAuth } from "../../context/AuthContex";

export default function ModifyPostScreen({ navigation }) {
  const { colors } = useTheme();
  const [uploadedPosts, setUploadedPosts] = React.useState([]);
  const { updateUserProfile } = useAuth();
  const [nextPage, setNextPage] = React.useState(null);
  const [refresh, setRefresh] = React.useState(true);
  const [isLoad, setIsLoad] = React.useState(false);

  const getUploadedPosts = async (nxturl = false) => {
    let response;
    if (nxturl) {
      response = await Network("POST_TIMIZLIK", "GET", {}, {}, false, false, false, { state: true, url: nextPage });
    } else {
      response = await Network("POST_TIMIZLIK", "GET", { type: "2" });
    }
    if (response.code === "1") {
      console.log(response);
      setNextPage(response.nxt || null);
      setUploadedPosts(nxturl ? [...uploadedPosts, ...response.msg] : response.msg);
    }
  };
  React.useEffect(() => {
    if (uploadedPosts.length) {
      setIsLoad(false);
      setRefresh(false);
    }
  }, [uploadedPosts]);

  React.useEffect(() => {
    getUploadedPosts();
    updateUserProfile(1);
  }, []);

  const onModifyItemPress = React.useCallback((key, type, newslike) => {
    navigation.navigate("UploadPost", { paramName: type, modify: true, key: key, newslike: newslike });
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <NewsItem
        key={index}
        title={item.title}
        image={item.image_thumbnail}
        date={item.date}
        location={item.city}
        seen={String(item.seen)}
        price={getPrice(item.info)}
        comments={item.comments}
        nk={item.key}
        type={item.type}
        onPress={onModifyItemPress}
        imgCount={item.tot_img}
        newslike={item.newslike}
      />
    );
  };

  return (
    <Container bcColor={colors.background} px={10}>
      <FlatList
        data={uploadedPosts}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[colors.text, colors.primary]} //for android
            tintColor={colors.text} //for ios
            progressBackgroundColor={colors.modalBackground}
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              setNextPage(null);
              getUploadedPosts();
            }}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (nextPage && !isLoad) {
            setIsLoad(true);
            getUploadedPosts(true);
          }
        }}
      />
    </Container>
  );
}
const getPrice = (list) => {
  let price = "";
  if (!list) {
    return price;
  }
  list.forEach((item) => {
    if (item.icon == "price") {
      price = item.value;
    }
  });
  return price;
};
