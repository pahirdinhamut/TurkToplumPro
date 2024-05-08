import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgNotificationSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 17 21" xmlns="http://www.w3.org/2000/svg" stroke={props.stroke || "#130F26"}>
    <G
      stroke={props.stroke || "#130F26"}
      strokeWidth={1.5}
      {...props}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M8.25.92c-4.43 0-6.36 4-6.36 6.67 0 2 .29 1.4-.81 3.82-1.35 3.45 4 4.86 7.17 4.86s8.51-1.41 7.17-4.86c-1.1-2.42-.81-1.83-.81-3.82 0-2.65-1.93-6.67-6.36-6.67ZM10.56 18.92a3 3 0 0 1-4.62 0" />
    </G>
  </Svg>
);
export default SvgNotificationSvg;
