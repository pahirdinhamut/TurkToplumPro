import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function ShopSvg(props) {
  return (
    <Svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45.88 45.88"
      {...props}
      fill={"#0CA0ED"}
      stroke={"#FFFFFF"}
      width={props.width ? props.width : 40}
      height={props.height ? props.height : 40}
    >
      <Defs></Defs>
      <G id="Group_619">
        <G id="Group_589">
          <G id="Group_614">
            <G id="Group_613">
              <Path
                id="Path_540"
                d="M38.2 15.43l-.12-.14a4.592 4.592 0 00-3.11-1.37c-1.32-.17-5.33-.19-9.48-.19h-4.44c-1.66-.04-3.32 0-4.97.16-.68.03-1.34.21-1.94.53v-2.19c0-2.34-1.9-4.24-4.24-4.24H7.98c-.65 0-1.18.53-1.18 1.18 0 .65.53 1.18 1.18 1.18H9.9c1.04 0 1.89.85 1.89 1.89v10.74c-.04 1.65 0 3.3.16 4.94.04 1.06.45 2.08 1.15 2.87l.11.11c.78.69 1.77 1.09 2.81 1.14.44.04.89.07 1.33.09a3.479 3.479 0 00.18 4.92 3.479 3.479 0 004.98-4.85h5.83c-.56.63-.87 1.44-.87 2.27a3.474 3.474 0 105.97-2.4 4.59 4.59 0 002.57-.92l.1-.09c.67-.63 1.13-1.45 1.33-2.34.35-1.38.63-2.78.83-4.19.37-1.88.62-3.79.76-5.7.17-1.19-.13-2.39-.83-3.37M19.89 35.6c-.62 0-1.12-.5-1.12-1.12s.5-1.12 1.12-1.12 1.12.5 1.12 1.12c0 .62-.5 1.12-1.12 1.12m11.05 0c-.62 0-1.12-.5-1.12-1.12 0-.62.5-1.12 1.12-1.12.62 0 1.12.5 1.12 1.12 0 .62-.5 1.12-1.12 1.12"
                fill="#0ca0ed"
                stroke="#fff"
              />
              <Path id="Line_128" className="cls-1" d="M25.41 24.48L22.85 21.92" />
              <Path id="Line_129" className="cls-1" d="M27.98 21.92L25.41 24.48" />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default ShopSvg;
