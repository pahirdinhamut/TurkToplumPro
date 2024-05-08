import { View, Text } from "react-native";
import React, { memo } from "react";
import { Title, TextArea, Input } from "../../components";
import { Color, Translation } from "../../utils/Strings";
import { height, horizontalScale, verticalScale } from "../../utils/Spacing";

function FieldInput({ title, dark, value, onChange, kbType, lines, lineLen, required }) {
  if (value != null) {
    value = String(value);
  }
  return (
    <View style={{ marginHorizontal: horizontalScale(10) }}>
      <Title title={title} required={required} />

      {lines > 1 ? (
        <TextArea
          placeholder={Translation("Description")}
          borderColor={Color.lightBorder}
          autoCorrect={true}
          value={value}
          numberOfLines={10}
          multiline={true}
          keyboardType={"default"}
          textAlignVertical={"top"}
          onChangeText={onChange}
        />
      ) : (
        <Input
          autoCorrect={false}
          value={value}
          numberOfLines={500}
          multiline={false}
          keyboardType={kbType}
          txtAlignVertical={"center"}
          maxLength={lineLen ? lineLen : undefined}
          onChangeText={onChange}
          //onSelectionChange={(event) => {
          //  console.log(event.nativeEvent.selection.start, "ok selection change inputfield");
          //}}
        />
      )}
    </View>
  );
}
export default memo(FieldInput);
