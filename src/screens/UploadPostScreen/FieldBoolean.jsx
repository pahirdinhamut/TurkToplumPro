import { View, Switch } from "react-native";
import React, { memo } from "react";
import { height, horizontalScale, verticalScale } from "../../utils/Spacing";
import { Title } from "../../components";

function FieldBoolean({ value, title, onChange, required }) {
  //console.log(title, value);
  return (
    <View style={{ marginHorizontal: horizontalScale(10), marginBottom: verticalScale(20) }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Title title={title} required={required} />
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={"#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          value={value}
          onChange={onChange}
        />
      </View>
    </View>
  );
}
export default memo(FieldBoolean);
