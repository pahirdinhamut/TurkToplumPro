import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const BedSvg = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={28.239} height={20.812}>
    <G fill="none" fillRule="nonzero" stroke="#757575" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <Path d="M.75 13.376v4.49c0 1.213.984 2.196 2.196 2.196h22.348a2.196 2.196 0 0 0 2.195-2.196v-4.49H.75h0ZM26.003 8.92H2.236c-.821 0-1.486.665-1.486 1.485v2.971h26.738v-2.971c0-.82-.665-1.485-1.485-1.485Z" />
      <Path d="M11.019 5.207H7.565c-.892 0-1.615.723-1.615 1.615v2.099h6.684V6.822c0-.892-.723-1.615-1.615-1.615h0ZM20.675 5.207h-3.454c-.892 0-1.615.723-1.615 1.615v2.099h6.684V6.822c0-.892-.723-1.615-1.615-1.615h0Z" />
      <Path d="M24.518 8.92V2.235c0-.82-.665-1.485-1.485-1.485H5.207c-.82 0-1.485.665-1.485 1.485V8.92" />
    </G>
  </Svg>
);
export default BedSvg;
