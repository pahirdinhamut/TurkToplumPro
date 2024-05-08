import { View, Text, SafeAreaView, BackHandler, Alert, StatusBar } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { height, horizontalScale, verticalScale } from "../../utils/Spacing";
import { Color, Fonts, Translation } from "../../utils/Strings";
import Network, { LocationSuggesions } from "../../utils/Network";
import { BottomSheetModalView, Button, LoadingModal, UploadImageView, ToastModal } from "../../components";
import { useAuth } from "../../context/AuthContex";
import ComboBox from "../../components/ComboBox/ComboBox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FieldBoolean from "./FieldBoolean";
import FieldInput from "./FieldInput";
import FieldChoince from "./FieldChoince";

export default function UploadPostScreen({ navigation, route }) {
  const { colors, dark } = useTheme();
  const [bsOpen, setBsOpen] = React.useState(false); // used for choice fields bottomSheetModal visibility
  const [choiceField, setChoiceField] = React.useState([]); // when bottomSheetModal opened this is the choice options
  const [selectedChoice, setSelectedChoice] = React.useState(null); //when user choosed from B.S.M. this is the callback
  const [loading, setLoading] = React.useState({ vis: false, msg: "Loading please wait..." }); // first enter the screen and uploading contents to the api
  //substitute by alert because on ios multiple modal gives error for more details see editprofile screen
  //const [errorVis, setErrorVis] = React.useState({ vis: false, msg: "", title: Translation("try again"), iconType: "alert" }); // waningmodal used in validation process
  const [fields, setFields] = React.useState([]); // all the shown and compilted fields
  const [screenData, setScreenData] = React.useState({ category: "", paramName: "", categoryId: "" });
  const [images, setImages] = React.useState([]);
  const [serverImages, setServerImages] = React.useState([]);
  const [toast, setToast] = React.useState({ color: "green", msg: Translation("success"), vis: false }); //when toast gone upload screen will backed(navigation.goback())
  const { location, isIos } = useAuth();
  //const [newslike, setNewslike] = React.useState(false);
  const [autoCompleteText, setAutoCompleteText] = React.useState(null);
  const [suggestions, setSuggestions] = React.useState(null);
  const [coordinate, setCoordinate] = React.useState({ lat: "", lon: "" });
  const [requesting, setRequesting] = React.useState(false); //this state prevent user to making multiple request by clicking too fast on newsitem

  const uploadOptionsApi = async () => {
    if (requesting) {
      //console.log("loading..............................................");
      return;
    }
    setRequesting(true);
    let response = await Network("ILAN_BERISH", "OPTIONS", { category: screenData.paramName });
    try {
      let mainFieldObjs = response.actions.POST;
      const fields = []; //[{type:boolean,label:balcony,upload_name:"balcony",upload_value:"use selected value"},{},{}]
      collectFields(mainFieldObjs, fields);
      //console.log(mainFieldObjs.work.children.salary);
      if (screenData.modify) {
        response = await Network("POST_TEHRIRLESH", "GET", `${screenData.key}/`, {}, false, false, true);
        let uploadedImages = [];
        if (!response.code) {
          fillUpdatedPostValues(fields, response, screenData.paramName);
          setCoordinate({ lat: response.latitude, lon: response.longitude });
          if (!response.header_image.endsWith("no_image.png")) {
            const urlParts = response.header_image.split("/");
            const imageName = urlParts[urlParts.length - 1];
            uploadedImages.push({ uri: response.header_image, fileName: imageName });
          }
        } else if (response.code && response.code == 0) {
          setLoading({ vis: false, msg: response.msg });
          setToast({ vis: true, msg: response.msg, color: "red" });
          return;
        }
        response = await Network("ILAN_RASIMLIRI", "GET", { nk: screenData.key });
        if (response.results && response.results.length > 0) {
          response.results.forEach((obj) => {
            const urlParts = obj.image.split("/");
            const imageName = urlParts[urlParts.length - 1];
            uploadedImages.push({ uri: obj.image, fileName: imageName });
          });
        }
        setServerImages(uploadedImages);
        //console.log(response);
      } else {
        fillUpObviousFields(fields, screenData);
      }

      //console.log(fields);
      setFields(fields);
    } catch (err) {
      console.log("uploadOptions api error:", err);
    }
    //console.log(fields);
    setLoading({ vis: false, msg: "" });
    setRequesting(false);
  };

  const handlePreview = React.useCallback(() => {
    navigation.navigate("Detail", { id: screenData.key, type: screenData.paramName, newslike: screenData.newslike });
  }, [screenData]);

  const handleDelete = React.useCallback(() => {
    Alert.alert(Translation("Hold on!"), Translation("Are you sure you want to delete this post?"), [
      {
        text: Translation("Cancel"),
        onPress: () => null,
        style: "cancel"
      },
      {
        text: Translation("YES"),
        onPress: async () => {
          let response = await Network("POST_TEHRIRLESH", "DELETE", `${screenData.key}/`, {}, false, false, true);
          if (response.code == "1") {
            navigation.goBack();
          }
        }
      }
    ]);
  }, [screenData.key]);

  const handleUpload = async () => {
    if (loading.vis) return;

    setLoading({ vis: true, msg: Translation("Uploading...") });

    //validation
    //upload contents
    //upload header image if exists
    //upload other images if exists

    /*******************************Validation************************************/
    let emailOrPhoneSet = false;
    let validated = true;
    for (let i = 0; i < fields.length; i++) {
      let obj = fields[i];

      if (obj.required && !obj.upload_value) {
        UserAlert("[" + obj.label + "] zorunludur");
        //setErrorVis({ ...errorVis, vis: true, msg: "Alan [" + obj.label + "] zorunludur" });
        validated = false;
        break;
      }
      if (obj.upload_name.toLowerCase() === "email" && obj.upload_value) {
        emailOrPhoneSet = true;
      }
      if (obj.upload_name.toLowerCase() === "phone" && obj.upload_value) {
        emailOrPhoneSet = true;
      }
      if (obj.upload_name.toLowerCase() === "city") {
        //check if the city name is valid
        let result = await LocationSuggesions("q", obj.upload_value);
        console.log(result, "result location is");
        if (result.length === 0) {
          UserAlert("Şehir adı geçerli değil, açılır menüden seçilmelidir");
          //setErrorVis({ ...errorVis, vis: true, msg: "Şehir adı geçerli değil, açılır menüden seçilmelidir" });
          validated = false;
          break;
        }
      }
    }
    if (!validated) {
      setLoading({ vis: false, msg: "" });
      return;
    }
    if (!emailOrPhoneSet) {
      if (screenData.paramName.toLowerCase() != "community") {
        UserAlert(Translation("email_phone_required"));
        //setErrorVis({ ...errorVis, vis: true, msg: Translation("email_phone_required") });
        setLoading({ vis: false, msg: "" });
        return;
      }
    }
    if (coordinate.lat === "" || coordinate.lon === "") {
      UserAlert("Şehir adı geçerli değil, açılır menüden seçilmelidir");
      //setErrorVis({ ...errorVis, vis: true, msg: "Şehir adı geçerli değil, açılır menüden seçilmelidir" });
      setLoading({ vis: false, msg: "" });
      return;
    }
    /**************************************************************************************/

    /***********************************Create PostData************************************/

    let upload_data = {};

    fields.forEach((obj) => {
      const isChoiceType = obj.type.toLowerCase() === "choice";
      const choice = isChoiceType ? obj.choices.find((choice) => choice.display_name === obj.upload_value) : null;
      const val = isChoiceType ? (choice ? choice.value : null) : obj.upload_value;

      if (obj.has_parent) {
        upload_data[obj.parent_name] = { ...upload_data[obj.parent_name], [obj.upload_name]: val };
        //console.log("has parent: ", upload_data[obj.parent_name]);
      } else {
        upload_data[obj.upload_name] = val;
      }
      //console.log(coordinate, "this is the coordinate");
      upload_data["latitude"] = coordinate.lat;
      upload_data["longitude"] = coordinate.lon;
    });

    console.log("upload data is:", upload_data);
    /****************************************************************************************/

    /***************************************Upload post**************************************/
    let response = "";
    if (screenData.modify) {
      response = await Network("POST_TEHRIRLESH", "PUT", `${screenData.key}/`, upload_data, false, false, true);
      //console.log("api modify post response: ", response);
    } else {
      response = await Network("ILAN_BERISH", "POST", { category: screenData.paramName }, upload_data);
      //console.log("api upload response: ", response);
    }

    if (response.code == "1") {
      /***********************************Upload header image***************************************/
      let nk = response.msg;
      let imgCount = images.length;
      let imgFailmsg = "";
      if (imgCount > 0) {
        setLoading({ vis: true, msg: Translation("Uploading images") });
        const formData = setImageToForm(images[0]);
        response = await Network("ILAN_BASH_RESIM", "POST", { nk: nk }, formData, false, true);
        console.log("header image reponse:", response);
        if (response.code == "0") {
          if (response.msg) {
            imgFailmsg += "1. resim" + response.msg + "\n";
          } else if (response.image) {
            imgFailmsg += "1. resim" + response.image + "\n";
          }
        }
        /*****************************************************************************************/

        /******************************upload other images****************************************/
        for (let i = 1; i < imgCount; i++) {
          let uindx = i + 1; //for user first image is second
          const imageForm = setImageToForm(images[i]);
          imageForm.append("index", i);
          response = await Network("ILAN_RASIMLIRI", "POST", { nk: nk }, imageForm, false, true);
          console.log("images response:", response);
          if (response.code == "0") {
            if (response.msg) {
              imgFailmsg += uindx + ". resim" + response.msg + "\n";
            } else if (response.image) {
              imgFailmsg += uindx + ". resim" + response.image + "\n";
            }
          }
          setLoading({ vis: true, msg: `Resim \n ${i} / ${imgCount - 1} yükleniyor` });
        }
        /***************************************************************************************/
      }
      setLoading({ vis: false, msg: "" });
      if (imgFailmsg !== "") {
        UserAlert(imgFailmsg, "Gönderiniz yüklendi, ancak aşağıdaki hata nedeniyle bazı resimler silindi");
        //setErrorVis({ ...errorVis, vis: true, msg: imgFailmsg, iconType: "alert", title: Translation("try again") });
      }
      //navigation.goback() called in toast view
      setTimeout(
        () => {
          setToast({ ...toast, vis: true });
        },
        isIos ? 500 : 0
      );

      return;
    } else {
      /** if the post upload unsuccessfull show the error no need to upload the photos */
      console.log("showing error:", response);
      UserAlert(response.msg);
      //setErrorVis({ ...errorVis, vis: true, msg: String(response) });
    }
    /****************************************************************************************/

    setLoading({ vis: false, msg: "" });
  };

  React.useEffect(() => {
    if (screenData.paramName !== "") {
      setLoading({ vis: true, msg: Translation("Loading please wait...") });
      uploadOptionsApi();
    }
  }, [screenData]);

  React.useEffect(() => {
    const handleBackPress = () => {
      if (bsOpen) {
        setBsOpen(false);
        return true;
      }
      if (userCanExit(fields, screenData) && images.length <= 0) {
        console.log(setScreenData);
        navigation.goBack();
        return true;
      }
      Alert.alert(Translation("Hold on!"), Translation("upload_goback"), [
        {
          text: Translation("Cancel"),
          onPress: () => null,
          style: "cancel"
        },
        { text: Translation("YES"), onPress: () => navigation.goBack() }
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => backHandler.remove();
  }, [fields, images, bsOpen]);

  React.useLayoutEffect(() => {
    let category = "";
    if (route.params) {
      setScreenData({ ...route.params, country: location });
      category = route.params.category;
      if (route.params.modify) {
        category = Translation("Update");
      }
    }
    console.log(route.params, "route param upload post");
    navigation.setOptions({ headerTintColor: colors.text, title: category });
  }, [navigation, route]);

  const handleFieldChange = (field, default_value, updated_value, byname = false) => {
    //if (typeof default_value === "string") default_value = String(default_value).trim();
    //if (typeof updated_value === "string") updated_value = String(updated_value).trim();
    const newFields = fields.map((f) => {
      let condition = f.label === field.label && f.upload_name === field.upload_name;
      if (byname) {
        condition = f.upload_name === field;
      }
      if (condition) {
        return { ...f, upload_value: f.upload_value === null ? default_value : updated_value };
      }
      return f;
    });
    setFields(newFields);
  };

  /** if i handle this method inside selectcallback(<Bottomsheetmodalview /> )
   * it wont get the updated value after user choosed the value
   * */
  React.useEffect(() => {
    // selectedChoice; {display_name:"balcony",value:"1"}
    // choiceField;    {choices:[{display_name:"balcony",value:"1"}],type:"choice",label:"balcony"}
    if (selectedChoice !== null) {
      handleFieldChange(choiceField, selectedChoice.display_name, selectedChoice.display_name);
    }
  }, [selectedChoice]);

  React.useEffect(() => {
    const countryFields = fields.filter((obj) => obj.upload_name === "country");
    let selectedCountyName = "";
    if (countryFields.length) {
      selectedCountyName = countryFields[0].upload_value;
    }
    let typingTimer = setTimeout(async () => {
      if (autoCompleteText) {
        let typ = "q";
        if (autoCompleteText.type.includes("post")) {
          typ = "p";
        }
        let res = await LocationSuggesions(typ, autoCompleteText.data, selectedCountyName);
        //console.log(res, autoCompleteText);
        setSuggestions(res);
      }
    }, 500); // Change the delay (in milliseconds) as needed
    return () => {
      clearTimeout(typingTimer);
    };
  }, [autoCompleteText, fields]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.background} barStyle={dark ? "light-content" : "dark-content"} />

      <ToastModal
        show={toast.vis}
        duration={3000}
        closeCallBack={() => {
          setToast(false);
          navigation.goBack();
        }}
        color={toast.color}
        msg={toast.msg}
      />

      <LoadingModal visible={loading.vis} text={loading.msg} />
      {/**
      <WarningModal
        visible={errorVis.vis}
        content={errorVis.msg}
        buttonTile={errorVis.title}
        iconType={errorVis.iconType}
        buttonPress={() => setErrorVis({ ...errorVis, vis: false })}
      />
         */}
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <UploadImageView maxImages={6} onImagPicked={setImages} serverImages={serverImages} />
        {fields ? (
          fields.map((field, index) => {
            switch (field.type) {
              case "string": {
                const kbType = field.upload_name.toLowerCase().includes("phone") ? "phone-pad" : "default";
                const rows = field.max_length ? 1 : 5;
                const maxLen = field.max_length ? field.max_length : undefined;
                if (field.upload_name.toLowerCase().includes("city")) {
                  return (
                    <ComboBox
                      label={field.label}
                      value={field.upload_value}
                      onChoose={(item) => {
                        handleFieldChange(field, item.value, item.value);
                        setSuggestions(null);
                        setCoordinate({ lat: item.lat, lon: item.lon });
                      }}
                      onChangeText={(text) => {
                        handleFieldChange(field, text, text);
                        setAutoCompleteText({ type: "city", data: text });
                      }}
                      suggests={suggestions}
                      key={index}
                      required={field.required}
                    />
                  );
                } else if (field.upload_name.toLowerCase().includes("post")) {
                  return (
                    <ComboBox
                      label={field.label}
                      value={field.upload_value}
                      onChoose={(item) => {
                        handleFieldChange(field, item.value, item.value);
                        setSuggestions(null);
                        handleFieldChange("city", item.cityname, item.cityname, true);
                        setCoordinate({ lat: item.lat, lon: item.lon });
                      }}
                      onChangeText={(text) => {
                        handleFieldChange(field, text, text);
                        setAutoCompleteText({ type: "postcode", data: text });
                      }}
                      suggests={suggestions}
                      key={index}
                      required={field.required}
                    />
                  );
                }
                return (
                  <FieldInput
                    key={index}
                    title={field.label}
                    dark={dark}
                    value={field.upload_value}
                    kbType={kbType}
                    lines={rows}
                    lineLen={maxLen}
                    onChange={(text) => {
                      handleFieldChange(field, text, text);
                    }}
                    required={field.required}
                  />
                );
              }
              case "integer":
                return (
                  <FieldInput
                    key={index}
                    title={field.label}
                    dark={dark}
                    value={field.upload_value}
                    kbType={"number-pad"}
                    onChange={(text) => {
                      handleFieldChange(field, text, text);
                    }}
                    required={field.required}
                  />
                );
              case "email":
                return (
                  <FieldInput
                    key={index}
                    title={field.label}
                    dark={dark}
                    value={field.upload_value}
                    kbType="email-address"
                    onChange={(text) => {
                      handleFieldChange(field, text, text);
                    }}
                    required={field.required}
                  />
                );
              case "float":
                return (
                  <FieldInput
                    key={index}
                    title={field.label}
                    dark={dark}
                    value={field.upload_value}
                    kbType={"decimal-pad"}
                    onChange={(text) => {
                      handleFieldChange(field, text, text);
                    }}
                    required={field.required}
                  />
                );
              case "boolean":
                return (
                  <FieldBoolean
                    key={index}
                    title={field.label}
                    value={field.upload_value}
                    onChange={() => {
                      handleFieldChange(field, true, !field.upload_value);
                    }}
                    required={field.required}
                  />
                );
              case "choice":
                return (
                  <FieldChoince
                    key={index}
                    title={field.label}
                    value={field.upload_value}
                    onPress={() => {
                      setChoiceField(field);
                      //console.log(tempChoices);
                      setBsOpen(true);
                    }}
                    required={field.required}
                  />
                );
            }
          })
        ) : (
          <></>
        )}
      </KeyboardAwareScrollView>
      <View style={{ marginBottom: verticalScale(15) }}>
        <Text style={{ margin: 5, color: colors.grey }}>
          <Text style={{ color: "red" }}> * </Text>
          {Translation("marked fields are required")}
        </Text>
        {screenData.modify ? (
          <View style={{ flexDirection: "row", margin: 10, justifyContent: "space-between" }}>
            <View style={{ flex: 1, marginEnd: 10 }}>
              <Button
                title={Translation("Delete")}
                textColor={colors.bcColor}
                onPress={handleDelete}
                style={{ backgroundColor: "red" }}
              />
            </View>
            <View style={{ flex: 1, marginStart: 10 }}>
              <Button title={Translation("Update")} textColor={colors.bcColor} onPress={handleUpload} />
            </View>
            <View style={{ flex: 1, marginStart: 10 }}>
              <Button title={Translation("Preview")} textColor={colors.bcColor} onPress={handlePreview} />
            </View>
          </View>
        ) : (
          <Button
            title={Translation("Upload")}
            textColor={colors.bcColor}
            style={{ width: "92%", alignSelf: "center" }}
            onPress={handleUpload}
          />
        )}
      </View>
      <BottomSheetModalView
        data={choiceField.choices}
        open={bsOpen}
        closeCallBack={() => {
          setBsOpen(false);
        }}
        onSelectCallBack={setSelectedChoice}
      />
    </SafeAreaView>
  );
}

const userCanExit = (fields, defaultFields) => {
  let dNames = Object.keys(defaultFields);

  for (let i = 0; i < fields.length; i++) {
    let field = fields[i];

    if (field.upload_value && !dNames.includes(field.upload_name)) {
      return false; // Found a non-default field with a value
    }
  }

  return true; // No non-default fields with values found
};

const setImageToForm = (img) => {
  const formData = new FormData();
  let match = /\.(\w+)$/.exec(img.fileName);
  let type = match ? `image/${match[1]}` : `image`;
  formData.append("image", { uri: img.uri, name: img.fileName, type });
  return formData;
};

const fillUpObviousFields = (fields, obvField) => {
  let obvKeys = Object.keys(obvField);
  fields.forEach((f) => {
    if (obvKeys.includes(f.upload_name)) {
      f.upload_value = obvField[f.upload_name];
    }
  });
};

const fillUpdatedPostValues = (fields, uploadedFields, type) => {
  console.log(uploadedFields[type], type, uploadedFields);
  let mainKeys = Object.keys(uploadedFields);
  let subFieldKeys = Object.keys(uploadedFields[type]);
  fields.forEach((f) => {
    if (mainKeys.includes(f.upload_name)) {
      let value = uploadedFields[f.upload_name];
      if (f.type.toLowerCase() === "choice") {
        const found_choice = f.choices.find((choice) => choice.value === value);
        f.upload_value = found_choice ? found_choice.display_name : "";
      } else {
        f.upload_value = value;
      }
    } else if (subFieldKeys.includes(f.upload_name)) {
      let value = uploadedFields[type][f.upload_name];
      if (f.type.toLowerCase() === "choice") {
        const found_choice = f.choices.find((choice) => choice.value === value);
        f.upload_value = found_choice ? found_choice.display_name : "";
      } else {
        f.upload_value = value;
      }
      //console.log(f.upload_value, value);
    }
  });
};

const execlude = ["id", "header_image", "latitude", "longitude"];

const collectFields = (objField, fields, hasParent = false, parentName = "") => {
  let fieldList = Object.keys(objField);
  fieldList.forEach((name) => {
    let fieldObj = objField[name];
    if (fieldObj.type != "nested object") {
      if (!execlude.includes(name.toLowerCase())) {
        fieldObj["upload_name"] = name;
        fieldObj["upload_value"] = null;
        fieldObj["has_parent"] = hasParent;
        fieldObj["parent_name"] = parentName;
        fields.push(fieldObj);
      }
    } else {
      let children = fieldObj.children;
      collectFields(children, fields, true, name);
    }
  });
};

const UserAlert = (msg = "", title = Translation("upload_fail"), btnName = Translation("try again")) => {
  Alert.alert(title, msg, [{ text: btnName, style: "cancel" }]);
};
