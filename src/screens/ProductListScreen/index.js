import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Color, Fonts } from "../../utils/Strings";
import Network from "../../utils/Network";
import { Container, Input } from "../../components";

export default function ProductListScreen({ navigation, route }) {
  const [category, setCategory] = React.useState({ category: "", paramName: "", categoryId: "", email: "" });
  const [productList, setProductList] = React.useState([]); //[{id:1,name:"car"},{id:2,name:"laptop"}]
  const { colors, dark } = useTheme();

  const requestList = async () => {
    if (category.categoryId) {
      let response = await Network("BAZAR_MEHSULAT", "GET", { id: category.categoryId });
      //console.log(response);
      if (response.results) {
        setProductList(response.results);
      }
    }
  };
  const handleChoosenItem = (item) => {
    navigation.replace("UploadPost", {
      paramName: category.paramName,
      category: item.name,
      categoryId: item.id,
      product: item.id,
      email: category.email
    });
  };

  React.useEffect(() => {
    requestList();
  }, [category]);

  React.useLayoutEffect(() => {
    let category = "";
    if (route.params) {
      setCategory(route.params);
      category = route.params.category;
    }
    navigation.setOptions({ headerTintColor: dark ? colors.text : Color.PremiumTextColor, title: category });
  }, [navigation, route]);

  return (
    <Container>
      <ScrollView>
        {productList
          ? productList.map((item, index) => (
              <View key={index} style={{ margin: 8, backgroundColor: colors.modalBackground, borderRadius: 8 }}>
                <TouchableOpacity style={{ padding: 15 }} onPress={() => handleChoosenItem(item)}>
                  <Text style={{ fontSize: 20, color: colors.text }}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            ))
          : null}
      </ScrollView>
    </Container>
  );
}
