import { RefreshControl, Text, FlatList, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Container, NoDataView } from "../../components";
import { useIsFocused, useTheme } from "@react-navigation/native";
import RoomItem from "./roomitem.jsx";
import Network from "../../utils/Network";
import DatabaseManager from "../../utils/Storage";
import { useAuth } from "../../context/AuthContex";
import { App, Translation } from "../../utils/Strings";
import PushNotification from "react-native-push-notification";
import { Decrypt } from "../../utils/utils";

export default function ChatScreen({ navigation }) {
  const [rooms, setRooms] = React.useState([]);
  const [nextPage, setNextPage] = React.useState(null);
  const [refresh, setRefresh] = React.useState(true);
  const [isLoad, setIsLoad] = React.useState(false);
  const [actionModal, setActionModal] = React.useState({ id: "", vis: false });
  const { colors } = useTheme();
  const { msgCount, checkUnseenMessages, user } = useAuth();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      PushNotification.cancelAllLocalNotifications();
      //PushNotification.getChannels((ids) => console.log("channel id list: ", ids));
      if (msgCount > 0) {
        checkUnseenMessages(true);
        request();
      }
    }
  }, [isFocused]);

  const request = React.useCallback(async (nxtPage, refresh = false) => {
    let response;
    if (nxtPage) {
      response = await Network("PARAG_OYLIRI", "GET", {}, {}, false, false, false, { state: true, url: nxtPage });
    } else {
      if (refresh) {
        response = await Network("PARAG_OYLIRI", "GET");
      } else {
        //let cached_messages = await DatabaseManager.getCache(App.chatrooms);
        //if (cached_messages) {
        //  console.log("get from cached messages");
        //  response = JSON.parse(cached_messages);
        //} else {
        response = await Network("PARAG_OYLIRI", "GET");
        //}
      }
    }
    if (response.code == "1") {
      setNextPage(response.nxt || null);
      setRooms(nxtPage ? [...rooms, ...response.msg] : response.msg);
    } else {
      setNextPage(null);
      setRooms([]);
    }
    //console.log(response);
    //setRooms(test_rooms);
    setRefresh(false);
    setIsLoad(false);
  }, []);

  React.useEffect(() => {
    request();
  }, []);

  const handleRoomPress = React.useCallback((key, sender, unread_count) => {
    navigation.navigate("ChatRoom", { room_id: key, title: sender, unseen_msg_count: unread_count });
    setRooms((prevRooms) => {
      // Create a new array with updated "seen" values
      return prevRooms.map((room) => {
        if (room.room_id === key) {
          return { ...room, unread_count: 0 };
        }
        return room;
      });
    });
  }, []);

  const on3DotsPress = React.useCallback(async (type, data) => {
    if (type === "Report") {
      navigation.navigate("Report", { type: 3, nk: data.roomid });
    } else if (type === "Delete") {
      Alert.alert(Translation("Hold on!"), Translation("Are you sure you want to delete this chat?"), [
        {
          text: Translation("Cancel"),
          onPress: () => null,
          style: "cancel"
        },
        {
          text: Translation("YES"),
          onPress: async () => {
            let response = await Network("PARAG_OY_OCHURUSH", "POST", {}, { chat_id: data.roomid });
            console.log(response);
            await DatabaseManager.deleteRoomId(data.roomid);
            request(false, true);
          }
        }
      ]);
    } else if (type === "Post") {
      navigation.navigate("Detail", { id: data.postkey, type: data.postype, newslike: false });
    }
  }, []);

  const renderRooms = ({ item, index }) => {
    return (
      <RoomItem
        roomId={item.room_id}
        senderName={item.send_to}
        lstDate={item.last_date}
        lstMsg={Decrypt(item.last_msg)}
        price={item.price}
        onPress={handleRoomPress}
        onModifyPress={on3DotsPress}
        unseenMsgCount={item.unread_count}
        nk={item.post_id}
        type={item.post_type}
        title={item.post_title}
        img={item.room_img}
      />
    );
  };

  return (
    <Container bcColor={colors.background}>
      <FlatList
        style={{ margin: 8 }}
        data={rooms} //{posts}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.room_id + index}
        ListEmptyComponent={() =>
          refresh ? (
            <></>
          ) : user.usertype == 2 ? (
            <Text style={{ alignSelf: "center", fontSize: 15, color: colors.text }}>
              {Translation("Please login to see chat messages!!!")}
            </Text>
          ) : (
            <NoDataView internet={false} />
          )
        }
        refreshControl={
          <RefreshControl
            colors={[colors.text, colors.primary]} //for android
            tintColor={colors.text} //for ios
            progressBackgroundColor={colors.modalBackground}
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              setNextPage(null);
              request(false, true);
            }}
          />
        }
        renderItem={renderRooms}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          if (nextPage && !isLoad) {
            setIsLoad(true);
            request(nextPage);
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
