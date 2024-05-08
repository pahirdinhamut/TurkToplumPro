import { FlatList, TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Color } from "../../utils/Strings";
import { useTheme } from "@react-navigation/native";

export default function LanguageItemView({ icon, title = "hollanda", onPress }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.LanguageViewContainer,
        {
          backgroundColor: colors.modalBackground
        }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.LanguageItem,
          {
            backgroundColor: colors.modalBackground
          }
        ]}
      >
        <View
          style={[
            styles.IconView,
            {
              backgroundColor: colors.modalBackground,
              shadowColor: colors.text
            }
          ]}
        >
          <Image source={{ uri: icon }} height={36} width={36} />
        </View>
        <View
          style={[
            styles.titleView,
            {
              backgroundColor: colors.modalBackground
            }
          ]}
        >
          <Text
            style={[
              styles.title,
              {
                color: colors.text
              }
            ]}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  LanguageViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.bcColor
  },
  LanguageItem: {
    width: 170,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: Color.bcColor,
    marginTop: 20
  },
  IconView: {
    width: 36,
    height: 36,
    borderRadius: 18,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  titleView: {},
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Color.PremiumTextColor,
    marginLeft: 20,
    marginVertical: 10
    //textTransform: "capitalize"
  },
  Line: {
    height: 1,
    width: 70,
    borderBottomColor: Color.PremiumTextColor,
    borderBottomWidth: 1,
    marginLeft: 20
  }
});
