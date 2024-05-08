import { Dimensions, Platform, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

// sased on iphone  SE3's scale
const scale = width / 375;

// based on iphone 5s's scale
const scale2 = width / 320;

// based on iphone 11's scale
const scale3 = width / 414;

// based on iphone 12's scale
const scale4 = width / 390;

// based on iphone 13's scale

const scale5 = width / 428;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function normalizeL(size) {
  const newSize = size * scale2;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export { width, height };
