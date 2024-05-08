import * as React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SaleSvg = (props) => (
  <Svg {...props} width={props.width?props.width:24} height={props.height?props.height:26} xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient x1="63.972%" y1="11.679%" x2="15.545%" y2="111.654%" id="a">
        <Stop stopColor="#050640" offset="0%" />
        <Stop stopColor="#3BC3FF" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="92.528%" y1="20.189%" x2="92.528%" y2="125.289%" id="b">
        <Stop stopColor="#050640" offset="0%" />
        <Stop stopColor="#3BC3FF" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M14.277 24.64a2.43 2.43 0 0 1-3.39-.13l-5.54-7.44-5-6.68a2 2 0 0 1-.28-1.64l1.6-6.49a3.11 3.11 0 0 1 3-2.26l6.67.32a1.94 1.94 0 0 1 1.5.74l5 6.69 5.55 7.43a2.44 2.44 0 0 1-.85 3.29l-4.14 3.08-4.12 3.09Z"
        fill="url(#a)"
        fillRule="nonzero"
        transform="translate(.283 .06)"
      />
      <Path
        d="M6.027 4.94a.76.76 0 0 1-1-.15.75.75 0 0 1 .15-1 .73.73 0 0 1 1 .15h0a.76.76 0 0 1-.15 1h0Z"
        stroke="#DDF4FE"
        strokeWidth={2}
        fill="url(#b)"
        fillRule="nonzero"
        strokeLinecap="round"
        transform="translate(.283 .06)"
      />
      <Path stroke="#DDF4FE" strokeWidth={2} strokeLinecap="round" d="m8.32 10.36 3.77 5.07M13 11.31l1.65 2.21" />
    </G>
  </Svg>
);

export default SaleSvg;
