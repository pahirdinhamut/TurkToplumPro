import * as React from "react";
import Svg, { Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function NotFoundSvg(props) {
  return (
    <Svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.34 58.34" {...props} width={70} height={70}>
      <Defs></Defs>
      <Path
        id="Path_2247"
        d="M26.1 7.29c10.46-.07 18.99 8.36 19.05 18.82.07 10.46-8.36 18.99-18.82 19.05-10.46.07-18.99-8.36-19.05-18.82v-.12C7.25 15.79 15.67 7.32 26.1 7.28"
        fill="#0ca0ed"
      />
      <Path
        id="Path_2248"
        d="M48.15 50.96c-.73-.02-1.43-.33-1.95-.85l-4.46-5.21a2.385 2.385 0 01-.17-3.33 2.13 2.13 0 013.01-.03l.03.03 5.61 4.48c.81.83 1.05 2.05.63 3.13a2.908 2.908 0 01-2.58 1.86l-.12-.1z"
        opacity={0.5}
        fill="#0ca0ed"
      />

      <Path className="cls-3" d="M22.81 22.81L29.63 29.63" stroke={"white"} />
      <Path className="cls-3" d="M29.63 22.81L22.81 29.63" stroke={"white"} />
    </Svg>
  );
}

export default NotFoundSvg;
