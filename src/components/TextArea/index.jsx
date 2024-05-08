import React, { useRef } from "react";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
import { verticalScale } from "../../utils/Spacing";
import { normalize } from "../../utils/Size";
import { Color } from "../../utils/Strings";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function TextArea({
  desclength = 0,
  value,
  onChangeText,
  bcColor,
  borderColor = "#47474e",
  placeholder,
  ...props
}) {
  const ref = useRef(null);
  const { colors, dark } = useTheme();
  const handleFocus = () => {
    ref.current.focus();
  };

  return (
    <Container onPress={handleFocus} bcColor={colors.modalBackground} borderColor={borderColor}>
      <Input
        color={colors}
        ref={ref}
        maxLength={1500}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autonCompleteType="off"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={colors.grey}
        {...props}
      />
      {desclength.length > 0 && desclength.length < 300 && <TextMax>{desclength.length}/300</TextMax>}
    </Container>
  );
}

const Container = styled.Pressable`
  height: ${verticalScale(249)}px;
  width: 100%;
  border-width: 1px;
  border-color: ${(props) => props.borderColor};
  background-color: ${(props) => props.bcColor};
  border-radius: 10px;
  padding: ${verticalScale(10)}px;
  margin-bottom: 10px;
`;

const TextMax = styled.Text`
  font-size: ${normalize(12)}px;
  line-height: 14px;
  color: #8f8f8f;
  text-align: right;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const Input = styled.TextInput`
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => props.color.text};
  width: 100%;
  background-color: ${(props) => props.color.modalBackground};
`;
