import {
  Alert,
  StyleSheet,
  Text,
  View,
  BackHandler,
  StatusBar,
  RefreshControl,
  SafeAreaView,
  FlatList,
  Platform
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { Container, Input, NewsItem, NoDataView } from "../../components";
import { useNavigation, useTheme } from "@react-navigation/native";
import { height, width } from "../../utils/Spacing";
import { CancelSvg, TimeSvg } from "../../components/svgComponents";
import Entypo from "react-native-vector-icons/Entypo";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import DatabaseManager from "./../../utils/Storage";
import Network from "../../utils/Network";
import { useNetInfo } from "@react-native-community/netinfo";
import { normalizeL } from "../../utils/Size";
import { Fonts } from "../../utils/Strings";
import { useAuth } from "../../context/AuthContex";

export default function SearchScreen({ route }) {
  const { colors, dark } = useTheme();
  const [keyword, setKeyword] = React.useState("");
  const [searchHistory, setSearchHistory] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [renderName, setRenderName] = React.useState("h");
  const [noResult, setNoResult] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const netInfo = useNetInfo();
  const { isIos, location } = useAuth();
  const navigation = useNavigation();

  const DeleteSelectedHistory = async (selectedWord) => {
    try {
      await DatabaseManager.deleteHistory(selectedWord);
      await GetSearchHistory();
    } catch (error) {
      console.log("delete search history: ", error);
    }
  };

  const SetSearchHistory = async () => {
    try {
      await DatabaseManager.setHistory(keyword);
      // Clear the keyword input field
    } catch (error) {
      console.log("set search history: ", error);
    }
  };

  const searchText = async (kw) => {
    setSearching(true);
    let params = { search: kw, country: location };
    if (route.params && route.params.category) {
      params.category = route.params.category;
    }
    const response = await Network("IZDESH", "GET", params);
    //console.log("search results: ", response);
    if (response.code === "1") {
      if (!response.msg.length) {
        setNoResult(true);
        setSearchResults([]);
      } else {
        setNoResult(false);
        setSearchResults(response.msg);
      }
      setRenderName("s");
    }
  };

  const GetseachFromHistory = async (value) => {
    try {
      //let setString = await DatabaseManager.getAllByType("search_history");
      //console.log("okkkkkkkkkkkkkkkkkkkkkk,", setString);

      let existingHistory = await DatabaseManager.seachFromHistory(value);
      let history = [];

      if (existingHistory) {
        // If there is existing search history, parse it from JSON and add the new keyword
        existingHistory.forEach((obj) => {
          history.push(obj.value);
        });
      }
      setSearchHistory(history);
    } catch (error) {
      console.log("get search history: ", error);
      setSearchHistory([]);
    }
  };

  const GetSearchHistory = async () => {
    try {
      //let setString = await DatabaseManager.getAllByType("search_history");
      //console.log("okkkkkkkkkkkkkkkkkkkkkk,", setString);

      let existingHistory = await DatabaseManager.getAllHistory();
      let history = [];

      if (existingHistory) {
        // If there is existing search history, parse it from JSON and add the new keyword
        existingHistory.forEach((obj) => {
          history.push(obj.value);
        });
      }
      setSearchHistory(history);
      console.log(history);
    } catch (error) {
      console.log("get search history: ", error);
      setSearchHistory([]);
    }
  };
  React.useEffect(() => {
    setSearching(false);
    GetSearchHistory();
    const handleBackPress = () => {
      //console.log("back pressed", renderName, searchResults.length);
      if (renderName === "h" && searchResults.length > 0) {
        setRenderName("s");
        return true;
      }
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => backHandler.remove();
  }, [route, searchResults, renderName]);

  const renderHistory = ({ item, index }) => {
    return (
      <View key={index} style={[styles.historyRow, { borderColor: "#F5F5F5" }]}>
        <View style={{ flex: 1, marginEnd: 8 }}>
          <TouchableOpacity
            style={styles.historyClickRow}
            onPress={() => {
              //navigation.navigate("SearchResult", { searchWord: word });
              setKeyword(item);
              searchText(item);
              setRenderName("s");
            }}
          >
            <View style={styles.textIcon}>
              <TimeSvg size={15} style={{ marginRight: 10 }} stroke={colors.text} fill={colors.background} />
              <Text
                style={{ color: colors.text, fontFamily: Fonts.medium, letterSpacing: 0.41, lineHeight: 22, fontWeight: "500" }}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.deleteIcon} activeOpacity={0.85} onPress={() => DeleteSelectedHistory(item)}>
          <Entypo name="cross" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
    );
  };

  const searchResultPress = React.useCallback((key, type, newslike) => {
    navigation.navigate("Detail", { id: key, type: type, newslike: newslike });
  }, []);

  const renderSearchResult = ({ item, index }) => {
    console.log(item);
    return (
      <NewsItem
        key={index}
        title={item.kw}
        image={item.image_thumbnail}
        onPress={searchResultPress}
        nk={item.nk}
        type={item.type}
        newslike={item.newslike}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isIos ? (dark ? "light-content" : "dark-content") : dark ? "light-content" : "dark-content"} />
      <View
        style={{
          marginTop: isIos ? 0 : StatusBar.currentHeight,
          width: "100%",
          backgroundColor: dark ? "#000" : "#fff",
          height: height * 0.08,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#aeaeae",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2
        }}
      >
        <TouchableOpacity
          style={{
            marginHorizontal: width * 0.01
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name={"left"} size={normalizeL(24)} color={colors.text} />
        </TouchableOpacity>
        <View
          style={{
            width: width - 55,
            alignItems: "center",
            marginTop: 10
          }}
        >
          <Input
            height={height * 0.055}
            placeholder={"Bir şeyler ara"}
            returnKeyType="search"
            value={keyword}
            onChangeText={(text) => {
              setKeyword(text);
              GetseachFromHistory(text);
              if (renderName === "s") {
                setRenderName("h");
                setNoResult(false);
              }
            }}
            maxLength={50}
            onSubmitEditing={() => {
              if (keyword.length > 0) {
                SetSearchHistory();
                //navigation.navigate("SearchResult", { searchWord: keyword });
                searchText(keyword);
              }
            }}
          />
        </View>
        {/*<TouchableOpacity>*/}
        {/*  <Entypo name={"cross"} size={normalizeL(22)} color={colors.text} />*/}
        {/*</TouchableOpacity>*/}
      </View>
      <Container bcColor={dark && colors.background} style={{ margin: 10 }}>
        {netInfo.isConnected ? (
          <FlatList
            data={renderName === "h" ? searchHistory : searchResults}
            renderItem={renderName === "h" ? renderHistory : renderSearchResult}
            ListEmptyComponent={() => (noResult ? <NoDataView activeRetry={false} internet={false} /> : null)}
            refreshControl={
              <RefreshControl
                colors={[colors.text, colors.primary]} //for android
                tintColor={colors.text} //for ios
                progressBackgroundColor={colors.modalBackground}
                refreshing={searching}
              />
            }
          />
        ) : (
          <NoDataView activeRetry={false} />
        )}
      </Container>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  HeaderSearchView: {
    width: width - 45,
    marginTop: 5
  },
  textIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
    //borderWidth: 2
  },
  deleteIcon: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10
  },
  historyRow: { flexDirection: "row", justifyContent: "space-between", padding: 8, borderBottomWidth: 1, alignItems: "center" },

  historyClickRow: {
    marginEnd: 20,
    padding: 9
  }
});
