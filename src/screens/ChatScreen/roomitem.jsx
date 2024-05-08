import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { memo } from "react";
import { useTheme } from "@react-navigation/native";
import { height, normalize } from "../../utils/Size";
import { useAuth } from "../../context/AuthContex";
import Ionicons from "react-native-vector-icons/Ionicons";
import PopupMenu from "../../components/Modal/PopupMenu";
import { Translation } from "../../utils/Strings";
import { timeStampHandler } from "../../utils/utils";

function RoomItem({ roomId, senderName, lstDate, lstMsg, onPress, price, onModifyPress, unseenMsgCount, img, title, nk, type }) {
  const { colors } = useTheme();
  const { isIos } = useAuth();
  return (
    <View style={{ height: height * 0.09, flexDirection: "row", marginVertical: 5 }}>
      <TouchableOpacity style={{ flex: 0.95 }} activeOpacity={0.8} onPress={() => onPress(roomId, senderName, unseenMsgCount)}>
        <View style={{ flexDirection: "row" }}>
          {/**, borderBottomWidth: 0.5, borderBottomColor: colors.grey  */}
          {img ? (
            <View style={{ flex: 0.28 }}>
              <Image
                source={{ uri: img }}
                style={{ height: "100%", width: "100%", borderRadius: 10 }}
                resizeMode={isIos ? "cover" : "contain"}
              />
            </View>
          ) : null}
          <View style={{ flex: 0.65, flexDirection: "column", marginStart: 10, justifyContent: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: colors.text, marginBottom: 5, fontWeight: "bold" }} numberOfLines={1}>
                {senderName}
              </Text>
              {unseenMsgCount ? (
                <View
                  style={{
                    backgroundColor: "#2bbaf9",
                    borderRadius: 50,
                    padding: 3,
                    left: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 25,
                    height: 25
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      color: "white"
                    }}
                  >
                    {unseenMsgCount}
                  </Text>
                </View>
              ) : null}
            </View>
            {title ? (
              <Text style={{ color: colors.text }} numberOfLines={1}>
                {title}
              </Text>
            ) : null}
            {price ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="logo-euro" size={12} color={colors.primary} />
                <Text style={{ fontSize: 12, color: colors.primary, fontWeight: "bold" }}>{price}</Text>
              </View>
            ) : null}
            <View style={{ flexDirection: "row", width: "110%" }}>
              {lstDate ? <Text style={{ color: colors.text }}>{timeStampHandler(lstDate)}</Text> : null}
              {lstMsg ? (
                <Text style={{ color: colors.text, flex: 1.5 }} numberOfLines={1} ellipsizeMode="tail">
                  {" "}
                  - {lstMsg}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.3} style={{ flex: 0.05 }} onPress={() => onModifyPress(roomId)}>
        <PopupMenu
          customButton={<Ionicons name="ellipsis-vertical" size={18} color={colors.grey} />}
          destructiveIndex={1}
          options={[Translation("open post"), Translation("Report"), Translation("Delete"), Translation("Cancel")]}
          actions={[
            () => {
              onModifyPress("Post", { postkey: nk, postype: type });
            },
            () => {
              onModifyPress("Report", { roomid: roomId });
            },
            () => {
              onModifyPress("Delete", { roomid: roomId });
            }
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

export default memo(RoomItem);
