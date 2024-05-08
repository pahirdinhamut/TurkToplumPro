import * as React from "react";
import Svg, { Defs, Path, G, Mask, Use } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */

const EuroFillSvg = (props) => (
  <Svg {...props} width={21} height={21} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <Defs>
      <Path id="a" d="M0 0h7.56v9.01H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M.89 10.81c0 6.94 2.32 9.25 9.25 9.25s9.25-2.31 9.25-9.25c0-6.94-2.31-9.25-9.25-9.25C3.2 1.56.89 3.88.89 10.81Z"
        stroke="#130F26"
        strokeWidth={1.5}
        fill="#130F26"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G transform="translate(5.72 6.31)">
        <Mask id="b" fill="#fff">
          <Use xlinkHref="#a" />
        </Mask>
        <G mask="url(#b)" fill="#FFF" fillRule="nonzero">
          <Path d="M7.56 8.38a.62.62 0 0 1-.58.63H5.74a3.88 3.88 0 0 1-4-3.12H.47a.51.51 0 0 1-.42-.57.5.5 0 0 1 .42-.42h1.14v-.39a3.17 3.17 0 0 1 0-.44H.46a.48.48 0 0 1-.45-.49.47.47 0 0 1 .45-.49h1.28a3.87 3.87 0 0 1 4-3.09h1.24a.59.59 0 0 1 .58.63.61.61 0 0 1-.58.64H5.74a2.59 2.59 0 0 0-2.67 1.82h3.11a.46.46 0 0 1 .45.48.48.48 0 0 1-.45.49H2.89a3.15 3.15 0 0 0 0 .44v.39h3.3a.5.5 0 0 1 .42.57.53.53 0 0 1-.42.42H3.07a2.6 2.6 0 0 0 2.68 1.85h1.24a.61.61 0 0 1 .58.64" />
        </G>
      </G>
    </G>
  </Svg>
);

export default EuroFillSvg;
