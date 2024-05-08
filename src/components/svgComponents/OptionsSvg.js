import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgOptionsSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G stroke="#130F26" strokeWidth={1.5} {...props} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9.38 14.14H.94M10.46 14.14c0 2.67.88 3.55 3.55 3.55s3.55-.88 3.55-3.55-.89-3.55-3.55-3.55c-2.66 0-3.55.89-3.55 3.55ZM9.12 4.79h8.44M8 4.79c0-2.66-.89-3.55-3.55-3.55C1.79 1.24.9 2.13.9 4.79c0 2.66.89 3.55 3.55 3.55C7.11 8.34 8 7.46 8 4.79Z" />
    </G>
  </Svg>
);
export default SvgOptionsSvg;
