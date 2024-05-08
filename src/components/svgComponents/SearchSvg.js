import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

const SvgSearchSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G transform="translate(.87 .86)" stroke={props.stroke || "#130F26"} strokeWidth={1.5} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <Circle cx={8.99} cy={8.99} r={8.99} />
      <Path d="m15.24 15.7 3.52 3.52" />
    </G>
  </Svg>
);
export default SvgSearchSvg;
