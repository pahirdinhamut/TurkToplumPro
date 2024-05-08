import React from "react";
import AccountHelperText from "../AccountHelperText";
import HSteck from "../HStack";
import VStack from "../VStack";
import { Entypo } from "@expo/vector-icons";
import styled from "styled-components/native";
import { normalize } from "../../utils/Size";

export default function Contrack() {
  const [isAgreed, setIsAgreed] = React.useState(false);
  return (
    <VStack>
      <HSteck>
        <Contaier onPress={() => setIsAgreed(!isAgreed)}>
          <HSteck>
            <CheckBox onPress={() => setIsAgreed(!isAgreed)}>{isAgreed && <Entypo name="check" size={normalize(11)} color="black" />}</CheckBox>
            <Title>içinde yer alan tüm beyanları kabul ediyorum</Title>
            <AccountHelperText text={"Kullanım Şartları"} />
          </HSteck>
        </Contaier>
      </HSteck>
    </VStack>
  );
}

const Contaier = styled.Pressable`
  flex-direction: row;
`;

const CheckBox = styled.View`
  width: 14px;
  height: 14px;
  border-width: 1px;
  border-color: #050640;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const Title = styled.Text`
  margin-right: 5px;
  font-size: ${normalize(12)}px;
`;
