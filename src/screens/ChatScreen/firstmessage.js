import { View, TouchableWithoutFeedback, TextInput, Keyboard } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Translation } from "../../utils/Strings";
import { Button, LoadingModal, WarningModal } from "../../components";
import Network from "../../utils/Network";
import DatabaseManager from "../../utils/Storage";

export default function FirstMessage({ navigation, route }) {
  const [msg, setMsg] = React.useState(route.params.msg);
  const [loading, setLoading] = React.useState({ vis: false, msg: "" });
  const [warning, setWarning] = React.useState({ vis: false, msg: "", type: "alert" });
  const { colors } = useTheme();

  const handleSend = React.useCallback(async () => {
    setLoading({ vis: true, msg: Translation("sending_wait") });
    let response = await Network(
      "PARAG_OY",
      "POST",
      {},
      { post_nk: route.params.nk, send_to: route.params.send_to, msg: String(msg).trim() }
    );
    console.log(response);
    if (response.code == "1") {
      await DatabaseManager.setRoomId(route.params.nk, response.msg);
      setLoading({ vis: false, msg: "" });
      //setWarning({ vis: true, msg: "message sent", type: "success" }); //not working on ios 15 pro max 2023-10-29
      navigation.goBack();
    } else {
      setLoading({ vis: false, msg: "" });
      setWarning({ vis: true, msg: response.msg, type: "alert" });
    }
  }, [route.params, msg]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <TextInput
          style={{ borderWidth: 1, borderColor: colors.border, margin: 8, padding: 12, color: colors.text }}
          numberOfLines={4}
          autoCapitalize="none"
          placeholderTextColor={colors.grey}
          placeholder={Translation("Write the message here")}
          textAlignVertical={"top"}
          multiline={true}
          onChangeText={setMsg}
        >
          {msg}
        </TextInput>
        <LoadingModal visible={loading.vis} text={loading.msg} />
        <WarningModal
          visible={warning.vis}
          content={warning.msg}
          iconType={warning.type}
          buttonTile={Translation("ok")}
          buttonPress={() => navigation.goBack()}
        />
        <View
          style={{
            margin: 20
          }}
        >
          <Button title={Translation("send")} onPress={handleSend} style={{}} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
