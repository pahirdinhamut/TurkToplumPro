import React from "react";
import { Color, Fonts, Translation } from "../../utils/Strings";
import ModalView from ".";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import Button from "../Button";

export default function WarningModal({ visible, content, buttonTile, buttonPress, iconType = "alert" }) {
  buttonTile = buttonTile ? buttonTile : Translation("Try Again");
  const { colors } = useTheme();
  //console.error(visible,content);
  return (
    <ModalView open={visible} type={iconType}>
      <View>
        <Text
          style={{
            marginVertical: 20,
            fontFamily: Fonts.semibold,
            letterSpacing: 0.5,
            fontSize: 18,
            textAlign: "center",
            color: colors.text
          }}
        >
          {content}
        </Text>
        <Button
          textColor={"white"}
          title={buttonTile}
          onPress={() => {
            buttonPress();
          }}
        />
      </View>
    </ModalView>
  );
}
