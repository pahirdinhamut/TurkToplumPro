import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgLocationFillSvg = (props) => (
  <Svg width="30" height="30" viewBox="0 0 27 32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M13.14 30.48c-4.72 0-12.22-8.22-12.22-17a12.221 12.221 0 1 1 24.44-.31c.01.103.01.207 0 .31 0 8.78-7.49 17-12.22 17Z"
        strokeWidth={1.5}
        fill={props.fill || "#050640"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M17.23 13.71a4.07 4.07 0 1 0-8.14 0 4.07 4.07 0 0 0 8.14 0Z" fill="#FFF" />
    </G>
  </Svg>
);
export default SvgLocationFillSvg;
