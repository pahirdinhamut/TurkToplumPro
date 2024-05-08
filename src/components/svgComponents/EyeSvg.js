import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgEyeSvg = (props) => (
  <Svg
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 21 17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G
      stroke={props.stroke || "#130F26"}
      strokeWidth={1.5}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M13.41 8.47a3.16 3.16 0 1 1-6.32 0 3.16 3.16 0 0 1 6.32 0h0Z" />
      <Path d="M1 8.47c0 3.28 4.14 7.3 9.25 7.3s9.25-4 9.25-7.3-4.14-7.3-9.25-7.3S1 5.19 1 8.47Z" />
    </G>
  </Svg>
);
export default SvgEyeSvg;
