import { View, Text, StyleSheet, Alert, FlatList, RefreshControl } from "react-native";
import React from "react";
import Network from "../../utils/Network";
import { Container, NewsItem, NoDataView } from "../../components";
import { Color, Translation } from "../../utils/Strings";
import { useAuth } from "../../context/AuthContex";
import { useTheme } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
import NoInternet from "../../components/NoInternet/NoInternet";

export default function NewsLikeListPosts({ navigation, apiParams }) {
  const { location, logoutUser } = useAuth();
  const [apiPosts, setApiPosts] = React.useState([]); // api data
  const [refresh, setRefresh] = React.useState(true);
  const [isLoad, setIsLoad] = React.useState(false);
  const [nextPage, setNextPage] = React.useState(null);
  const [requestParams, setRequestParams] = React.useState("");
  const [noResult, setNoResult] = React.useState(false);
  const { colors, dark } = useTheme();

  const requestListPosts = async (nxt = false) => {
    let response;
    if (nxt) {
      response = await Network("MEZMUN_TIZIMLIKE", "GET", {}, {}, false, false, false, { state: true, url: nextPage });
    } else {
      clearStates();
      response = await Network("MEZMUN_TIZIMLIKE", "GET", requestParams);
    }
    //console.log("list post response: ", response.msg);
    if (response.code === "1") {
      setNextPage(response.nxt || null);
      let dataToSet = nxt ? [...apiPosts, ...response.msg] : response.msg;
      if (!dataToSet.length) {
        setNoResult(true);
        setApiPosts([]);
      } else {
        setNoResult(false);
        setApiPosts(dataToSet);
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
      setNoResult(true);
    }

    setIsLoad(false);
    setRefresh(false);
  };

  const clearStates = () => {
    setRefresh(true);
    setIsLoad(false);
    setNextPage(null);
    setApiPosts([]);
  };

  React.useEffect(() => {
    if (requestParams) {
      requestListPosts();
    }
  }, [requestParams]);

  React.useEffect(() => {
    if (Object.keys(apiParams).length) {
      if (!apiParams.category) {
        console.log("no category news", apiParams);
        return;
      }
      let newParams = "?country=" + location + "&";
      for (let key in apiParams) {
        if (Array.isArray(apiParams[key])) {
          let vals = apiParams[key];
          for (let i = 0; i < vals.length; i++) {
            newParams += key + "=" + vals[i] + "&";
          }
        } else {
          newParams += key + "=" + apiParams[key] + "&";
        }
      }
      //console.log("newParams: ", newParams);
      setRequestParams(newParams);
    }
  }, [apiParams, location]);
  const handleNewsItemPress = React.useCallback((key, type, newslike) => {
    navigation.navigate("Detail", { id: key, type: type, newslike: newslike });
  }, []);

  return (
    <Container bcColor={colors.background}>
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
              requestListPosts();
            }}
          />
        }
        ListEmptyComponent={() => (refresh ? <></> : <NoDataView internet={false} />)}
        data={apiPosts} //{posts}
        showsVerticalScrollIndicator={true}
        removeClippedSubviews={true}
        keyExtractor={(item, index) => item.key + index}
        renderItem={({ item, index }) => (
          <View key={index} style={[styles.NewsContainer, { backgroundColor: colors.background, shadowColor: colors.text }]}>
            <NewsItem
              title={item.title}
              image={item.image_thumbnail}
              date={item.date}
              seen={item.seen}
              comments={item.comments}
              nk={item.key}
              type={item.type}
              newslike={item.newslike}
              onPress={handleNewsItemPress}
            />
          </View>
        )}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          if (nextPage && !isLoad) {
            setIsLoad(true);
            requestListPosts(true);
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

const styles = StyleSheet.create({
  NewsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  }
});
