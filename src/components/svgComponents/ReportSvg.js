import * as React from "react";
import Svg, { Defs, Path, Circle } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function ReportSvg(props) {
  return (
    <Svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      width={26}
      height={26}
      stroke={"black"}
      fill={"none"}
      strokeWidth={2}
    >
      <Defs></Defs>
      <Path id="Path_581" className="cls-1" d="M12 8.92v4.42" />
      <Circle
        cx="12"
        cy="16.52"
        r="0.5" // You can adjust the radius as needed
        stroke={"black"}
        fill={"black"}
      />
      <Path
        id="Path_585"
        className="cls-1"
        d="M21.25 12c0-6.94-2.31-9.25-9.25-9.25S2.75 5.06 2.75 12s2.31 9.25 9.25 9.25 9.25-2.31 9.25-9.25z"
      />
    </Svg>
  );
}

export default ReportSvg;
