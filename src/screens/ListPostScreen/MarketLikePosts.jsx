import { View, Text, StyleSheet, Alert, RefreshControl, FlatList } from "react-native";
import React from "react";
import Network from "../../utils/Network";
import { Container, NewsItem, NoDataView } from "../../components";
import { Color, Translation } from "../../utils/Strings";
import { useAuth } from "../../context/AuthContex";
import { useTheme } from "@react-navigation/native";

export default function MarketLikePosts({ navigation, apiParams }) {
  const { location, logoutUser } = useAuth();
  const [apiPosts, setApiPosts] = React.useState([]); // api data
  const [refresh, setRefresh] = React.useState(true);
  const [isLoad, setIsLoad] = React.useState(false);
  const [nextPage, setNextPage] = React.useState(null);
  const [requestParams, setRequestParams] = React.useState("");
  const [noResult, setNoResult] = React.useState(false);

  const { colors } = useTheme();

  const requestListPosts = async (nxt = false) => {
    let response;
    if (nxt) {
      response = await Network("MEZMUN_TIZIMLIKE", "GET", {}, {}, false, false, false, { state: true, url: nextPage });
    } else {
      clearStates();
      response = await Network("MEZMUN_TIZIMLIKE", "GET", requestParams);
      console.log(response.code);
    }
    if (response.code === "1") {
      setNextPage(response.nxt || null);
      //console.log(response.msg);
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
  /**
  React.useEffect(() => {
    if (apiPosts.length > 0) {
      setIsLoad(false);
      setRefresh(false);
    }
    if (noResult) {
      setIsLoad(false);
      setRefresh(false);
    }
  }, [apiPosts]);
 */
  const clearStates = () => {
    setRefresh(true);
    setIsLoad(false);
    setNextPage(null);
    setApiPosts([]);
  };

  React.useEffect(() => {
    if (requestParams) {
      console.log(requestParams, "reuqest parems present");
      requestListPosts();
    }
  }, [requestParams]);

  React.useEffect(() => {
    if (Object.keys(apiParams).length) {
      if (!apiParams.category) {
        console.log("no category", apiParams);
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
      //console.log(apiParams, "api params are");
      //console.log("new and old Params: ", newParams, requestParams);
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
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        keyExtractor={(item, index) => item.key + index}
        renderItem={({ item, index }) => (
          <View key={index} style={[styles.NewsContainer, { backgroundColor: colors.background, shadowColor: colors.text }]}>
            <NewsItem
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
          </View>
        )}
        onEndReachedThreshold={0.5}
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

const styles = StyleSheet.create({
  NewsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  }
});
