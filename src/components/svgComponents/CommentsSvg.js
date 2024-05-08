import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function SvgCommentsSvg(props) {
  return (
    <Svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <Defs></Defs>
      <G id="Group_420">
        <Path
          id="Path_454"
          d="M3 12a9 9 0 119 9H3v-9z"
          strokeLinejoin="round"
          fill="none"
          stroke={props.stroke || "#b8b8bc"}
          strokeWidth="2px"
        />
        <Path id="Path_455" className="cls-1" d="M7.75 14.25h5.5" />
        <Path id="Path_456" className="cls-1" d="M7.75 10.25h8.5" />
      </G>
    </Svg>
  );
}

export default SvgCommentsSvg;
