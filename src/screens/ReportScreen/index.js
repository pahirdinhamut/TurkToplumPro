import { View, Text, StyleSheet, TouchableOpacity, Keyboard, StatusBar, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useTheme } from "@react-navigation/native";
import { Button, LoadingModal, Input, TextArea, Title, WarningModal } from "../../components";
import Network from "../../utils/Network";
import { verticalScale, horizontalScale } from "../../utils/Spacing";
import { Color, Fonts, Translation } from "../../utils/Strings";
import { useAuth } from "../../context/AuthContex";

export default function ReportScreen({ navigation, route }) {
  const [reportType, setReportType] = React.useState(0);
  const { colors, dark } = useTheme();
  const [content, setContent] = React.useState("");
  const [options, setOptions] = React.useState(null);
  const [selectedOption, setSelectionOption] = React.useState(null);
  const [error, setError] = React.useState({ vis: false, msg: "" });
  const [loading, setLoading] = React.useState({ vis: false, msg: "" });
  const { user, isIos } = useAuth();

  const uploadReport = async () => {
    //**************************validation************************
    if (reportType == 0) {
      if (!content) {
        setError({ vis: true, msg: "Bu alanın doldurulması zorunludur!" });
        return;
      }
      setLoading({ vis: true, msg: Translation("Uploading...") });
      const response = await Network("MELUMQILISH", "POST", {}, { report_type: String(reportType), content: content });
      if (response.code == "1" || response.msg === "duplicated") {
        navigation.goBack();
        return;
      }
    } else if (reportType == 2 || reportType == 1 || reportType == 3) {
      if (!selectedOption) {
        setError({ vis: true, msg: "En az bir seçenek seçin!" });
        return;
      }
      setLoading({ vis: true, msg: Translation("Uploading...") });
      const response = await Network(
        "MELUMQILISH",
        "POST",
        {},
        { report_type: String(reportType), content: content, nk: route.params.nk, about: selectedOption.value }
      );
      if (response.code == "1" || response.msg === "duplicated") {
        navigation.goBack();
        return;
      }
      console.log(response);
    }
    setTimeout(
      () => {
        setLoading({ vis: false, msg: "" });
      },
      isIos ? 500 : 0
    );
  };

  const getOptions = async () => {
    const response = await Network("MELUMQILISH", "OPTIONS");
    if (response.actions && response.actions.POST) {
      console.log(response.actions.POST);
      const options = response.actions.POST.about.choices;
      //console.log(options);
      setOptions(options);
    }
    //console.log(response);
  };

  React.useEffect(() => {
    if (user.usertype == 2) {
      navigation.goBack();
      navigation.navigate("Login");
      return;
    }
    //[("0","Bug"),("1","Post"),("2","Comment")]
    setReportType(route.params.type);
    //setReportType(1);
    getOptions();
  }, [route]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <StatusBar backgroundColor={colors.background} barStyle={dark ? "light-content" : "dark-content"} />
        <LoadingModal visible={loading.vis} text={loading.msg} />
        <WarningModal visible={error.vis} content={error.msg} buttonPress={() => setError({ vis: false, msg: "" })} />
        {/* Content */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
            padding: 5
          }}
        >
          {reportType != 0 && options
            ? options.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.5}
                    style={[
                      styles.tagContainer,
                      {
                        backgroundColor:
                          selectedOption && selectedOption.value === item.value ? colors.modalBackground : colors.background,
                        borderColor: colors.border
                      }
                    ]}
                    onPress={() => {
                      setSelectionOption(item);
                    }}
                  >
                    <Text
                      style={[
                        styles.AddTagsTitle,
                        { color: selectedOption && selectedOption.value === item.value ? colors.text : colors.inActive }
                      ]}
                    >
                      {item.display_name}
                    </Text>
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
        <View style={{ felx: 1, margin: 8 }}>
          <Title
            title={"Şikayet/Geri bildirim"}
            style={{
              fontFamily: Fonts.medium,
              fontSize: 16
            }}
          />
          <TextArea
            bcColor={colors.background}
            placeholder={"Mesaj"}
            borderColor={Color.lightBorder}
            autoCorrect={true}
            value={content}
            multiline={true}
            keyboardType={"default"}
            textAlignVertical={"top"}
            onChangeText={setContent}
          />
        </View>
        <View style={{ margin: 25 }}>
          <Button title={"Gönder"} textColor={"white"} onPress={uploadReport} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  tagContainer: {
    height: horizontalScale(50),
    width: horizontalScale(110),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    margin: 5
  },
  AddTagsTitle: {
    fontFamily: Fonts.regular,
    fontSize: 16
  }
});
