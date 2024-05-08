import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgHomeSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 22 23" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G
      stroke={props.stroke || "#130F26"}
      strokeWidth={1.5}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M8.34 15.6h5.82M1.66 13.18c0-5.63.62-5.24 3.92-8.3 1.45-1.17 3.7-3.41 5.64-3.41 1.94 0 4.24 2.23 5.7 3.41 3.3 3.06 3.92 2.67 3.92 8.3 0 8.29-2 8.29-9.59 8.29s-9.59 0-9.59-8.29Z" />
    </G>
  </Svg>
);
export default SvgHomeSvg;
