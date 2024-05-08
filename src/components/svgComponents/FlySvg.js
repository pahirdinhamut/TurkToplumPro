import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */

const FlySvg = (props) => (
  <Svg {...props} width={21} height={21} xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 21 21">
    <G
      stroke={props.stroke || "#130F26"}
      strokeWidth={1.5}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9.78 10.94s-12-2.48-7.82-4.88c3.51-2 15.62-5.51 17.31-4.61.9 1.69-2.59 13.79-4.61 17.3-2.41 4.17-4.88-7.81-4.88-7.81ZM9.78 10.94l9.49-9.49" />
    </G>
  </Svg>
);

export default FlySvg;
