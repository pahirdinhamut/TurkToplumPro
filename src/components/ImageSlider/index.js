import React from "react";
import { View, Image, StyleSheet } from "react-native";

function ImageSlider({ index, image }) {
  return (
    <View style={styles.ImageView}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: `${image}`
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ImageView: {
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 5,
  },
  image: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ImageSlider;
