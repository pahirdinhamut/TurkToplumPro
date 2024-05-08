import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SpaceSvg = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={17.395} height={17.396}>
    <G
      fill="none"
      fillRule="nonzero"
      stroke={props.stroke ? props.stroke : "#757575"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M16.645 12.672v3.974h-3.974M12.671.75h3.974v3.974M.75 4.724V.75h3.974M4.724 16.646H.75v-3.974" />
      <Path fill="#000" d="M12.253 5.32 16.645.75M12.253 12.076l4.392 4.57" />
      <Path d="M5.142 5.32.75.75" />
      <Path fill="#000" d="M5.142 12.076.75 16.646" />
    </G>
  </Svg>
);
export default SpaceSvg;
