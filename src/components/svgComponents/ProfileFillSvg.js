import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgProfileFillSvg = (props) => (
  <Svg width={props.width ? props.width : "24"} height={props.height ? props.height : "24"} viewBox="0 0 16 22" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G fill={props.fill || "#130F26"} fillRule="nonzero" stroke={props.fill || "#130F26"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M8.14 20.43c-3.69 0-6.84-.57-6.84-2.87 0-2.3 3.13-4.43 6.84-4.43s6.85 2.1 6.85 4.4c0 2.3-3.13 2.9-6.85 2.9ZM8.14 9.94A4.37 4.37 0 1 0 8.1 1.2a4.37 4.37 0 0 0 .04 8.74h0Z" />
    </G>
  </Svg>
);
export default SvgProfileFillSvg;
