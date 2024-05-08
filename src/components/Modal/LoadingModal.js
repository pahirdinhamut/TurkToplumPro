import { View, Text, StyleSheet, ActivityIndicator, Modal } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { width } from "../../utils/Size";
import { Translation } from "../../utils/Strings";

export default function LoadingModal({ visible, text }) {
  const { colors } = useTheme();
  return (
    <Modal animationType="fade" transparent={true} visible={visible} statusBarTranslucent={true}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: colors.modalBackground }]}>
          <ActivityIndicator size="large" color={colors.text} />
          {text ? (
            <Text style={[styles.modalText, { color: colors.text }]}>{text}</Text>
          ) : (
            <Text style={[styles.modalText, { color: colors.text }]}>{Translation("loading...")}</Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0008"
  },
  modalView: {
    margin: 20,
    width: width / 1.2,
    height: 110,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  modalText: {
    marginVertical: 15,
    textAlign: "center",
    fontSize: 17,
    marginLeft: 15
  }
});
