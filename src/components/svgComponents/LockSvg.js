import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgLockSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 19 23" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G
      stroke={props.stroke || "#130F26"}
      strokeWidth={1.5}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M14.15 8.65V6.34a4.9 4.9 0 1 0-9.8 0v2.33M9.25 13.76v2.38" />
      <Path d="M9.25 8c-6.17 0-8.23 1.68-8.23 6.73 0 5.05 2.06 6.74 8.23 6.74s8.23-1.68 8.23-6.73C17.48 9.69 15.42 8 9.25 8Z" />
    </G>
  </Svg>
);
export default SvgLockSvg;
