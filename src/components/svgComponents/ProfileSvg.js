import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgProfileSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 16 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G
      stroke={props.stroke || "#130F26"}
      strokeWidth={1.5}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M8.25 20.08c-3.69 0-6.84-.57-6.84-2.87 0-2.3 3.13-4.43 6.84-4.43s6.84 2.1 6.84 4.4c0 2.3-3.09 2.9-6.84 2.9ZM8.24 9.6A4.38 4.38 0 1 0 8.22.84a4.38 4.38 0 0 0 .02 8.76h0Z" />
    </G>
  </Svg>
);
export default SvgProfileSvg;
