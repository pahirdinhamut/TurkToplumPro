import * as React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function SvgHomeSaleSvg(props) {
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
          <Path d="M5.08 5.49H40.8V40.38H5.08z" fill="none" />
        </ClipPath>
      </Defs>
      <G id="Group_903" clipPath="url(#clippath)">
        <G id="Group_902">
          <Path
            id="Path_662"
            d="M24.9 19.02v-6.77a3.38 3.38 0 00-2.58-3.28L10.38 6.1c-2.09-.5-4.19.79-4.69 2.88-.07.3-.11.6-.11.9v24.99c0 2.76 2.24 5 5 5H35.3c2.76 0 5-2.24 5-5v-9.3c0-1.42-.89-2.68-2.22-3.17L24.9 19.01z"
            fill="#0ca0ed"
          />
          <Path
            id="Path_663"
            className="cls-3"
            d="M24.9 19.02v-6.77a3.38 3.38 0 00-2.58-3.28L10.38 6.1c-2.09-.5-4.19.79-4.69 2.88-.07.3-.11.6-.11.9v24.99c0 2.76 2.24 5 5 5H35.3c2.76 0 5-2.24 5-5v-9.3c0-1.42-.89-2.68-2.22-3.17L24.9 19.01z"
          />
          <Path id="Line_181" className="cls-2" d="M29.45 30.45L33.46 30.45" />
          <Path id="Line_182" className="cls-2" d="M29.45 27.85L33.46 27.85" />
          <Path id="Line_183" className="cls-2" d="M29.45 33.04L33.46 33.04" />
          <Path id="Line_184" className="cls-2" d="M9.96 16.36L13.97 16.36" />
          <Path id="Line_185" className="cls-2" d="M16.48 16.36L20.49 16.36" />
          <Path id="Line_186" className="cls-2" d="M9.96 20.97L13.97 20.97" />
          <Path id="Line_187" className="cls-2" d="M16.48 20.97L20.49 20.97" />
          <Path id="Line_188" className="cls-2" d="M9.96 25.59L13.97 25.59" />
          <Path id="Line_189" className="cls-2" d="M16.48 25.59L20.49 25.59" />
          <Path id="Line_190" className="cls-2" d="M9.96 30.2L13.97 30.2" />
          <Path id="Line_191" className="cls-2" d="M16.48 30.2L20.49 30.2" />
          <Path id="Path_664" className="cls-3" d="M14.65 34.39h1c1.1 0 2 .9 2 2v3.49h-5v-3.49c0-1.1.9-2 2-2z" />
        </G>
      </G>
    </Svg>
  );
}

export default SvgHomeSaleSvg;
