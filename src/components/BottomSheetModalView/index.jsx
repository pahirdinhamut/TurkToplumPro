import React, { useCallback, useRef, useMemo, memo } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import ChoiceInput from "../ChoiceInput";
import { color } from "react-native-reanimated";
import { height } from "../../utils/Spacing";

const BottomSheetModalView = ({
  data,
  open,
  closeCallBack,
  onSelectCallBack,
  rowName = "display_name",
  renderItemFunc,
  snapPercents,
  margin
}) => {
  const { colors } = useTheme();
  const sheetRef = useRef(null);
  React.useEffect(() => {
    open && sheetRef.current ? sheetRef.current.snapToIndex(0) : sheetRef.current.close();
  }, [open]);
  // hooks

  const snapPoints = useMemo(() => (snapPercents ? snapPercents : ["30%", "50%", "90%"]), []);

  React.useEffect(() => {
    if (!open) {
      sheetRef.current.close();
      return;
    }
    if (!data) {
      return;
    }
    try {
      // Set a threshold height
      const thresholdHeight = Dimensions.get("window").height - 10;

      // Calculate the modal height based on the data length
      const dataLength = data.length;
      const modalHeight = dataLength * (height * 0.06 + 10); // Assuming each item has a height of 50

      // Return the appropriate height
      const percent = (modalHeight / thresholdHeight) * 100;
      let snapIndx = 0;
      if (31 > percent && percent >= 21) {
        snapIndx = 1;
      } else if (percent >= 31) {
        snapIndx = 2;
      }
      //console.log(31 > percent && percent >= 21);
      //console.log("moda sheet heights: ", modalHeight, thresholdHeight, snapIndx, percent);
      if (sheetRef.current) sheetRef.current.snapToIndex(snapIndx);
    } catch (e) {
      console.log("bottom sheet modal snap error: " + e);
    }
  }, [data, open]);

  // render
  const renderItem = useCallback(
    (item, index) => (
      <ChoiceInput
        bcolor={"white"}
        key={index}
        onPress={() => {
          onSelectCallBack(item);
          sheetRef.current?.close();
        }}
        value={item[rowName]}
        margin
      />
    ),
    []
  );
  const handleSheetChange = useCallback((index) => {
    index === -1 ? closeCallBack() : null;
  }, []);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChange}
      backgroundStyle={{ backgroundColor: colors.modalBackground }}
      handleStyle={{ backgroundColor: colors.modalBackground, borderTopStartRadius: 50, borderTopEndRadius: 50 }}
      handleIndicatorStyle={{ backgroundColor: colors.text }}
      style={{ margin: margin }}
    >
      <BottomSheetScrollView contentContainerStyle={{ backgroundColor: colors.modalBackground }}>
        {data ? data.map(renderItemFunc ? renderItemFunc : renderItem) : null}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default memo(BottomSheetModalView);
