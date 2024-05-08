import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgHomeFillSvg = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G strokeWidth={1.5} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <Path
          d="M1.56 12.53c0-5.63.61-5.24 3.91-8.3C6.92 3.06 9.17.81 11.11.81c1.94 0 4.24 2.24 5.7 3.41 3.31 3.07 3.92 2.68 3.92 8.3 0 8.29-2 8.29-9.59 8.29s-9.58 0-9.58-8.28Z"
          stroke={props.fill || "#130F26"}
          fill={props.fill || "#130F26"}
          fillRule="nonzero"
        />
        <Path stroke={props.lineColor || "#FFF"} d="M8.23 15h5.82" />
      </G>
    </Svg>
  );
};
export default SvgHomeFillSvg;
