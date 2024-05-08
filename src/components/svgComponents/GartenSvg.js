import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const GartenSvg = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={24.526} height={22.297}>
    <G fill="none" fillRule="nonzero" stroke="#757575" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <Path d="M11.15 12.634a5.2 5.2 0 0 1-10.399 0C.751 9.763 3.079.75 5.951.75c2.87 0 5.198 9.013 5.198 11.884h.001Z" />
      <Path d="M5.95 21.547V5.207l2.678-1.91" />
      <Path fill="#000" d="M18.576 14.862v6.685" />
      <Path d="M13.377 12.534a5.2 5.2 0 1 1 0 .1v-.1Z" />
      <Path fill="#000" d="M.75 21.547h22.283M5.95 14.12.98 10.495" />
      <Path d="m5.95 11.283 4.575-2.662M5.95 7.675 2.426 5.207M18.576 14.862l-5.18-2.658M20.804 8.178l-2.228 6.685 5.2-2.23" />
      <Path fill="#000" d="m18.576 14.862-3.015-6.459" />
    </G>
  </Svg>
);
export default GartenSvg;
