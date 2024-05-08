import * as React from "react";
import Svg, { G, Path, Rect } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const LiftSvg = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={22} height={23} viewBox={"0 0 24 25"}>
    <G fill="none" fillRule="evenodd" stroke="#757575">
      <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.227 9.36 12 4.604l4.717 4.756" />
      <Rect width={22} height={23} x={1} y={1} strokeWidth={2} rx={3} />
      <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m16.717 15.604-4.773 4.756-4.717-4.756" />
    </G>
  </Svg>
);
export default LiftSvg;
