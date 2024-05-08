import React, { useCallback } from "react";
import { ScrollView, View, RefreshControl, SafeAreaView, Platform, StatusBar, Alert, Text } from "react-native";
import { AddTags, AddTagsTitle, Container } from "../../components";
import { horizontalScale, verticalScale } from "../../utils/Spacing";
import { useNavigation, useTheme } from "@react-navigation/native";
import Network from "../../utils/Network";
import { useAuth } from "../../context/AuthContex.js";
import { Translation } from "../../utils/Strings.js";
import { height } from "../../utils/Size";

export default function AddScreen() {
  const navigation = useNavigation();
  const { colors, dark } = useTheme();
  const { user, logoutUser } = useAuth();
  const [categoryTags, setCategoryTags] = React.useState([]);
  const [refresh, setRefresh] = React.useState(true);

  const handlePressTags = (title, category, categoryId) => {
    if (user.usertype === 2) {
      navigation.navigate("Login");
      return;
    }
    const tmpParams = { paramName: title, category: category, categoryId: categoryId, email: user.email };
    if (title.toLowerCase() === "market") {
      navigation.navigate("ProductList", tmpParams);
      return;
    } else {
      navigation.navigate("UploadPost", tmpParams);
    }
  };
  const requestCategoryApi = async () => {
    let response = await Network("ILAN_TURLER", "GET", { category: "house" });
    //console.log(response);
    if (response.code === "1") {
      let displayOrder = response.msg.display_order;
      let categories = [];
      for (let i = 0; i < displayOrder.length; i++) {
        let name = displayOrder[i];
        //because order is center if subtags are only 2 it will align them center
        //for prevent this behaviour add fake tags
        let subtags = response.msg[name];

        //const remainder = subtags.length % 3;
        //if (remainder === 1) {
        //  subtags.push({ id: "a1", name: "" });
        //  subtags.push({ id: "a2", name: "" });
        //} else if (remainder === 2) {
        //  subtags.push({ id: "a1", name: "" });
        //}

        categories.push({ title: Translation(name), uploadName: name, icon: name, id: i, subTags: subtags });
      }
      setCategoryTags(categories);
    } else if (response.code == "0" && response.msg === "relogin") {
      Alert.alert(Translation("relogin_title"), Translation("relogin_msg"), [
        {
          text: Translation("ok"),
          onPress: () => {
            logoutUser(true);
          }
        }
      ]);
    }
  };
  React.useEffect(() => {
    setRefresh(false);
  }, [categoryTags]);

  React.useEffect(() => {
    requestCategoryApi();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }}
    >
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} backgroundColor={colors.background} />
      <Container px={10}>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[colors.text, colors.primary]} //for android
              tintColor={colors.text} //for ios
              progressBackgroundColor={colors.modalBackground}
              refreshing={refresh}
              onRefresh={() => {
                setRefresh(true);
                requestCategoryApi();
              }}
            />
          }
        >
          {categoryTags.length > 0
            ? categoryTags.map((item, index) => {
                //console.log(item, item.subTags);
                return (
                  <View key={index} style={{ backgroundColor: colors.modalBackground, marginVertical: 5, borderRadius: 8 }}>
                    <AddTagsTitle title={item.title} icon={item.icon} id={item.id} />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexWrap: "wrap",
                        columnGap: 6,
                        rowGap: 6,
                        marginBottom: verticalScale(15)
                      }}
                    >
                      {item.subTags
                        ? item.subTags.map((tag, index) => {
                            return (
                              <AddTags
                                key={index}
                                label={tag.name}
                                onPress={() => handlePressTags(item.uploadName, tag.name, tag.id)}
                              />
                            );
                          })
                        : null}
                    </View>
                  </View>
                );
              })
            : null}
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}
