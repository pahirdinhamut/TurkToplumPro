import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgImageSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G stroke={props.stroke || "#130F26"} strokeWidth={1.5} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M1 10.47c0 6.93 2.31 9.25 9.25 9.25 6.94 0 9.25-2.32 9.25-9.25s-2.31-9.25-9.25-9.25C3.31 1.22 1 3.53 1 10.47Z" />
      <Path d="M8.85 7.25a1.76 1.76 0 1 1-3.52 0 1.76 1.76 0 0 1 3.52 0h0ZM19.37 13.13c-.88-.9-2.13-2.73-4.42-2.73s-2.34 4-4.67 4-3.28-1.37-4.8-.65c-1.52.72-2.76 3.56-2.76 3.56" />
    </G>
  </Svg>
);
export default SvgImageSvg;
