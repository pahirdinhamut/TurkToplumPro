import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function SvgNewsSvg(props) {
  return (
    <Svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45.74 45.74"
      {...props}
      fill={"#0CA0ED"}
      stroke={"#FFFFFF"}
      width={props.width ? props.width : 40}
      height={props.height ? props.height : 40}
    >
      <Defs></Defs>
      <G id="Group_616">
        <G id="Group_606">
          <G id="Group_586">
            <G id="Group_581">
              <Path
                id="Path_286"
                d="M10.06 20.11c1.04-5.21 1.51-7.53 3.09-9.06.5-.48 1.06-.89 1.67-1.23 1.85-1.02 4.25-1.02 9.07-1.02s7.22 0 9.07 1.02c.61.34 1.17.75 1.67 1.23 1.58 1.53 2.04 3.85 3.09 9.06 1.23 6.14 1.93 9.63.73 12.28a8.1 8.1 0 01-1.64 2.38c-2.18 2.16-5.76 2.16-12.92 2.16H6.69l3.37-16.82z"
                fill="#0ca0ed"
                stroke="#ffeded"
              />
              <Path id="Line_4" className="cls-1" d="M17.02 27.76L25.9 27.76" />
              <Path id="Line_5" className="cls-1" d="M17.59 21L30.16 21" />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default SvgNewsSvg;
