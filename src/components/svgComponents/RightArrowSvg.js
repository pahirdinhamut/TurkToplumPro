import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const RightArrowSvg = (props) => (
  <Svg
    {...props}
    height={props.height || 800}
    width={props.width || 800}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 330 330"
    xmlSpace="preserve"
  >
    <Path
      stroke={"red"}
      d="m250.606 154.389-150-149.996c-5.857-5.858-15.355-5.858-21.213.001-5.857 5.858-5.857 15.355.001 21.213l139.393 139.39L79.393 304.394c-5.857 5.858-5.857 15.355.001 21.213C82.322 328.536 86.161 330 90 330s7.678-1.464 10.607-4.394l149.999-150.004a14.996 14.996 0 0 0 0-21.213z"
    />
  </Svg>
);

export default RightArrowSvg;
