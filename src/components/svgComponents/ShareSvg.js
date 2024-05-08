import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

const SvgShareSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G transform="translate(1.02 1.33)" stroke={props.stroke} strokeWidth={1.5} fill="none" fillRule="evenodd">
      <Circle cx={14.98} cy={14.8} r={3.48} />
      <Circle cx={3.48} cy={9.21} r={3.48} />
      <Path d="m11.54 13.25-1.56-1.21-1.3-1a2.47 2.47 0 0 1-.87-1.93" />
      <Circle cx={14.98} cy={3.48} r={3.48} />
      <Path d="M7.83 9.14A2.5 2.5 0 0 1 8.7 7.2l1.3-1 1.54-1.22" />
    </G>
  </Svg>
);
export default SvgShareSvg;
