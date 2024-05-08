import React, { useEffect } from "react";
import { View, Modal, StyleSheet, Pressable, Text, StatusBar } from "react-native";
import { LocationFillSvg, AlertSvg, SuccessSvg } from "../svgComponents";
import { horizontalScale, verticalScale } from "../../utils/Spacing";
import { Color, Fonts, Translation } from "../../utils/Strings";
// import Button from '../Button'
import { useTheme } from "@react-navigation/native";
import Button from "../Button";
import { height } from "../../utils/Size";

function ModalView({
  open,
  children,
  onPress,
  type,
  width,
  title,
  cancelButtonTitle,
  okButtonTitle,
  cancelButtonPress,
  okButtonPress
}) {
  const [isVisible, setIsVisible] = React.useState(open);
  const [maxHeight, setMaxHeight] = React.useState(0);
  const { dark, colors } = useTheme();

  okButtonTitle = okButtonTitle ? okButtonTitle : Translation("yes");
  cancelButtonTitle = cancelButtonTitle ? cancelButtonTitle : Translation("no");
  let Icons = null;
  switch (type) {
    case "location":
      Icons = <LocationFillSvg fill={"#0ca0ed"} />;
      break;
    case "alert":
      Icons = <AlertSvg />;
      break;
    case "success":
      Icons = <SuccessSvg />;
      break;
    default:
      Icons = null;
  }

  const handleLayout = React.useCallback(
    async (event) => {
      const viewHeight = event.nativeEvent.layout.height;
      const mxHeight = height / 2;
      //console.log(viewHeight > maxHeight, viewHeight, maxHeight, mxHeight);
      if (viewHeight > mxHeight) {
        setMaxHeight(mxHeight);
      } else {
        setMaxHeight(viewHeight);
      }
    },
    [maxHeight]
  );

  useEffect(() => {
    toggleModal();
    setMaxHeight(undefined);
  }, [open]);

  const toggleModal = () => {
    if (open) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <Modal transparent visible={isVisible} animationType={"fade"}>
      <StatusBar backgroundColor="rgba(0,0,0,0.7)" />
      <Pressable onPress={onPress} style={styles.ModalView}>
        <View
          style={[
            styles.ModalContainer,
            {
              backgroundColor: colors.modalBackground,
              width: width
            }
          ]}
        >
          {type === null ? null : (
            <View style={[styles.HeaderIcon, { backgroundColor: colors.modalBackground, left: width / 2 - 34 }]}>{Icons}</View>
          )}

          {children ? (
            <View style={{ height: maxHeight }} onLayout={handleLayout}>
              {children}
            </View>
          ) : (
            <View style={{ height: maxHeight }} onLayout={handleLayout}>
              <Text
                style={[
                  styles.AlertTitle,
                  {
                    color: colors.text
                  }
                ]}
              >
                {title}
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 28, marginHorizontal: 10 }}>
                <Button small title={cancelButtonTitle} onPress={cancelButtonPress} textColor={"white"} />
                <Button small title={okButtonTitle} onPress={okButtonPress} textColor={"white"} />
              </View>
            </View>
          )}
        </View>
      </Pressable>
    </Modal>
  );
}

ModalView.defaultProps = {
  open: false,
  onPress: () => null,
  type: null,
  width: 275,
  height: 330,
  bcColor: Color.bcColor
};

const styles = StyleSheet.create({
  ModalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center"
  },
  ModalContainer: {
    borderRadius: 10,
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  HeaderIcon: {
    width: 64,
    height: 64,
    backgroundColor: Color.bcColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    position: "absolute",
    top: -30
  },
  AlerModalBody: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10
  },
  AlertTitleView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  AlertTitle: {
    fontSize: 18,
    fontFamily: Fonts.semibold,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20
  },
  AlertButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10
  }
});

export default ModalView;
