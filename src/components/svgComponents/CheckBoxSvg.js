import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const CheckBoxSvg = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={21} height={21} {...props} viewBox="0 0 21 21">
    <G fill="none" fillRule="evenodd" stroke={props.stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <Path d="m6.69 10.47 2.37 2.37 4.75-4.75" />
      <Path d="M1 10.47c0 6.93 2.31 9.25 9.25 9.25 6.94 0 9.25-2.32 9.25-9.25s-2.31-9.25-9.25-9.25C3.31 1.22 1 3.53 1 10.47Z" />
    </G>
  </Svg>
);
export default CheckBoxSvg;
