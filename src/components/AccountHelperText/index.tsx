import React from "react";
import { Color, TextSize } from "../../utils/Strings";
import { Pressable, StyleSheet, Text } from "react-native";
import { normalize } from "../../utils/Size";

interface AccountHelperTextProps {
  text?: string;
  onPress?: () => void;
}

export default function AccountHelperText({ text, onPress }: AccountHelperTextProps): JSX.Element {
  return (
    <Pressable style={styles.HelperLabelContainer} onPress={onPress}>
      <Text style={styles.HelperLabel}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  HelperLabelContainer: {
    alignSelf: "flex-end",
    marginBottom: 30
  },
  HelperLabel: {
    color: Color.blue,
    fontSize: normalize(12),
    textAlign: "right"
  }
});
