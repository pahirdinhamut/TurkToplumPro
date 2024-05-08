import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgThemeSvg = (props) => (
  <Svg width={props.width ? props.width : "22"} height={props.height ? props.height : "22"} viewBox="0 0 19 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M17.45 14.55c.63 1.63-5.26 6.76-11.21 4.11A8.82 8.82 0 0 1 1.77 7C4.24 1.46 11.28.35 12.16 2.61c.5 1.31-2.41 5.1-1.51 7.44.9 2.34 6.17 2.86 6.8 4.5Z"
      stroke={props.stroke || "#130F26"}
      strokeWidth={1.5}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgThemeSvg;
