import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";

const SvgAlertSvg = (props) => (
  <Svg width="28" height="28" viewBox="0 0 31 31" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G transform="translate(1.748 2.67)" stroke="#FFCC00" fill="none" fillRule="evenodd">
      <Path
        d="M13.502 25.59c-9.23 0-12.85-.66-13.44-4-.59-3.34 3.19-9.54 4.33-11.59 3.87-6.89 6.5-10 9.11-10 2.61 0 5.24 3.1 9.11 10 1.16 2.05 4.91 8.3 4.33 11.61-.58 3.31-4.21 3.98-13.44 3.98Z"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle fill="#FFCC00" cx={13.502} cy={17.891} r={1.25} />
      <Path strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" d="M13.502 7.82v5.51" />
    </G>
  </Svg>
);
export default SvgAlertSvg;
