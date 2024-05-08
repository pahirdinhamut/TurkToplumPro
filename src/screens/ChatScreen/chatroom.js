import { View, Text, FlatList, ActivityIndicator, AppState, Keyboard, Pressable, SafeAreaView } from "react-native";
import React from "react";
import { Container, Input, LoadingModal, MessageInput, ToastModal } from "../../components";
import { useTheme } from "@react-navigation/native";
import MessageItem from "./messageitem.jsx";
import { useAuth } from "../../context/AuthContex";
import Network from "../../utils/Network";
import { Encrypt, timeStampHandler, Decrypt } from "../../utils/utils";
import ChatSocket from "../../utils/ChatSocket";
import { Translation } from "../../utils/Strings";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ChatRoom({ navigation, route }) {
  const { colors } = useTheme();
  const ws = React.useRef(null);
  const flRef = React.useRef(null);
  const [chatHistory, setChatHistory] = React.useState([]);
  const { token, user, isIos } = useAuth();
  const [refresh, setRefresh] = React.useState(true);
  const [isLoad, setIsLoad] = React.useState(false);
  const [nextPage, setNextPage] = React.useState(null);
  const [kbHeight, setKbHeight] = React.useState(0);
  const [toastModal, setToastModal] = React.useState({ vis: false, msg: "" });
  const [socketStatus, setSocketStatus] = React.useState("Inactive"); //connected(active) a , //closed(inactive) i ,  //error e

  const getChatHistory = async (nxtPage) => {
    let response;
    if (nxtPage) {
      response = await Network("UQURLAR", "GET", {}, {}, false, false, false, { state: true, url: nxtPage });
    } else {
      response = await Network("UQURLAR", "GET", { room_id: route.params.room_id });
    }
    //console.log(response);
    //console.log(response.msg.length);

    if (response.code == "1") {
      setNextPage(response.nxt || null);
      if (nxtPage) {
        setChatHistory([...chatHistory, ...response.msg]);
      } else {
        setChatHistory(response.msg);
        if (route.params.unseen_msg_count) {
          setMessagesAsSeen();
        }
      }
    } else {
      console.log("error:", response);
    }
    setRefresh(false);
  };

  const setMessagesAsSeen = async () => {
    let response = await Network("KORULGEN_UCHURLAR", "POST", {}, { room_id: route.params.room_id });
    console.log("set unseen messages to seen: ", response);
  };

  React.useEffect(() => {
    //setChatHistory(data1);
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (e) => {
      setKbHeight(e.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKbHeight(0);
    });
    getChatHistory();
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      if (ws.current) {
        ws.current.closeSocket();
      }
    };
  }, []);

  //console.log(token);

  const handleReceiveMsg = React.useCallback(
    async (msg_obj) => {
      //setChatHistory([msg_obj, ...chatHistory]);
      setChatHistory((prevChatHistory) => [msg_obj, ...prevChatHistory]);
    },
    [chatHistory]
  );

  const ReportSocketStatus = React.useCallback(async (status) => {
    setSocketStatus(status);
  }, []);

  React.useEffect(() => {
    if (route.params) {
      navigation.setOptions({
        headerTintColor: colors.text,
        title: route.params.title,
        headerStyle: { borderBottomWidth: 1, borderColor: colors.border }
      });
      if (ws.current === null) {
        ws.current = new ChatSocket(
          token,
          route.params.room_id,
          route.params.title,
          user.username,
          handleReceiveMsg,
          ReportSocketStatus
        );
        ws.current.connect();
      }
    }
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        let colo = socketStatus === "a" ? "green" : socketStatus === "e" ? "yellow" : "red";
        return (
          <View style={{ flexDirection: "row", alignItems: "center", marginEnd: 15 }}>
            <Text style={{ color: colors.text }}>{socketStatus === "a" ? "Bağlandı " : "Bağlanmadı "}</Text>
            <Icon name="circle" size={16} color={colo} />
          </View>
        );
      }
    });
  }, [socketStatus]);

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "background") {
        ws.current.closeSocket();
      } else if (nextAppState === "active" && ws.current.isClosed()) {
        ws.current.connect();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const copyCallback = React.useCallback(() => {
    setToastModal({ vis: true, msg: Translation("text_copied") });
  });

  const renderHistory = ({ item, index }) => {
    return (
      <MessageItem
        isRight={item.send_to !== user.username}
        msg={Decrypt(item.text)}
        date={timeStampHandler(item.date)}
        copyCallback={copyCallback}
        seen={item.seen}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 8, backgroundColor: colors.modalBackground }}>
        <Text style={{ fontSize: 18, color: colors.text }}>{Translation("do not exchange sensitive information here")}</Text>
      </View>
      {refresh ? <ActivityIndicator size="large" color={colors.primary} /> : null}
      <FlatList
        ref={flRef}
        style={{ marginBottom: 8 }}
        data={chatHistory}
        renderItem={renderHistory}
        inverted={true}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          if (nextPage && !isLoad) {
            setIsLoad(true);
            getChatHistory(nextPage);
          }
        }}
      />
      <View style={{ marginBottom: isIos ? kbHeight : 0 }}>
        <MessageInput
          onUploadPress={(text) => {
            ws.current.sendMSG(JSON.stringify({ message: Encrypt(text), type: "chat" }));
          }}
          placeholderText={Translation("Message")}
        />
      </View>
      <ToastModal
        duration={1500}
        show={toastModal.vis}
        closeCallBack={() => setToastModal({ vis: false, msg: "" })}
        msg={toastModal.msg}
      />
    </SafeAreaView>
  );
}
