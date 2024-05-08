import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const IsFilterSvg = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={19} height={19}>
    <G fill="none" fillRule="evenodd" stroke="#130F26" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} {...props}>
      <Path d="M9.38 14.14H.94" />
      <Path fill={props.fill} d="M10.46 14.14c0 2.67.88 3.55 3.55 3.55s3.55-.88 3.55-3.55-.89-3.55-3.55-3.55c-2.66 0-3.55.89-3.55 3.55Z" />
      <Path d="M9.12 4.79h8.44" />
      <Path fill={props.fill} d="M8 4.79c0-2.66-.89-3.55-3.55-3.55C1.79 1.24.9 2.13.9 4.79c0 2.66.89 3.55 3.55 3.55C7.11 8.34 8 7.46 8 4.79Z" />
    </G>
  </Svg>
);
export default IsFilterSvg;
