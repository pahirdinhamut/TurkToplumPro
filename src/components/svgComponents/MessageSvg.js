import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgMessageSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G stroke="#130F26" strokeWidth={1.5} fill="none" fillRule="evenodd">
      <Path d="M1.25 10.47a9 9 0 1 1 9 9h-9v-9Z" strokeLinejoin="round" />
      <Path strokeLinecap="round" d="M6 12.72h5.5M6 8.72h8.5" />
    </G>
  </Svg>
);
export default SvgMessageSvg;
