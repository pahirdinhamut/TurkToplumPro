import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgSelectSvg = (props) => (
  <Svg
    width={props.width || "24"}
    height={props.height || "24"}
    viewBox="0 0 21 21"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1 10.47c0 6.93 2.31 9.25 9.25 9.25 2.5 0 4.399-.301 5.805-1.01 1.962-.988 2.966-2.77 3.308-5.635.093-.785.137-1.651.137-2.605 0-6.93-2.31-9.25-9.25-9.25C3.31 1.22 1 3.53 1 10.47Z"
      stroke={
        props.stroke || "#050640"
      }
      strokeWidth={1.5}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgSelectSvg;
