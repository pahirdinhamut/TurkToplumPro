import * as React from "react";
import Svg, { G, Path, Rect } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const FloorSvg = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={22} height={32} viewBox={"0 0 25.152 37.333"}>
    <G fill="none" fillRule="evenodd" stroke="#757575" transform="translate(.2 .952)">
      <Path strokeLinecap="round" d="M12.5 30.231v5" />
      <Rect width={9} height={5} x={7.8} y={30.231} rx={1} />
      <Path strokeLinecap="round" strokeWidth={1.3} d="M1 10.731v25" />
      <Rect width={2.2} height={2.2} x={5.4} y={12.131} fill="#000" strokeWidth={0.8} rx={1} />
      <Rect width={2.2} height={2.2} x={11.4} y={12.131} fill="#000" strokeWidth={0.8} rx={1} />
      <Rect width={2.2} height={2.2} x={11.4} y={18.131} fill="#000" strokeWidth={0.8} rx={1} />
      <Rect width={2.2} height={2.2} x={17.4} y={18.131} fill="#000" strokeWidth={0.8} rx={1} />
      <Rect width={2.2} height={2.2} x={5.4} y={18.131} fill="#000" strokeWidth={0.8} rx={1} />
      <Rect width={2.2} height={2.2} x={5.4} y={24.131} fill="#000" strokeWidth={0.8} rx={1} />
      <Rect width={2.2} height={2.2} x={11.4} y={24.131} fill="#000" strokeWidth={0.8} rx={1} />
      <Rect width={2.2} height={2.2} x={17.4} y={24.131} fill="#000" strokeWidth={0.8} rx={1} />
      <Rect width={2.2} height={2.2} x={17.4} y={12.131} fill="#000" strokeWidth={0.8} rx={1} />
      <Path strokeLinecap="round" strokeWidth={1.3} d="M23.5 10.731v25M1.5 35.731h22" />
      <Path strokeLinecap="round" strokeWidth={1.4} d="m12.5 3.231-12 7M24 10.231l-11.5-7" />
    </G>
  </Svg>
);
export default FloorSvg;
