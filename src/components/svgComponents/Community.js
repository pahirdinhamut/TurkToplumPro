import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function Community(props) {
  return (
    <Svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45.88 45.88"
      {...props}
      fill={"#0CA0ED"}
      stroke={"#FFFFFF"}
      width={props.width ? props.width : 40}
      height={props.height ? props.height : 40}
    >
      <Defs></Defs>
      <G id="Iconly_Regular_Light_3_User">
        <G id="_3_User">
          <G id="Group_913">
            <Path
              id="Stroke_5"
              className="cls-1"
              d="M32.63 21.79c-3.9 0-7.23.87-7.23 4.37s3.31 4.39 7.23 4.39 7.22-.87 7.22-4.36-3.31-4.4-7.22-4.4z"
            />
            <Path
              id="Stroke_7"
              className="cls-1"
              d="M32.63 19.78c2.55 0 4.61-2.08 4.6-4.63 0-2.55-2.08-4.61-4.63-4.6-2.55 0-4.61 2.08-4.6 4.63 0 2.53 2.06 4.59 4.6 4.6h.03z"
            />
          </G>
          <G id="Group_914">
            <Path
              id="Stroke_5-2"
              className="cls-1"
              d="M13.25 21.79c-3.9 0-7.23.87-7.23 4.37s3.31 4.39 7.23 4.39 7.22-.87 7.22-4.36-3.31-4.4-7.22-4.4z"
            />
            <Path
              id="Stroke_7-2"
              className="cls-1"
              d="M13.25 19.78c2.55 0 4.61-2.08 4.6-4.63 0-2.55-2.08-4.61-4.63-4.6-2.55 0-4.61 2.08-4.6 4.63 0 2.53 2.06 4.59 4.6 4.6h.03z"
            />
          </G>
          <G id="Group_912">
            <Path
              id="Stroke_5-3"
              className="cls-1"
              d="M22.94 24.6c-5.23 0-9.69 1.17-9.69 5.86s4.44 5.89 9.69 5.89 9.69-1.16 9.69-5.85-4.43-5.9-9.69-5.9z"
            />
            <Path
              id="Stroke_7-3"
              className="cls-1"
              d="M22.94 21.91a6.188 6.188 0 006.17-6.21c-.01-3.42-2.79-6.18-6.21-6.17s-6.18 2.79-6.17 6.21c.01 3.4 2.77 6.15 6.17 6.17h.05z"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default Community;
