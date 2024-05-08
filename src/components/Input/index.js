import React from "react";
import { height, verticalScale } from "../../utils/Spacing";
import { TextInput, View, StyleSheet, Pressable } from "react-native";
import { CancelSvg } from "../svgComponents";
import { useTheme } from "@react-navigation/native";
function Input({
  textcolor,
  error,
  bcColor,
  height,
  width,
  small,
  color,
  onClearBar = false,
  handleCancelPress,
  txtAlignVertical,
  ...props
}) {
  // current styles
  const { colors } = useTheme();
  const CurrentStyle = {
    width: small ? "49%" : width ? width : "100%",

    backgroundColor: colors.modalBackground,
    textColor: textcolor ? textcolor : colors.text
  };

  return (
    <View
      style={[
        styles.field,
        {
          ...props.viewStyle,
          width: CurrentStyle.width,
          borderWidth: 1,
          borderColor: error ? colors.errorBorderColor : colors.border,
          backgroundColor: CurrentStyle.backgroundColor,
          height: height ? height : verticalScale(50)
        }
      ]}
    >
      <TextInput
        style={[
          styles.textInput,
          {
            color: CurrentStyle.textColor,
            textAlignVertical: txtAlignVertical,
            backgroundColor: colors.modalBackground
          }
        ]}
        autoCapitalize="none"
        {...props}
        placeholderTextColor={colors.placeHolder}
      />
      {onClearBar && (
        <Pressable style={{ justifyContent: "center", marginRight: 10 }} onPress={handleCancelPress}>
          <CancelSvg height={18} width={18} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: verticalScale(10),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textInput: {
    width: "100%",
    height: "100%"
  }
});

export default Input;
