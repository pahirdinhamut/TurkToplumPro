import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgSendFillSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M21.46 10.81C21.46 3.08 18.88.5 11.14.5S.83 3.08.83 10.81s2.58 10.32 10.31 10.32 10.32-2.58 10.32-10.32Z" fill={props.fill} fillRule="nonzero" />
      <Path
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.14 6.26v9.11M7 10.45s2.82-4.2 4.18-4.2c1.36 0 4.18 4.2 4.18 4.2"
      />
    </G>
  </Svg>
);
export default SvgSendFillSvg;
