import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgHeardFillSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G strokeWidth={2} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <Path
        d="M2 10.24c-1.08-3.35.18-7.52 3.7-8.65a4.88 4.88 0 0 1 5.43 1.69 4.73 4.73 0 0 1 5.42-1.69c3.51 1.13 4.77 5.3 3.7 8.65-1.67 5.31-7.5 8.07-9.12 8.07-1.62 0-7.39-2.7-9.13-8.07Z"
        stroke="#F8312F"
        fill="#F8312F"
      />
      <Path d="M14.88 5.35a2.16 2.16 0 0 1 1.93 2.37v.06" stroke="#FFF" />
    </G>
  </Svg>
);
export default SvgHeardFillSvg;
