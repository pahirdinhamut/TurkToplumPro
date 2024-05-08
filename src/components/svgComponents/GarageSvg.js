import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const GarageSvg = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={28.237} height={24.682}>
    <G fill="none" fillRule="nonzero" stroke="#757575" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <Path fill="#666666" d="M2.977 9.077v14.855M25.26 8.334v15.597" />
      <Path d="M27.487 9.82 15.544 1.194a2.345 2.345 0 0 0-2.813.05L.75 10.564M9.662 21.703v1.485c0 .41-.333.743-.743.743H7.434a.743.743 0 0 1-.743-.743v-1.485M21.546 21.703v1.485c0 .41-.333.743-.743.743h-1.485a.743.743 0 0 1-.743-.743v-1.485" />
      <Path d="M18.44 11.305H9.797c-.613 0-1.153.402-1.328.99l-.975 4.006c-.04.135-.1.262-.18.38l-1.13 1.675a1.39 1.39 0 0 0-.236.775v1.91c0 .366.297.662.662.662h15.016a.661.661 0 0 0 .662-.662v-1.91a1.38 1.38 0 0 0-.237-.775l-1.13-1.677a1.38 1.38 0 0 1-.18-.378l-.973-4.006a1.385 1.385 0 0 0-1.328-.99h0ZM8.177 19.475h1.485M18.575 19.475h1.485" />
      <Path d="M16.347 21.703v-2.228h-4.456v2.228M7.434 16.504h13.37" />
    </G>
  </Svg>
);
export default GarageSvg;
