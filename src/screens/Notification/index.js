import { View, Text, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import React from "react";
import Network from "../../utils/Network";
import { timeStampHandler } from "../../utils/utils";
import { useTheme } from "@react-navigation/native";
import { NoDataView } from "../../components";

export default function NotificationScreen({ navigation }) {
  const { colors } = useTheme();
  const [notifications, setNotifications] = React.useState([]);
  const [refresh, setRefresh] = React.useState(true);

  const getNotifications = React.useCallback(async () => {
    //let response = await Network("UHTURUSHLAR", "GET", `${"1"}/`, {}, false, false, true);
    let response = await Network("UHTURUSHLAR", "GET");
    //console.log(response);
    if (response.code == "1") {
      setNotifications(response.msg);
    }
    setRefresh(false);
  }, []);

  React.useEffect(() => {
    getNotifications();
  }, []);
  const renderNotifications = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ marginHorizontal: 15, marginVertical: 5, borderRadius: 15, padding: 8, backgroundColor: colors.modalBackground }}
        activeOpacity={0.5}
        onPress={() => {
          const data = JSON.parse(item.data);
          if (data.TTID) {
            navigation.navigate("Detail", {
              id: data.TTID,
              type: data.TTTYPE,
              newslike: data.TTNEWSLIKE === "True" ? true : false
            });
          }
        }}
      >
        <Text style={{ color: colors.text }}>{item.title}</Text>
        <Text style={{ color: colors.text }}>{item.content}</Text>
        <Text style={{ color: colors.grey }}>{timeStampHandler(item.time_stamp)}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListEmptyComponent={() => (refresh ? <></> : <NoDataView internet={false} />)}
        refreshControl={
          <RefreshControl
            colors={[colors.text, colors.primary]} //for android
            tintColor={colors.text} //for ios
            progressBackgroundColor={colors.modalBackground}
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              //setNextPage(null);
              getNotifications();
            }}
          />
        }
        data={notifications}
        renderItem={renderNotifications}
      />
    </View>
  );
}
