import { View, Alert, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Title from "../Title";
import WarningModal from "../Modal/WarningModal";
import { useTheme } from "@react-navigation/native";
import { Translation } from "../../utils/Strings.js";
import { horizontalScale, verticalScale } from "../../utils/Spacing";

function UploadImageView({ maxImages, onImagPicked, serverImages }) {
  const [images, setImages] = React.useState([]); // store all the selected images
  const [imageAdded, setImagesAdded] = React.useState(false); // to handle scroll after image is added
  const [imageCount, setImageCount] = React.useState(0); // to handle how many images can be selected
  const [warningModal, setWarningModal] = React.useState({ vis: false, content: "" });
  const scrollRef = React.useRef(); // ref fro scrollview to handle scroll to bottom
  const { colors } = useTheme();

  React.useEffect(() => {
    if (serverImages.length > 0) {
      setImages([...images, ...serverImages]);
      setImagesAdded(!imageAdded);
      setImageCount(serverImages.length + images.length);
    }
  }, [serverImages]);

  React.useEffect(() => {
    onImagPicked(images);
  }, [images]);

  const deleteImage = (index) => {
    let tempArr = images.filter((_, indx) => indx != index);
    setImageCount(tempArr.length);
    setImages(tempArr);
  };

  const changeImage = async (index) => {
    let result = await ImagePicker.launchImageLibrary({ mediaType: "photo" });
    if (!result.didCancel) {
      let tempArr = [...images];
      console.log(tempArr.splice(index, 1, result.assets[0]));
      setImages(tempArr);
    }
  };

  React.useEffect(() => {
    scrollRef.current.scrollToEnd({ animated: true });
    console.log(images);
  }, [imageAdded]);

  const onButtonPress = async (type) => {
    console.log(images.length);
    if (images.length >= maxImages) {
      setWarningModal({ vis: true, content: "max image reached!!!" });
      return;
    }
    let result = "";
    //github said do not user maxwidth and maxheight
    //to reduce size because it'll recude the quality use instaead quality
    //but on ios some images size will not be reduced
    const options = {
      quality: 0.2,
      mediaType: "photo",
      selectionLimit: maxImages,
      maxWidth: 1800,
      maxHeight: 1800,
      StorageOptions: {
        path: "images",
        mediaType: "photo",
        selectionLimit: maxImages,
        height: 1800,
        width: 1800
      }
    };
    switch (type) {
      case "cam":
        result = await ImagePicker.launchCamera(options);
        break;
      case "foto":
        result = await ImagePicker.launchImageLibrary(options);
        break;
    }
    console.log(result);
    if (result.errorCode) {
      Alert.alert(result.errorCode);
      return;
    }

    if (!result.didCancel) {
      let tempArr = [...images, ...result.assets];
      if (tempArr.length > maxImages) {
        setWarningModal({ vis: true, content: "En fazla [" + maxImages + "] adet resim yüklenebilir!" });
        tempArr = tempArr.slice(0, maxImages);
      }
      setImages(tempArr);
      setImagesAdded(!imageAdded);
      setImageCount(tempArr.length);
    }
  };

  return (
    <View style={styles.uploadImageContainer}>
      <WarningModal
        visible={warningModal.vis}
        buttonTile={"ok"}
        content={warningModal.content}
        buttonPress={() => setWarningModal({ vis: false, content: "" })}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Title title={Translation("Image upload")} />
        <Title title={imageCount + "/" + maxImages} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        style={[styles.scrollView, { borderColor: colors.border }]}
      >
        {images.map((ar, index) => {
          return <DeletableImage key={index} path={ar.uri} index={index} onDelete={deleteImage} onChange={changeImage} />;
        })}

        <TouchableOpacity onPress={() => onButtonPress("foto")} style={styles.addImage}>
          <Entypo name="folder-images" size={40} color={colors.grey} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onButtonPress("cam")} style={styles.takePhoto}>
          <Entypo name="camera" size={40} color={colors.grey} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function DeletableImage({ path, onDelete, onChange, index }) {
  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: path }} style={styles.image} image />
      <TouchableOpacity onPress={() => onChange(index)} style={styles.swapIcon}>
        <Entypo name="swap" size={20} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(index)} style={styles.delteIcon}>
        <Entypo name="circle-with-cross" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  delteIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    padding: 2,
    opacity: 0.7
  },
  swapIcon: {
    position: "absolute",
    alignSelf: "flex-start",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    padding: 2,
    opacity: 0.7
  },
  image: {
    alignItems: "flex-end",
    width: 165,
    height: 120
  },
  imageContainer: { flex: 1, margin: 6, borderRadius: 10, padding: 10 },
  addImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 6,
    width: 90
  },
  takePhoto: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 6,
    width: 90
  },
  scrollView: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black"
  },
  uploadImageContainer: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10)
  }
});

export default UploadImageView;
