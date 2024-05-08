import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgOptionFillSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G stroke={props.fill} strokeWidth={2} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M10.28 14.89H1.83" />
      <Path
        d="M11.35 14.89c0 2.66.89 3.55 3.55 3.55 2.66 0 3.55-.89 3.55-3.55 0-2.66-.89-3.55-3.55-3.55-2.66 0-3.55.88-3.55 3.55Z"
        fill={props.fill}
        fillRule="nonzero"
      />
      <Path d="M10 5.54h8.45" />
      <Path
        d="M8.93 5.54c0-2.67-.88-3.55-3.55-3.55s-3.55.88-3.55 3.55.89 3.55 3.55 3.55c2.66 0 3.55-.89 3.55-3.55Z"
        fill={props.fill}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);
export default SvgOptionFillSvg;
