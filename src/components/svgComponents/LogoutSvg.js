import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgLogoutSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G stroke="#F8312F" strokeWidth={1.5} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M21 10.59H9M18.09 7.67 21 10.58l-2.93 2.92M15.58 6.1c-.33-3.58-1.67-4.88-7-4.88-7.1 0-7.1 2.31-7.1 9.25 0 6.94 0 9.25 7.1 9.25 5.33 0 6.67-1.3 7-4.88" />
    </G>
  </Svg>
);
export default SvgLogoutSvg;
