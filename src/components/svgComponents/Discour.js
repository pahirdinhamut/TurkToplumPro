import * as React from "react";
import Svg, { Defs, ClipPath, Path, G, Circle } from "react-native-svg";

function SvgDiscour(props) {
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
      <Defs>
        <ClipPath id="clippath">
          <Path d="M6.94 6.94H38.94V38.94H6.94z" fill="none" />
        </ClipPath>
      </Defs>
      <G id="Group_906">
        <G id="Group_905" clipPath="url(#clippath)">
          <G id="Group_904">
            <Circle
              id="Ellipse_18"
              cx={22.94}
              cy={22.94}
              r={14.84}
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#0ca0ed"
            />
          </G>
        </G>
        <Path
          id="Path_665"
          d="M17.78 28.1l2.46-7.86 7.86-2.46-2.46 7.86-7.86 2.46z"
          strokeWidth="1.5px"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </G>
    </Svg>
  );
}

export default SvgDiscour;
