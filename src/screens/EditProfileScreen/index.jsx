import { View, Text, Image, StyleSheet,Alert } from "react-native";
import React from "react";
import { Button, Container, Input, WarningModal } from "../../components";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import Network from "../../utils/Network";
import { useAuth } from "../../context/AuthContex";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Formik } from "formik"; //  contorl input forms
import * as Yup from "yup"; // contorl input forms validation
import { useTheme } from "@react-navigation/native";
import LoadingModal from "../../components/Modal/LoadingModal";
import { Color, Fonts, Translation } from "../../utils/Strings";
import { horizontalScale, verticalScale } from "../../utils/Spacing";

export default function EditProfileScreen() {
  const { updateUserProfile, user,isIos } = useAuth();
  const { dark, colors } = useTheme();
  const [uploading, setUploading] = React.useState(false);
  const [errorVis, setErrorVis] = React.useState({ vis: false, msg: "", typ: "alert", btnTitle: Translation("Try again") });

  const [imageData, setImageData] = React.useState("");

  const initialValues = {
    username: user.username,
    password1: "",
    password2: ""
  };

  const validation = Yup.object().shape({
    username: Yup.string().required(Translation("Username is required")),
    password1: Yup.string().oneOf([Yup.ref("password2"), null], Translation("Two passwords must match")),
    password2: Yup.string().oneOf([Yup.ref("password1"), null], Translation("Two passwords must match"))
  });

  const handleUploads = async (values) => {
    if (values.username === initialValues.username && values.password1 === initialValues.password1 && imageData === "") {
      return;
    }
    setUploading(true);
    let error_msg = "";
    if (imageData != "") {
      //console.log("image data not nullllllllllllllll");
      let result = await uploadImageApi(imageData.uri, imageData.fileName);
      if (!result.success) {
        error_msg += result.msg + "\n";
      }
    }
    if (values.username != initialValues.username) {
      let result = await changeUserNameApi(values.username);
      if (!result.success) {
        error_msg += result.msg + "\n";
      }
    }
    if (
      values.password1 != initialValues.password1 &&
      values.password2 != initialValues.password2 &&
      values.password1 === values.password2
    ) {
      let result = await changePassword(values);
      if (!result.success) {
        error_msg += result.msg + "\n";
      }
    }
    setUploading(false);
    console.log("error message is :", error_msg);
    if (error_msg != "") {
      //on ios when use multiple modals if the first one is not fully closed and second one
      //try to come up front it will not be showen due to ios settings but on android it is normal
      //so when there are multiple modals have to use setTimeout(wait for first modal to close) or
      //use native Alert.alert to substitute the second modal.(android is the best) noted: 2023/12/15
      setTimeout(() => {
        //Alert.alert("error",error_msg,[{text:Translation("Try again"),style:'cancel'}]);
        setErrorVis({ vis: true, msg: error_msg, typ: "alert", btnTile: Translation("Try again") });
      }, isIos? 500:0); //i dont like this 500 because we are not sure how long does ios take to close
                        //the first modal.(2023/12/15) change this to Alert.alert in the future.
      
    } else {
      setTimeout(() => {
        setErrorVis({ vis: true, msg: Translation("Profile updated successfully"), typ: "success", btnTitle: Translation("ok") });  
      }, isIos? 500:0); //same as up
    }
    updateUserProfile();
  };
  //console.log("main : ",errorVis);
  const changePassword = async (values) => {
    let response = await Network(
      "SHIFIR_YEGILSH",
      "POST",
      {},
      { new_password1: values.password1, new_password2: values.password2 }
    );
    console.log("password change response: ", response);
    if (response.detail && response.detail === "New password has been saved.") {
      return { success: true, msg: "ok" };
    }
    if (response.new_password2) {
      return { success: false, msg: response.new_password2 };
    }
    if (response.new_password2) {
      return { success: false, msg: response.new_password1 };
    }
    return { success: false, msg: "change password fail" };
  };

  const changeUserNameApi = async (new_name) => {
    let response = await Network("PROFIL_ISIM_YEGILASH", "POST", {}, { user_name: new_name });
    if (response.code == "1") {
      return { success: true, msg: "ok" };
    }
    console.log("upload username api: ", response);
    return { success: false, msg: response.msg };
  };

  const uploadImageApi = async (uri, name) => {
    //modificationCode 1:logo, 2:username,3:both
    let formData = new FormData();
    let match = /\.(\w+)$/.exec(name);
    let type = match ? `image/${match[1]}` : `image`;

    formData.append("logo", { uri: uri, name: name, type: type });

    let response = await Network("PROFIL_RESIM_YEGILASH", "POST", {}, formData, false, true);
    if (response.code == "1") {
      return { success: true, msg: "ok" };
    }
    console.log("upload image api: ", response);
    return { success: false, msg: response.msg };
  };

  const handleImagePicker = () => {
    let options = {
      mediaType: "photo",
      selectionLimit: 0,
      height: 200,
      width: 200,
      maxWidth: 800,
      maxHeight: 800,
      StorageOptions: {
        path: "images",
        mediaType: "photo",
        selectionLimit: 1,
        height: 200,
        width: 200
      }
    };
    //  launch Image labrary
    launchImageLibrary(options, (response) => {
      console.log("assests = ", response.assets);
      //console.log("Response = ", response);
      if (response.assets && response.assets.length > 0) {
        setImageData(response.assets[0]);
        //uploadImageApi(response.assets[0].uri, response.assets[0].fileName);
      }
    });
  };
  return (
    <Container>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleImagePicker}
        style={{
          marginVertical: verticalScale(15),
          alignSelf: "center",
          borderColor: colors.text,
          borderRadius: 100,

          shadowColor: Color.blue,
          shadowOffset: {
            width: 8,
            height: 8
          },
          shadowOpacity: 0.39,
          shadowRadius: 13,

          elevation: 13
        }}
      >
        <Image source={{ uri: imageData ? imageData.uri : user.logo }} style={{ width: 125, height: 125, borderRadius: 100 }} />
      </TouchableOpacity>
      <Formik initialValues={initialValues} onSubmit={handleUploads} validationSchema={validation}>
        {({ handleChange, handleSubmit, handleBlur, values, touched, isValid, errors }) => (
          <>
            <View style={{ marginHorizontal: horizontalScale(38) }}>
              {errors.username && touched.username && <Text style={styles.errorMsg}>{errors.username}</Text>}
              <Input
                placeholder="Kullanıcı adı"
                value={values.username}
                error={errors.username && touched.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
              />
            </View>

            <View style={{ marginHorizontal: horizontalScale(38), marginTop: 15 }}>
              {errors.password1 && touched.password1 && <Text style={styles.errorMsg}>{errors.password1}</Text>}
              <Input
                placeholder="Yeni şifre"
                value={values.password1}
                error={errors.password1 && touched.password1}
                onChangeText={handleChange("password1")}
                onBlur={handleBlur("password1")}
              />
            </View>

            <View style={{ marginHorizontal: horizontalScale(38), marginTop: 15 }}>
              {errors.password2 && touched.password2 && <Text style={styles.errorMsg}>{errors.password2}</Text>}
              <Input
                placeholder="Yeni şifre tekrar"
                value={values.password2}
                error={errors.password2 && touched.password2}
                onChangeText={handleChange("password2")}
                onBlur={handleBlur("password2")}
              />
            </View>
            <View
              style={{
                marginTop: 15,
                marginHorizontal: horizontalScale(38)
              }}
            >
              <Button title="Profili Güncelle" onPress={handleSubmit} style={{}} />
            </View>
          </>
        )}
      </Formik>
      <LoadingModal visible={uploading} text={Translation("uploading...")} />
      
      <WarningModal
        visible={errorVis.vis} 
        buttonTile={errorVis.btnTitle}
        buttonPress={() => setErrorVis({ vis: false, msg: "", typ: "alert", btnTitle: Translation("Try again") })}
        content={errorVis.msg}
        iconType={errorVis.typ}
      />
       
    </Container>
  );
}

const styles = StyleSheet.create({
  errorMsg: {
    color: "red",
    fontSize: 11,
    fontWeight: "300",
    marginVertical: 5
  }
});
