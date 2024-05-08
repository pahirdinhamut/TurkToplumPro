import { View, Text, StyleSheet, Pressable, Vibration, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { useTheme } from "@react-navigation/native";
import Clipboard from "@react-native-clipboard/clipboard";
import Icon from "react-native-vector-icons/Ionicons";

const radius = 15;

function MessageItem({ isRight, msg, date, copyCallback, seen }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onLongPress={() => {
        copyCallback();
        Clipboard.setString(msg);
        Vibration.vibrate(50);
      }}
    >
      <View style={{ marginHorizontal: 10, marginVertical: 8, alignItems: "flex-end" }}>
        <View style={[isRight ? styles.rightStyle : styles.leftStyle]}>
          <Text style={styles.message} numberOfLines={20}>
            {msg}
          </Text>
          <View style={{ flexDirection: "row", alignSelf: isRight ? "flex-end" : "flex-start", alignItems: "flex-end" }}>
            <Text style={{ fontSize: 12, marginTop: 8, color: "gray", marginEnd: 6 }}>{date}</Text>
            {isRight ? (
              seen ? (
                <Icon name="checkmark-done-sharp" color="gray" />
              ) : (
                <Icon name="checkmark-sharp" color="gray" />
              )
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default memo(MessageItem);

const styles = StyleSheet.create({
  message: {
    fontSize: 16,
    color: "#000000"
  },
  rightStyle: {
    marginStart: 70, //prevent message from taking up all sapce horizontally
    backgroundColor: "#ddf4fe",
    padding: 8,
    flexDirection: "column",
    borderTopEndRadius: radius,
    borderTopStartRadius: radius,
    borderBottomStartRadius: radius
  },
  leftStyle: {
    marginEnd: 70, //prevent message from taking up all sapce horizontally
    backgroundColor: "#f5f5f5",
    padding: 8,
    alignSelf: "baseline",
    flexDirection: "column",
    borderTopStartRadius: radius,
    borderTopEndRadius: radius,
    borderBottomEndRadius: radius
  }
});

/**
 *         <View
          style={{

          }}
        >
          <Text style={styles.message} numberOfLines={10}>
            {msg}
          </Text>
          <Text style={{ fontSize: 12, alignSelf: "flex-end", marginTop: 8, color: "gray" }}>{date}</Text>
          <Text style={{ fontSize: 12, alignSelf: "flex-end", color: "gray" }}>{seen ? "seen" : "delivered"}</Text>
        </View>
 */
