import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { CheckBoxEmpSvg, CheckBoxSvg } from "../svgComponents";
import { width } from "../../utils/Size";
import { Color, Fonts } from "../../utils/Strings";
import { check } from "prettier";
import { useTheme } from "@react-navigation/native";

/**
 *
 * @param {String} title   title of check box
 * @param {Boolean} isCheck  check box is check or not
 * @param {Function} setIsCheck  set check box is check or not
 * @param {Function} onPress  on press function
 *
 * @returns
 */

export default function CheckBoxItem({ title, isCheck, setIsCheck, onPress, CheckItemData, checkBoxVisible }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        alignItems: "center",
        marginVertical: 8,
      }}
    >
      {/* check box container View */}
      <Pressable
        onPress={onPress}
        style={[
          styles.checkBoxContainer,
          {
            justifyContent: checkBoxVisible ? "space-between" : "center",
            width: checkBoxVisible ? width / 1.8 : width / 4
          }
        ]}
      >
        {/* Check label Title */}
        <Text style={[styles.checkBoxLebel, { color: colors.text, textTransform: "capitalize" }]}>{title}</Text>
        {/* check box box */}
        {checkBoxVisible && <View>{isCheck ? <CheckBoxSvg height={18} width={18} stroke={colors.text} /> : <CheckBoxEmpSvg height={18} width={18} stroke={colors.text} />}</View>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  checkBoxContainer: {
    width: width / 1.8,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.7,
    borderBottomColor: Color.darkgrey
  },
  checkBoxLebel: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: Fonts.regular,
    letterSpacing: 0.5
  }
});
