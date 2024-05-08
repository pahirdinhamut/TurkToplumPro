import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgLocationSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 17 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G {...props} stroke={
      props.color ? props.color : "#130F26"
    } strokeWidth={1.5} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M10.76 9.13a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0h0Z" />
      <Path d="M8.25 19.42c-2.9 0-7.5-5-7.5-10.4a7.5 7.5 0 0 1 15 0h0c0 5.36-4.6 10.4-7.5 10.4Z" />
    </G>
  </Svg>
);
export default SvgLocationSvg;
