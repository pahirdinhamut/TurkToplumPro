import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

function SuccessSvg(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 256 256" {...props}>
      <G
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
        stroke="none"
        strokeWidth={0}
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        fill="none"
        fillRule="nonzero"
        opacity={1}
      >
        <Circle
          cx={45}
          cy={45}
          r={45}
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#28c937"
          fillRule="nonzero"
          opacity={1}
        />
        <Path
          d="M38.478 64.5h-.029a4.505 4.505 0 01-3.381-1.563L21.59 47.284a4.5 4.5 0 116.821-5.873l10.112 11.744L61.629 27.02a4.5 4.5 0 116.743 5.961l-26.521 30a4.507 4.507 0 01-3.373 1.519z"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#fff"
          fillRule="nonzero"
          opacity={1}
        />
      </G>
    </Svg>
  );
}

export default SuccessSvg;
