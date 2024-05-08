import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const EmailSvg = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={22} height={21}>
    <G fill="none" fillRule="evenodd" stroke={props.stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <Path d="M16.82 7.52s-3.21 3.85-5.56 3.85c-2.35 0-5.59-3.85-5.59-3.85" />
      <Path d="M1.73 10.47c0-6.84 2.38-9.12 9.52-9.12s9.52 2.28 9.52 9.12-2.38 9.11-9.52 9.11-9.52-2.28-9.52-9.11Z" />
    </G>
  </Svg>
);
export default EmailSvg;
