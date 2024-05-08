import React, { memo } from "react";
import { horizontalScale, verticalScale } from "../../utils/Spacing";
import { View } from "react-native";

//  px is paddding x and py is padding y
function Container({ children, bcColor, px = 0, py = 0, style }) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: horizontalScale(px),
        paddingVertical: verticalScale(py),
        backgroundColor: bcColor || null,
        ...style
      }}
    >
      {children}
    </View>
  );
}

export default memo(Container);
