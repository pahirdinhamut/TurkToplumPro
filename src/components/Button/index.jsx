import { useTheme } from "@react-navigation/native";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text, ViewStyle, TouchableOpacity } from "react-native";
import { height, verticalScale } from "../../utils/Spacing";

function Button({ title, onPress, small, textColor, bgColor, brColor, children, style, bw, mt }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.ButtonContainer,
        {
          backgroundColor: bgColor ? bgColor : colors.PremiumTextColor,
          width: small ? "49%" : "100%",
          borderColor: brColor ? brColor : colors.primary,
          borderWidth: bw ? bw : 0,
          marginTop: mt ? mt : 0
        },
        style // Spread the additional style passed to the component
      ]}
    >
      {title ? (
        <Text
          style={[
            styles.Text,
            {
              color: textColor ? textColor : "white",
              textAlign: "center"
            }
          ]}
        >
          {title}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  ButtonContainer: {
    height: height * 0.06,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(5)
    //borderWidth: 1
  },
  Text: {
    fontWeight: "bold"
  }
});

export default Button;
