import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgFilterSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M10.25 19.47c-2 0-2-2-2-5.4 0-3.4-7-5.78-7-9.5 0-3.15 2.79-3.1 9-3.1s9 0 9 3.1c0 3.72-7 6.1-7 9.5 0 3.4.01 5.4-2 5.4Z"
      stroke="#130F26"
      strokeWidth={1.5}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgFilterSvg;
