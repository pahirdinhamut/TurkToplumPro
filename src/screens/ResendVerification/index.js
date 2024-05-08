import { Text, View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, Input, LoadingModal, WarningModal } from "../../components";
import { useTheme } from "@react-navigation/native";
import { Color, Fonts, Translation } from "../../utils/Strings";
import Network from "../../utils/Network.js";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { openInbox } from "react-native-email-link";
import { EmailCheckSvg } from "../../components/svgComponents";
import { useAuth } from "../../context/AuthContex";

function ResendVerification() {
  const { colors, dark } = useTheme();
  const [loading, setLoading] = React.useState({ vis: false, msg: Translation("sending_wait") });
  const { isIos } = useAuth();

  const [modalInfo, setModalInfo] = React.useState({
    vis: false,
    buttonName: "ok",
    content: "",
    type: "alert"
  });
  const emailInitial = { email: "" };
  const validation = Yup.object().shape({
    email: Yup.string().email("Geçersiz E-Mail").required("E-Mail alanı zorunludur")
  });

  const ResnedVerificationEmail = async (email) => {
    setLoading({ ...loading, vis: true });
    const response = await Network("KAYTA_EMAIL_YOLLASH", "POST", {}, { email: email }, true);
    console.log("reset password screen: ", response);
    setLoading({ vis: false, msg: "" });
    if (response.code) {
      if (response.code === "0") {
        //handle error
        if (response.email) {
          Alert.alert(response.email);
          //setModalInfo({ vis: true, buttonName: Translation("try again"), content: response.email, type: "alert" });
        } else if (response.msg) {
          Alert.alert(response.msg);
          //setModalInfo({ vis: true, buttonName: Translation("try again"), content: response.msg, type: "alert" });
        }
        return;
      }
      // handle success
    }

    setTimeout(
      () => {
        setModalInfo({
          vis: true,
          buttonName: Translation("open_email"),
          content: Translation("resend_success"),
          type: "success"
        });
      },
      isIos ? 500 : 0
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View
          style={{
            width: 140,
            height: 140,
            borderRadius: 20,
            backgroundColor: dark ? Color.darkgrey : Color.white,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
          }}
        >
          <EmailCheckSvg width={100} height={100} />
        </View>
        <Text
          style={{
            fontSize: 26,
            color: dark ? Color.white : Color.black,
            margin: 10,
            textAlign: "center",
            letterSpacing: 0.2,
            fontWeight: "bold"
          }}
        >
          E-postanızı kontrol ediniz !
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: dark ? Color.white : Color.black,
            textAlign: "center",
            marginVertical: 20,
            lineHeight: 22,
            fontFamily: Fonts.semibold,
            fontWeight: "600"
          }}
        >
          E-posta adresinizi girip gönder butonuna tıkladıktan sonra, e-posta adresinize yeni e-posta doğrulama adresini
          göndereceğiz.
        </Text>

        <LoadingModal visible={loading.vis} text={loading.msg} />

        <WarningModal
          visible={modalInfo.vis}
          buttonTile={modalInfo.buttonName}
          iconType={modalInfo.type}
          content={modalInfo.content}
          buttonPress={() => {
            setModalInfo({ ...modalInfo, vis: false, content: "we send" });
            openInbox({
              message: "Whatcha wanna do?",
              cancelLabel: "Go back!"
            }).catch((err) => {
              console.log("open main inbox error: ", err);
            });
          }}
        />
        <Formik
          initialValues={emailInitial}
          validationSchema={validation}
          onSubmit={(values) => {
            ResnedVerificationEmail(values.email);
          }}
        >
          {({ handleChange, values, errors, touched, handleSubmit, handleBlur }) => (
            <>
              <Input
                isDark={dark}
                color={colors}
                placeholder="E-Posta"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                borderColor={errors.email && touched.email ? Color.errorTextColor : Color.darkgrey}
                value={values.email}
                error={errors.email && touched.email}
                textcolor={dark ? colors.text : Color.PremiumTextColor}
              />
              {errors.email && touched.email && (
                <Text style={[styles.errorMsg, { color: Color.errorTextColor }]}>{errors.email}</Text>
              )}
              <View style={styles.sendBtn}>
                <Button title="Gönder" textColor={Color.white} onPress={handleSubmit} />
              </View>
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ResendVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    paddingHorizontal: 10
  },
  headerText: {
    fontSize: 27
  },
  sendBtn: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 15,
    height: 50,
    width: "100%"
  }
});
