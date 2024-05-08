import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgEditSvg = (props) => (
  <Svg
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 18 18"
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
      <Path d="M10.6 17H17M13.33 2.32h0a3 3 0 0 0-4.26.6l-6.75 9c-1.74 2.32-.1 5.19-.1 5.19s3.25.75 5-1.54l6.75-9a3 3 0 0 0-.64-4.25h0ZM7.77 4.67l4.86 3.65" />
    </G>
  </Svg>
);
export default SvgEditSvg;
