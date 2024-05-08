import * as React from "react";
import Svg, { Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const CheckBoxEmpSvg = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={21} height={21} {...props} viewBox="0 0 21 21">
    <Path
      fill="none"
      fillRule="evenodd"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1 10.47c0 6.93 2.31 9.25 9.25 9.25 6.94 0 9.25-2.32 9.25-9.25s-2.31-9.25-9.25-9.25C3.31 1.22 1 3.53 1 10.47Z"
    />
  </Svg>
);
export default CheckBoxEmpSvg;
