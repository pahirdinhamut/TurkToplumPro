import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgAddSvg = (props) => (
  <Svg
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 33 33"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="M.25 16.54c0-12 4-15.95 16-15.95s15.94 4 15.94 15.95-4 16-15.94 16-16-4-16-16" fill="#2BBAF9" />
      <Path
        stroke="#050640"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.51 10.69v12.3M22.67 16.84H10.35"
      />
    </G>
  </Svg>
);
export default SvgAddSvg;
