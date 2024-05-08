import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function DeleteSvg(props) {
  return (
    <Svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 27.76"
      {...props}
      width={26}
      height={26}
      stroke={"red"}
      fill={"none"}
      strokeWidth={2}
    >
      <Defs></Defs>
      <G id="Iconly_Curved_Light_Delete">
        <G id="Delete">
          <Path
            id="Stroke_1"
            className="cls-1"
            d="M17.42 9.53c0 8.02 1.15 11.64-6.61 11.64S4.22 17.55 4.22 9.53"
            stroke={"red"}
            fill={"none"}
          />
          <Path id="Stroke_3" className="cls-1" d="M18.9 6.45H2.75" stroke={"red"} />
          <Path id="Stroke_5" className="cls-1" d="M14.25 6.45s.53-3.77-3.43-3.77S7.4 6.45 7.4 6.45" stroke={"red"} />
        </G>
      </G>
    </Svg>
  );
}

export default DeleteSvg;
