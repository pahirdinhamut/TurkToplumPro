import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgSettingsSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 19 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G
      stroke={props.stroke || "#130F26"}
      strokeWidth={1.5}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9.25 8a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
      <Path d="M17.42 5.72h0a2.46 2.46 0 0 0-3.36-.93h0a1.55 1.55 0 0 1-2.32-1.35A2.47 2.47 0 0 0 9.27.95h0a2.49 2.49 0 0 0-2.48 2.49 1.53 1.53 0 0 1-1.53 1.55 1.65 1.65 0 0 1-.78-.2 2.46 2.46 0 0 0-3.37.89h0a2.5 2.5 0 0 0 .91 3.4 1.55 1.55 0 0 1 .55 2.13 1.48 1.48 0 0 1-.55.56 2.5 2.5 0 0 0-.91 3.4 2.46 2.46 0 0 0 3.36.92h0a1.55 1.55 0 0 1 2.11.57c.132.239.201.507.2.78h0a2.49 2.49 0 0 0 2.47 2.5h0a2.48 2.48 0 0 0 2.47-2.49h0a1.54 1.54 0 0 1 2.32-1.35 2.47 2.47 0 0 0 3.37-.9h0a2.51 2.51 0 0 0-.91-3.4h0a1.57 1.57 0 0 1-.56-2.14 1.55 1.55 0 0 1 .56-.55 2.51 2.51 0 0 0 .92-3.39Z" />
    </G>
  </Svg>
);
export default SvgSettingsSvg;
