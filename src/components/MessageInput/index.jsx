import { View, TouchableOpacity, Alert } from "react-native";
import React, { memo } from "react";
import { useTheme } from "@react-navigation/native";
import { SendFillSvg } from "../../components/svgComponents";
import { Input } from "../../components/";

function MessageInput({ onUploadPress, placeholderText = "Yorum yaz..." }) {
  const { colors } = useTheme();
  const [commentText, setCommentText] = React.useState("");
  const [inputHeight, setInputHeight] = React.useState(40);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 8
      }}
    >
      <View style={{ width: "80%", justifyContent: "center" }}>
        <Input
          placeholder={placeholderText}
          placeholderTextColor={colors.text}
          height={Math.max(inputHeight, 40)}
          value={commentText}
          multiline={true}
          maxLength={500}
          onContentSizeChange={(event) => {
            let newHeight = event.nativeEvent.contentSize.height;
            if (newHeight <= inputHeight && inputHeight === 40) {
              //condition just make this component render once at the begging
              //no this condition component will be rendered twice at the begging
              return;
            }
            if (newHeight < 90) {
              setInputHeight(newHeight);
            } else {
              setInputHeight(90);
            }
          }}
          onChangeText={(text) => {
            //   console.log(text);*/}
            setCommentText(text);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          if (commentText === "") {
            //Alert.alert("Yorum boş olamaz !");
            return;
          }
          onUploadPress(commentText);
          setCommentText("");
        }}
      >
        <SendFillSvg height={30} width={30} stroke={colors.text} />
      </TouchableOpacity>
    </View>
  );
}
export default memo(MessageInput);
