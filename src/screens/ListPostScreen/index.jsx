import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import Network from "../../utils/Network";
import { Container, HeaderRightComponent, NewsItem } from "../../components";
import { App, Color, Translation } from "../../utils/Strings";
import NewsLikeListPosts from "./NewsLikePosts";
import MarketLikePosts from "./MarketLikePosts";
import DatabaseManager from "../../utils/Storage";

export default function ListPostScreen({ navigation, route }) {
  const [lpData, setLpData] = React.useState({ category: "" }); // list post data
  const [newslike, setNewsLike] = React.useState(true);
  const [isFiltered, setIsFiltered] = React.useState(false);

  const checkFilterExists = async () => {
    let filtersToSet = await DatabaseManager.getString(App.filters + route.params.category);
    //console.log(filtersToSet, orderToSet, "any exists");
    setIsFiltered(filtersToSet);
  };

  React.useEffect(() => {
    if (lpData.category) {
      updateHeaderRight();
    }
  }, [lpData, isFiltered]);

  const updateHeaderRight = () => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightComponent
          leftOnPress={() =>
            navigation.navigate("filter", {
              category: lpData.category
            })
          }
          rightOnPress={() => navigation.navigate("Search", { category: route.params.category })}
          isFilter={isFiltered}
        />
      )
    });
  };

  React.useLayoutEffect(() => {
    if (route.params) {
      let screenType = route.params.category ? route.params.category.toLowerCase() : null;
      if (
        screenType &&
        (screenType.includes("market") ||
          screenType.includes("house") ||
          screenType.includes("work") ||
          screenType.includes("promote"))
      ) {
        setNewsLike(false);
      }
      const filters = Object.keys(route.params);
      //console.log(filters, filters.length, lpData, "list post params");
      checkFilterExists();
      setLpData(route.params);
      navigation.setOptions({ headerTitle: Translation(screenType) });
    }
  }, [route, navigation]);

  return (
    <>
      {newslike && lpData.category ? (
        <NewsLikeListPosts navigation={navigation} apiParams={lpData} />
      ) : (
        <MarketLikePosts navigation={navigation} apiParams={lpData} />
      )}
    </>
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
