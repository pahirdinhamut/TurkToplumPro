import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Line,
  WithLogin,
  SpaceView,
  Input,
  AccountHelperText,
  WarningModal,
  LoadingModal
} from "../../components";
import { App, Color, Fonts, Translation } from "../../utils/Strings";
import { TouchableWithoutFeedback, Keyboard, StyleSheet, Text, View, Alert } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Formik } from "formik"; //  contorl input forms
import * as Yup from "yup"; // contorl input forms validation
import { useAuth } from "../../context/AuthContex";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import Network from "../../utils/Network";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { dark, colors } = useTheme();
  const [loadingModal, setLoadingModal] = useState({ vis: false, msg: "" });
  const { loginUser, loginUserErrorText, changeIsFirstLaunch, isFirstLaunch, user, updateToken, clearAlert, isIos } = useAuth();
  const [modalvis, setModalvis] = useState(false);

  const LoginFormValidation = Yup.object().shape({
    email: Yup.string().email("Geçersiz E-Mail").required("E-Mail alanı zorunludur"),
    password: Yup.string().required("Şifre alanı zorunludur")
  });

  const handleLogin = (values) => {
    setLoadingModal({ vis: true, msg: Translation("logging in...") });
    loginUser(values);
  };

  const handleClearAlert = () => {
    setModalvis(false);
    clearAlert();
  };

  useEffect(() => {
    //console.log("text is", loginUserErrorText, isFirstLaunch, user.usertype);
    setLoadingModal({ vis: false, msg: "ok" });
    if ((loginUserErrorText + "").startsWith("success")) {
      if (isFirstLaunch === "1") {
        changeIsFirstLaunch("0");
      }
      if (user.usertype === 1) {
        console.log("text is replace this screen");
        navigation.replace("MainScreen");
      }
    } else if (loginUserErrorText + "" !== "") {
      setTimeout(
        () => {
          setModalvis(true);
        },
        isIos ? 500 : 0
      );
    }
  }, [loginUserErrorText]);

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
        }
      })
      .catch((err) => {
        setLoadingModal({ vis: false, msg: "" });
        //setLoadingModal({ vis: true, msg: Translation("logging in...") });
        console.log("error logging in", err);
      });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <Container px={18} bcColor={colors.background}>
          {/* modal */}
          <WarningModal
            visible={modalvis}
            content={loginUserErrorText}
            buttonTile={Translation("Try Again")}
            buttonPress={handleClearAlert}
          />
          <LoadingModal visible={loadingModal.vis} text={loadingModal.msg} />
          {/* Form START */}
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleLogin} // data send to server
            validateOnMount={true}
            validationSchema={LoginFormValidation}
          >
            {({ handleChange, handleSubmit, handleBlur, values, touched, isValid, errors }) => (
              <View style={styles.Form}>
                <Input
                  color={colors}
                  placeholder="E-Posta"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  error={errors.email && touched.email}
                  placeholderTextColor={errors.email && touched.email ? "red" : Color.darkgrey}
                  textcolor={dark ? colors.text : Color.PremiumTextColor}
                />
                {errors.email && touched.email && <Text style={styles.errorMsg}>{errors.email}</Text>}
                <Input
                  color={colors}
                  placeholder="Şifre"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  error={errors.email && touched.email}
                  placeholderTextColor={errors.email && touched.email ? "red" : Color.darkgrey}
                  textcolor={dark ? colors.text : Color.PremiumTextColor}
                />
                {errors.password && touched.password && <Text style={styles.errorMsg}>{errors.password}</Text>}
                <AccountHelperText text="Şifremi unuttum" onPress={() => navigation.navigate("ForgetPassword")} />
                <Button title={"yap"} bcColor={Color.PremiumTextColor} textColor={colors.bcColor} onPress={handleSubmit} />
                <SpaceView marginvertical={3} />
                <Button
                  title={"Hemen hesap aç"}
                  textColor={colors.bcColor}
                  onPress={() => {
                    navigation.navigate("Register");
                  }}
                />
                <Line />
              </View>
            )}
          </Formik>
          {/* Form END */}
          {/* Auth0 */}
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
                        console.log("ERROR IS: " + JSON.stringify(e));
                        //for android needed sha for release on google api account
                        Alert.alert(JSON.stringify(e.message));
                      });
                  }
                })
                .catch((e) => {
                  console.log("ERROR IS: " + JSON.stringify(e));
                  Alert.alert(JSON.stringify(e.message));
                });
            }}
          />
          {/**<WithLogin
        text="Facebook ile giris yapin"
        svg="facebook"
        bordercolor={dark ? colors.border : Color.lightgrey}
        textcolor={dark ? colors.text : Color.PremiumTextColor}
        onPress={() => Alert.alert("Press Facebook")}
      /> */}
        </Container>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  Form: {
    marginTop: 50
  },
  errorMsg: {
    color: "red",
    fontSize: 11,
    fontWeight: "300",
    marginVertical: 5
  }
});
