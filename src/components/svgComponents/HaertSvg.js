import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgHaertSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 22 19" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G
      stroke={props.stroke}
      strokeWidth={1.5}
      fill={props.fill ? props.fill : "none"}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M2.12 9.89c-1.07-3.35.18-7.52 3.7-8.65a4.87 4.87 0 0 1 5.43 1.69 4.74 4.74 0 0 1 5.42-1.69c3.52 1.13 4.78 5.3 3.71 8.65-1.67 5.31-7.5 8.08-9.13 8.08-1.63 0-7.4-2.71-9.13-8.08Z" />
      <Path d="M15 5a2.15 2.15 0 0 1 1.92 2.36v.06" stroke={props.innerStroke} />
    </G>
  </Svg>
);
export default SvgHaertSvg;
