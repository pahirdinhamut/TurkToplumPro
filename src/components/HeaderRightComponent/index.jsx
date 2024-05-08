import { Alert, Pressable, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import React from "react";
import { IsFilterSvg, OptionsSvg, SearchSvg, ShareSvg, HaertSvg } from "../svgComponents";
import { HStack } from "..";
import { useNavigation, useTheme } from "@react-navigation/native";

/**
 * {Object} props - The props for the component
 * @param {function} props.onPress -  The function to be called when the filter button is pressed
 * @param {function} props.searchOnPress - The function to be called when the search button is pressed
 * **/

export default function HeaderRightComponent({ leftOnPress, rightOnPress, isFilter = false, type = "1", saved = false }) {
  //type 1 is filter and search , type 2 is share and heart
  // left buttons are filter and share , right buttons are search and heart
  const { colors } = useTheme();
  const navigation = useNavigation();
  const iconHeight = 22;
  const iconWidth = 22;
  const activeOpacity = 0.5;
  return (
    <View style={{ marginRight: 15 }}>
      {type === "1" ? (
        <HStack>
          <TouchableOpacity onPress={leftOnPress} activeOpacity={activeOpacity} style={styles.touchStyle}>
            {isFilter ? (
              <IsFilterSvg height={iconHeight} width={iconWidth} stroke={colors.text} fill={colors.text} />
            ) : (
              <OptionsSvg height={iconHeight} width={iconWidth} stroke={colors.text} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={rightOnPress} activeOpacity={activeOpacity} style={styles.touchStyle}>
            <SearchSvg height={iconHeight} width={iconWidth} stroke={colors.text} />
          </TouchableOpacity>
        </HStack>
      ) : (
        <HStack>
          <TouchableOpacity onPress={leftOnPress} activeOpacity={activeOpacity} style={styles.touchStyle}>
            <ShareSvg height={iconHeight} width={iconWidth} stroke={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={rightOnPress} activeOpacity={activeOpacity} style={styles.touchStyle}>
            {saved ? (
              <HaertSvg height={iconHeight} width={iconWidth} stroke={"#f8312f"} fill={colors.error} innerStroke={"white"} />
            ) : (
              <HaertSvg
                height={iconHeight}
                width={iconWidth}
                stroke={colors.text}
                fill={colors.background}
                innerStroke={colors.text}
              />
            )}
          </TouchableOpacity>
        </HStack>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  touchStyle: {
    padding: 10
  }
});
