import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */

const LoginSvg = (props) => (
  <Svg {...props} width={22} height={22} xmlns="http://www.w3.org/2000/svg">
    <G stroke="#06C755" strokeWidth={1.5} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 10.58h12M11.91 13.5 9 10.59l2.93-2.92" />
      <Path d="M15.58 6.1c-.33-3.58-1.67-4.88-7-4.88-7.1 0-7.1 2.31-7.1 9.25 0 6.94 0 9.25 7.1 9.25 5.33 0 6.67-1.3 7-4.88" />
    </G>
  </Svg>
);

export default LoginSvg;
