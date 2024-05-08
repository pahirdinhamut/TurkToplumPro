import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, FlatList, RefreshControl } from "react-native";
import React from "react";
import { Button, Container, Input, NewsItem, SelectPayment, NoDataView } from "../../components";
import { App, Color } from "../../utils/Strings";
import { useTheme } from "@react-navigation/native";
import DatabaseManager from "../../utils/Storage";
import Network from "../../utils/Network";
import { useAuth } from "../../context/AuthContex";

export default function SavedPosts({ navigation }) {
  const { colors } = useTheme();
  const [favoriteList, setFavoriteList] = React.useState([]);
  const { updateUserProfile } = useAuth();
  const [refresh, setRefresh] = React.useState(true);
  const [isLoad, setIsLoad] = React.useState(false);
  const [nextPage, setNextPage] = React.useState(null);

  const getFavorites = async (nxt) => {
    if (isLoad) {
      console.log("loading man wait,,,,,,");
      return;
    }
    setIsLoad(true);
    let response;
    if (nxt) {
      response = await Network("POST_TIMIZLIK", "GET", {}, {}, false, false, false, { state: true, url: nextPage });
      if (response.code == "1") {
        console.log("liked post server side:", response.msg);
        for (let i = 0; i < response.msg.length; i++) {
          let li = response.msg[i];
          //console.log(li);
          await DatabaseManager.setLike(li.key, "1");
        }
        setFavoriteList([...favoriteList, ...response.msg]);
      }
    } else {
      //send the local liked list to the server
      let likeList = await DatabaseManager.getAllLikes();
      if (likeList && likeList.length > 0) {
        //console.log("local liked list", likeList);
        response = await Network("SAHLANGHANLAR", "POST", {}, { nk_list: likeList, type: "0" });
        //console.log("save like response: ", response);
        for (const el of likeList) {
          if (el.value === "0") {
            DatabaseManager.deleteLike(el.key);
          }
        }
      }
      // get the liked list from server
      response = await Network("POST_TIMIZLIK", "GET", { type: "1" });
      //console.log("liked post from server:", response);
      if (response.code == "1") {
        setNextPage(response.nxt || null);
        //console.log("liked post server side:", response.msg);
        for (let i = 0; i < response.msg.length; i++) {
          let li = response.msg[i];
          //console.log(li);
          await DatabaseManager.setLike(li.key, "1");
        }
        setFavoriteList(response.msg);
      }
    }
    setIsLoad(false);
    setRefresh(false);
  };

  const onlyonce = React.useCallback(async () => {
    await getFavorites();
    updateUserProfile(2);
  }, []);

  React.useEffect(() => {
    onlyonce();
  }, []);

  const handleNewsItemPress = React.useCallback((key, type, newslike) => {
    navigation.navigate("Detail", { id: key, type: type, newslike: newslike });
  }, []);

  const renderItem = ({ item, index }) => {
    {
      return (
        <NewsItem
          key={index}
          title={item.title}
          image={item.image_thumbnail}
          date={item.date}
          location={item.city}
          seen={String(item.seen)}
          price={getPrice(item.info)}
          nk={item.key}
          type={item.type}
          newslike={item.newslike}
          onPress={handleNewsItemPress}
          imgCount={item.tot_img}
        />
      );
    }
  };
  return (
    <View style={{ backgroundColor: colors.background, margin: 10 }}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[colors.text, colors.primary]} //for android
            tintColor={colors.text} //for ios
            progressBackgroundColor={colors.modalBackground}
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              setNextPage(null);
              getFavorites();
            }}
          />
        }
        ListEmptyComponent={() => (refresh ? <></> : <NoDataView internet={false} />)}
        data={favoriteList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (nextPage && !isLoad) {
            getFavorites(true);
          }
        }}
      />
    </View>
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
