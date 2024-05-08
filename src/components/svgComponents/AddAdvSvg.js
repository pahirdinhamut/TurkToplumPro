import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */

const AddAdvSvg = (props) => (
  <Svg {...props} width={24} height={24} xmlns="http://www.w3.org/2000/svg">
    <G
      stroke={props.stroke || "#130F26"}
      strokeWidth={1.5}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M11.25 7.89V15M14.83 11.47H7.67M1.51 11.47c0-7.3 2.44-9.74 9.74-9.74 7.3 0 9.75 2.44 9.75 9.74 0 7.3-2.44 9.73-9.74 9.73-7.3 0-9.75-2.43-9.75-9.73Z" />
    </G>
  </Svg>
);

export default AddAdvSvg;
