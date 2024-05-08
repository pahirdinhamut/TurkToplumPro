import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const BathSvg = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={19.326} height={25.267}>
    <G fill="none" fillRule="nonzero" stroke="#757575" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <Path fill="#757575" d="M11.148 11.891H2.235v-.937a4.262 4.262 0 0 1 4.262-4.262h.389a4.262 4.262 0 0 1 4.262 4.262v.937h0Z" />
      <Path d="M6.692 6.692h0a5.942 5.942 0 0 1 11.884 0v17.825" />
      <Path
        fill="#000"
        d="M2.235 14.119v1.485M2.235 17.832v1.485M2.235 21.546v1.485M4.464 15.604v1.485M4.464 19.318v1.485M4.464 23.031v1.485M6.692 14.119v1.485M6.692 17.832v1.485M6.692 21.546v1.485M8.92 15.604v1.485M8.92 19.318v1.485M8.92 23.031v1.485M11.148 14.119v1.485M11.148 17.832v1.485M11.148 21.546v1.485"
      />
      <Path d="M.75 11.89h11.884" />
    </G>
  </Svg>
);
export default BathSvg;
