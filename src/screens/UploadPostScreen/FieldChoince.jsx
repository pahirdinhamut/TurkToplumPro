import { View, Text } from "react-native";
import React, { memo } from "react";
import { Title, ChoiceInput } from "../../components";
import { height, horizontalScale, verticalScale } from "../../utils/Spacing";

function FieldChoince({ title, onPress, value, required }) {
  return (
    <View style={{ flex: 1, flexDirection: "column", marginHorizontal: horizontalScale(10), marginBottom: verticalScale(10) }}>
      <Title title={title} required={required} />
      <ChoiceInput onPress={onPress} value={value} />
    </View>
  );
}
export default memo(FieldChoince);
