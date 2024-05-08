import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */

const InfoSvg = (props) => (
  <Svg {...props} width={21} height={21} xmlns="http://www.w3.org/2000/svg">
    <G transform="translate(1.066 1.22)" fill="none" fillRule="evenodd">
      <Path
        stroke={props.stroke || "#130F26"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.218 12.32V7.9M0 9.25c0 6.93 2.302 9.25 9.218 9.25s9.218-2.32 9.218-9.25S16.134 0 9.218 0 0 2.31 0 9.25Z"
      />
      <Circle fill="#130F26" cx={9.084} cy={5.241} r={1} />
    </G>
  </Svg>
);

export default InfoSvg;
