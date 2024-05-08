import * as React from "react";
import Svg, { Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const PhoneSvg = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={22} height={21}>
    <Path
      fill="none"
      fillRule="evenodd"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.45 14.27C.55 7.37 1.53 4.21 2.26 3.19c.09-.16 2.4-3.61 4.87-1.59 6.12 5.05-1.63 4.33 3.51 9.48s4.43-2.61 9.48 3.51c2 2.47-1.43 4.77-1.59 4.87-1.02.72-4.18 1.71-11.08-5.19Z"
    />
  </Svg>
);
export default PhoneSvg;
