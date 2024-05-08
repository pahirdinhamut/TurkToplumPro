import React from "react";
import { Text, View, KeyboardAvoidingView, StyleSheet, Pressable, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Container, VStack, Input, Button, Line, WithLogin, WarningModal, ModalView, LoadingModal } from "../../components";
import { useNavigation, useTheme } from "@react-navigation/native";
import { App, Color, Translation } from "../../utils/Strings";
import { Formik } from "formik";
import * as Yup from "yup";
import { verticalScale } from "../../utils/Spacing";
import { SelecedSvg, SelectSvg } from "../../components/svgComponents";
import { useAuth } from "../../context/AuthContex";
import Network, { UserRegistration } from "../../utils/Network";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
const ORGINAL_MSG =
  "Size bir onay e-postası gönderiyoruz, lütfen onaylayın ve uygulamayı kapatmadan geri gelin, otomatik olarak giriş yapacaksınız.\n";
function RegisterScreen({ navigation }) {
  const { colors, dark } = useTheme();
  const { loginUser, isIos, updateToken } = useAuth();
  const [registerMessage, setRegisterMessage] = React.useState("");
  const [warningData, setWarningData] = React.useState({ vis: false, msg: "" }); //error warning modal
  const [loadingModal, setLoadingModal] = React.useState({ vis: false, msg: "" }); //login with google waiting modal
  const [selected, setSelected] = React.useState(false); //terms and services agreement
  const [resendVisible, setResendVisible] = React.useState(false); //registration successful and email sended modal
  const [credentials, setCredentials] = React.useState({ email: "", password: "" });
  const [sendCount, setSendCount] = React.useState(0);
  const [emailConfTitle, setEmailConfTitle] = React.useState(ORGINAL_MSG);

  const RegisterFormValidation = Yup.object().shape({
    username: Yup.string().required("Kullanıcı adı alanı zorunludur"),
    email: Yup.string().email("Geçersiz E-Mail").required("E-Mail alanı zorunludur"),
    password: Yup.string().required("Şifre alanı zorunludur")
  });

  const regitserUserApi = async (user) => {
    let clean_username = user.username.replaceAll(" ", "_");
    if (selected) {
      let response = await UserRegistration({
        username: clean_username,
        email: user.email,
        password1: user.password,
        password2: user.password
      });
      console.log("user register response: ", response);
      let email_error = response.email ? "❋ " + response.email[0] + "\n" : "";
      let username_error = response.username ? "❋ " + response.username[0] + "\n" : "";
      let password_error = response.password1 ? "❋ " + response.password1[0] : "";
      let message = email_error + username_error + password_error;
      if (response.code && response.code === "1") {
        setRegisterMessage("success");
        setSendCount(sendCount + 1);
        return;
      }
      setRegisterMessage(message);
    } else {
      setRegisterMessage(Translation("useconditions"));
    }
  };

  const email_resend = async () => {
    if (sendCount > 5) {
      return;
    }

    const response = await Network("KAYTA_EMAIL_YOLLASH", "POST", {}, { email: credentials.email }, true);
    console.log("resend response: ", response);
    let c = sendCount + 1;
    setSendCount(c);
    if (response.code && response.code == "1") {
      setEmailConfTitle(ORGINAL_MSG + c + "\\5 yeniden gönder.");
    }
  };

  const check_validation = async () => {
    if (registerMessage != "success") {
      return;
    }
    let response = await Network("EMAIL_ENIHLASH", "POST", {}, { email: credentials.email }, true);
    if (response.code && response.code == "1" && response.msg == "ok") {
      loginUser(credentials);
      navigation.replace("MainScreen");
    } else {
      console.log("registration confirm scrren response: ", response);
    }
  };
  //little problem(2023/12/11): when user close the success warning modal
  //and register another account and this account register succeeds
  //there will be no warning modal showed becasue of registerMessage="scuccess"
  //for react native registerMessage has not been changed
  React.useEffect(() => {
    const intervalId = setInterval(check_validation, 5000);
    if (registerMessage == "") {
      setWarningData({ vis: false, msg: "" });
    } else if (registerMessage != "success") {
      setWarningData({ vis: true, msg: registerMessage });
    } else if (registerMessage == "success") {
      setWarningData({ vis: false, msg: "" });
      setResendVisible(true);
    }
    return () => {
      clearInterval(intervalId);
      console.log("intercalid cleared");
    };
  }, [registerMessage]);

  const handleChacked = () => {
    setSelected(!selected);
  };

  /**when user uses google account to login set user token */
  const UpdateUserToken = React.useCallback((idToken, email) => {
    setLoadingModal({ vis: true, msg: Translation("logging in...") });
    Network("GOOGLE_LOGIN", "POST", {}, { idToken: idToken }, true)
      .then((response) => {
        if (response.code == "1") {
          //console.log(response.msg);
          updateToken(response.msg, email);
        } else {
          setLoadingModal({ vis: false, msg: "" });
          setWarningData({ vis: true, msg: response.msg });
        }
      })
      .catch((err) => {
        setLoadingModal({ vis: false, msg: "" });
        console.log("error logging in", err);
      });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Container px={38} bcColor={colors.background}>
          <WarningModal
            visible={warningData.vis}
            buttonPress={() => {
              setRegisterMessage("");
            }}
            content={warningData.msg}
            heightRate={0.26}
          />
          <LoadingModal visible={loadingModal.vis} text={loadingModal.msg} />
          <ModalView
            open={resendVisible}
            type={"success"}
            title={emailConfTitle}
            okButtonTitle={Translation("resend")}
            cancelButtonTitle={Translation("ok")}
            okButtonPress={() => {
              email_resend();
            }}
            cancelButtonPress={() => {
              setResendVisible(false);
              setRegisterMessage("");
              setSendCount(0);
            }}
          />
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: ""
            }}
            onSubmit={(values) => {
              setCredentials(values);
              if (values) {
                regitserUserApi(values);
                console.log("Register screen from data :", values);
                //navigation.navigate("Profiles");
              }
            }}
            validateOnMount={true}
            validationSchema={RegisterFormValidation}
          >
            {/* validation get set values */}
            {({ handleChange, values, errors, touched, handleSubmit, handleBlur }) => (
              <View style={styles.Form}>
                <VStack>
                  <Input
                    color={colors}
                    placeholder="Kullanıcı Adı"
                    value={values.username}
                    error={errors.username && touched.username}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    keyboardType={isIos ? "default" : "visible-password"} //android only
                  />
                  {errors.username && touched.username && (
                    <Text style={[styles.errorMsg, { color: Color.errorTextColor }]}>{errors.username}</Text>
                  )}
                  {/* {errors.country && errors.city && <Text style={styles.errorMsg}>Bu alanlari doldurunuz!</Text>} */}
                  <Input
                    color={colors}
                    placeholder="E-Posta"
                    value={values.email}
                    error={errors.email && touched.email}
                    onChangeText={handleChange("email")}
                    keyboardType="email-address"
                  />
                  {errors.email && touched.email && (
                    <Text style={[styles.errorMsg, { color: Color.errorTextColor }]}>{errors.email}</Text>
                  )}
                  <Input
                    isDark={dark}
                    color={colors}
                    placeholder="Şifre"
                    value={values.password}
                    error={errors.password && touched.password}
                    onChangeText={handleChange("password")}
                    secureTextEntry={true}
                  />
                  {errors.password && touched.password && (
                    <Text style={[styles.errorMsg, { color: Color.errorTextColor }]}>{errors.password}</Text>
                  )}
                </VStack>
                <View style={styles.HelperLabelContainer}>
                  <Pressable style={styles.Press} onPress={handleChacked}>
                    {/*<SelectSvg width={16} height={16} />*/}
                    {selected ? (
                      <SelecedSvg stroke={dark ? colors.text : Color.PremiumTextColor} width={16} height={16} />
                    ) : (
                      <SelectSvg stroke={dark ? colors.text : Color.PremiumTextColor} width={16} height={16} />
                    )}
                    {/* <SelecedSvg width={16} height={16} /> */}
                    <Text
                      style={[
                        styles.contract,
                        {
                          color: dark ? colors.text : Color.PremiumTextColor
                        }
                      ]}
                    >
                      Kullanım şartlarında yer alan tüm beyanları kabul ediyorum.
                    </Text>
                  </Pressable>
                  <Pressable style={styles.Press} onPress={() => navigation.navigate("UseTerms")}>
                    <Text style={styles.Link}>Kullanım Şartları</Text>
                  </Pressable>
                </View>
                <Pressable style={{ marginBottom: 10 }} onPress={() => navigation.navigate("ResendVerification")}>
                  <Text style={styles.Link1}>Kayıt işlemini tamamladınız fakat doğrulama e-postası henüz gelmediyse, doğrulama için buraya tıklayın</Text>
                </Pressable>
                {/* <Text>bu alanlari doldurun</Text> */}
                {/*<SpaceView marginvertical={3} />*/}
                <Button title="Kayıt ol" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
          <Line />
          <WithLogin
            text="Google ile giriş yapın"
            svg="google"
            bordercolor={dark ? colors.border : Color.lightgrey}
            textcolor={dark ? colors.text : Color.PremiumTextColor}
            onPress={() => {
              GoogleSignin.configure({
                webClientId: App.webClientId,
                iosClientId: App.iosClientId,
                androidClientId: App.androidClientId
              });

              GoogleSignin.hasPlayServices()
                .then((hasPlayService) => {
                  if (hasPlayService) {
                    GoogleSignin.signIn()
                      .then((userInfo) => {
                        //console.log(userInfo.email);
                        //console.log(JSON.stringify(userInfo));
                        UpdateUserToken(userInfo.idToken, userInfo.user.email);
                      })
                      .catch((e) => {
                        console.log("google login err: " + e);
                      });
                  }
                })
                .catch((e) => {
                  console.log("google login playservice err: " + e);
                });
            }}
          />
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  Form: {
    marginTop: verticalScale(50)
  },
  errorMsg: {
    color: "red",
    fontSize: 10,
    fontWeight: "300",
    marginBottom: 10
  },
  HelperLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  Press: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  contract: {
    fontSize: 9,
    marginLeft: 2
  },
  Link: {
    fontSize: 10,
    fontWeight: "300",
    color: Color.blue,
    marginLeft: 2
  },
  Link1: {
    fontSize: 12,
    fontWeight: "300",
    color: Color.blue,
    marginLeft: 2
  },
  Box: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: Color.PremiumTextColor,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default RegisterScreen;
