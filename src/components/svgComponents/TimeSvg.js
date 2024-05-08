import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgTimeSvg = (props) => (
  <Svg width="22" height="22" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G stroke={props.stroke} strokeWidth={1.5} fill={props.fill} fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M1 10.47c0 6.93 2.31 9.25 9.25 9.25 6.94 0 9.25-2.32 9.25-9.25s-2.31-9.25-9.25-9.25C3.31 1.22 1 3.53 1 10.47Z" />
      <Path d="m13.64 12.49-3.39-2V6.1" />
    </G>
  </Svg>
);
export default SvgTimeSvg;
