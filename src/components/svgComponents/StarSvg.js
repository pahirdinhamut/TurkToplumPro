import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgStarSvg = (props) => (
  <Svg width="24" height="24" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M17.42 13.89a1.15 1.15 0 0 0-.33 1L18 20a1.16 1.16 0 0 1-1.69 1.21l-4.62-2.41a1.34 1.34 0 0 0-.52-.14h-.28a1 1 0 0 0-.29.1L6 21.21a1.24 1.24 0 0 1-.74.11A1.14 1.14 0 0 1 4.34 20l.92-5.13a1.13 1.13 0 0 0-.33-1l-3.76-3.65a1.13 1.13 0 0 1-.29-1.18 1.17 1.17 0 0 1 .93-.78l5.18-.76a1.15 1.15 0 0 0 .92-.63l2.29-4.69a1.1 1.1 0 0 1 .2-.28l.1-.07a.79.79 0 0 1 .17-.14h.11l.18-.07h.44c.389.039.732.272.91.62l2.31 4.67c.17.341.494.58.87.64l5.18.75c.459.039.85.345 1 .78a1.13 1.13 0 0 1-.3 1.18l-3.95 3.63Z"
      stroke="#130F26"
      strokeWidth={1.5}
      fill="none"
      fillRule="evenodd"
    />
  </Svg>
);
export default SvgStarSvg;
