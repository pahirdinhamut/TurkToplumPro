import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState, memo } from "react";
import { BackHandler, Text, Modal, StyleSheet, Animated, Dimensions, Pressable } from "react-native";
import { Translation } from "../../utils/Strings";
import { height, width } from "../../utils/Spacing";

const ToastModal = ({ duration, show, closeCallBack, color = "green", msg = Translation("success") }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnimation = new Animated.Value(height);
  slideAnimation.addListener(() => {
    return;
  });
  const { colors } = useTheme();

  useEffect(() => {
    if (show) {
      setModalVisible(true);
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start();

      const timer = setTimeout(() => {
        closeModal();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setModalVisible(false);
    }
  }, [show, duration, slideAnimation]);

  const closeModal = () => {
    Animated.timing(slideAnimation, {
      toValue: height,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      setModalVisible(false);
      closeCallBack();
    });
  };

  return (
    <Modal visible={modalVisible} transparent>
      <Pressable style={styles.modalContainer} onPress={() => closeModal()}>
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideAnimation }], backgroundColor: colors.modalBackground, borderLeftColor: color }
          ]}
        >
          <Text style={[styles.warnigStyle, { color: colors.text }]}>{msg}</Text>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
    //backgroundColor: "green"
  },
  modalContent: {
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: width - 20
  },
  warnigStyle: {
    borderRadius: 5,
    padding: 10,
    fontSize: 15,
    textAlign: "center"
  }
});

export default memo(ToastModal);
