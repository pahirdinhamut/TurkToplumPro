import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { useTheme } from "@react-navigation/native";
import { height, horizontalScale, verticalScale } from "../../utils/Spacing";
import Title from "../Title";
import Input from "../Input";
let combo = 1;
let comboScroll = 1;
function ComboBox(props) {
  const { colors, dark } = useTheme();
  const [suggest, setSuggest] = React.useState(false);
  const parentTextChange = props.onChangeText;
  //console.log("combo render: ", combo);
  combo++;
  const RenderSuggestions = (props) => {
    //console.log("combo suggession: ", comboScroll);
    comboScroll++;
    if (props.show) {
      return (
        <View
          style={{
            marginVertical: 8,
            marginHorizontal: 10,
            borderBottomWidth: 2,
            borderEndWidth: 2,
            borderStartWidth: 2,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            borderColor: colors.border,
            paddingBottom: 10,
            height: props.suggests.length === 0 ? 0 : props.suggests.length < 6 ? undefined : 200
          }}
        >
          <ScrollView nestedScrollEnabled={true} data={props.suggests}>
            {props.suggests.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: colors.modalBackground,
                  borderBottomWidth: 1,
                  borderBottomColor: "white",
                  marginBottom: 8,
                  padding: 8,
                  borderRadius: 10
                }}
                onPress={() => {
                  setSuggest(false);
                  props.onChoose(item);
                }}
              >
                <Text style={{ fontSize: 20, color: colors.grey }}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
    } else {
      return null;
    }
  };
  return (
    <View style={{ marginHorizontal: horizontalScale(10), marginBottom: verticalScale(10) }}>
      <Title title={props.label} required={props.required} />
      <Input
        viewStyle={{ marginBottom: 0 }}
        autoCorrect={false}
        value={props.value}
        placeholder={props.placeholder}
        numberOfLines={props.lines}
        keyboardType={props.keyboardType}
        placeholderTextColor={colors.text}
        onChangeText={(txt) => {
          parentTextChange(txt);
          if (txt) {
            setSuggest(true);
          } else {
            setSuggest(false);
          }
        }}
      />
      <RenderSuggestions show={suggest} suggests={props.suggests ? props.suggests : []} onChoose={props.onChoose} />
    </View>
  );
}
export default memo(ComboBox);
