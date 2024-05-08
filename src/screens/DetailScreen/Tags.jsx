import { View, Text } from "react-native";
import React, { memo } from "react";
import { useTheme } from "@react-navigation/native";
import { FloorSvg, SpaceSvg, GartenSvg, GarageSvg, LiftSvg, BathSvg, BedSvg, BalconySvg } from "../../components/svgComponents";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { height } from "../../utils/Spacing";
import { Fonts } from "../../utils/Strings";

const Tags = ({ name, value, icon }) => {
  console.log("name value", name, "/", value);
  const { colors } = useTheme();

  const SvgSelector = {
    floor: <FloorSvg />,
    space: <SpaceSvg />,
    yard: <GartenSvg />,
    elevator: <LiftSvg />,
    bedrooms: <BedSvg />,
    bathrooms: <BathSvg />,
    garage: <GarageSvg />,
    size: <SpaceSvg />,
    rooms: <BedSvg />,
    balcony: <BalconySvg />,
    price: <MaterialIcons name={"euro"} size={22} color={"#b7b7b7"} />
  };

  return (
    <View
      style={{
        width: height * 0.2,
        height: 50,
        // borderRadius: 5,
        backgroundColor: colors.modalBackground,
        margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        borderRadius: 5
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        {SvgSelector[icon.toLowerCase()]}
        {SvgSelector[icon.toLowerCase()] ? (
          <View horizontal={true}>
            <Text
              style={{ color: "#757575", fontSize: 13, fontFamily: Fonts.regular, marginLeft: 10, textTransform: "capitalize" }}
            >
              {value === "var" || value === "yes" ? "" : value}
              &nbsp;
              {name}
            </Text>
          </View>
        ) : (
          <View horizontal={true}>
            <Text
              style={{ color: "#757575", fontSize: 13, fontFamily: Fonts.regular, marginLeft: 10, textTransform: "capitalize" }}
            >
              {name + ":"}
              &nbsp;
              {value === "var" || value === "yes" ? "" : value}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default memo(Tags);
