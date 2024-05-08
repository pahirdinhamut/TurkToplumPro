import React, { useEffect } from "react";
import { View, Share } from "react-native";
import NewsLike from "./NewsLike.jsx";
import MarketLike from "./MarketLike";
import { HeaderRightComponent } from "../../components";
import Network, { SeenCounter } from "../../utils/Network";
import DatabaseManager from "../../utils/Storage";
import { useTheme } from "@react-navigation/native";
import { App } from "../../utils/Strings.js";
import { useAuth } from "../../context/AuthContex.js";

function DetailScreen({ navigation, route }) {
  const { colors } = useTheme();
  const [detailOptions, setDetailOptions] = React.useState({ id: "", type: "", newsLike: null });
  const [saved, setSaved] = React.useState(null);
  const { user } = useAuth();

  //  header share icon press

  const handleShareClick = async () => {
    await Share.share(
      {
        message: `${App.base_url}/upload/view/${detailOptions.type}/${detailOptions.id}/${detailOptions.newsLike}/`,
        url: App.base_url
      },
      { dialogTitle: "Android Title" }
    )
      .then(({ action, activityType }) => {
        if (action === Share.sharedAction) {
          console.log("share success!!!");
        } else {
          console.log("share dissmissed!!!");
        }
      })
      .catch((error) => console.log(error)); //Alert(error.message)
  };

  // header favori icon press

  const handleLikeClick = () => {
    //console.log("onPress Like", saved);
    if (user.usertype == 2 || user.usertype == 0) {
      navigation.navigate("Login");
      return;
    }
    setSaved(!saved);
  };

  const seenCounter = async () => {
    await SeenCounter(detailOptions.id, 50);
  };

  useEffect(() => {
    const checkIfLiked = async () => {
      const like = await DatabaseManager.getLike(detailOptions.id);
      //console.log("like is like: ", like);
      if (like && like === "1") {
        setSaved(true);
      } else {
        setSaved(false);
      }
    };
    if (detailOptions.id != "") {
      checkIfLiked();
      const timeout = setTimeout(seenCounter, 5000);
      return () => {
        //console.log("seen cleared");
        clearTimeout(timeout);
      };
    }
  }, [detailOptions.id]);

  useEffect(() => {
    if (route.params) {
      setDetailOptions({ ...route.params, newsLike: route.params.newslike });
    }
  }, [route]);

  useEffect(() => {
    const saveData = async (val) => {
      await DatabaseManager.setLike(detailOptions.id, val);
      await Network("SAHLANGHANLAR", "POST", {}, { nk_list: [{ key: detailOptions.id, value: val }], type: "0" });
    };
    if (detailOptions.id != "" && saved !== null) {
      if (saved) {
        saveData("1");
      } else {
        saveData("0");
      }
    }

    navigation.setOptions({
      headerRight: () => (
        <HeaderRightComponent type="2" leftOnPress={handleShareClick} rightOnPress={handleLikeClick} saved={saved} />
      )
    });
  }, [detailOptions.id, saved]);

  return (
    <>
      {detailOptions.newsLike === null ? null : detailOptions.newsLike ? (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <NewsLike navigation={navigation} nk={detailOptions.id} pageName={detailOptions.type} />
        </View>
      ) : (
        <MarketLike navigation={navigation} nk={detailOptions.id} pageName={detailOptions.type} />
      )}
    </>
  );
}

export default DetailScreen;
