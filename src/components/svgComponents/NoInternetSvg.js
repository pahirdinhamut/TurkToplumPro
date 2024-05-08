import * as React from "react";
import Svg, { Path } from "react-native-svg";

function NoInternetSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "70"}
      height={props.height ? props.height : "70"}
      viewBox="0 0 128.000000 128.000000"
      fill={props.fill ? props.fill : "red"}
      {...props}
    >
      <Path
        d="M517 1110c-162-28-293-170-305-331-5-70-6-72-39-85-18-8-52-31-75-52-118-107-118-297 0-404 82-74 70-72 525-76 453-4 492 0 560 52 63 48 91 106 91 186 0 77-31 141-89 186-28 21-33 31-29 53 16 79-49 170-136 191-27 6-53 9-59 6-5-3-23 23-39 59-54 114-154 191-277 214-64 12-60 12-128 1zm65-407l58-57 58 57c58 58 84 67 123 47 13-7 19-21 19-43 0-25-12-43-57-89l-57-58 57-58c45-46 57-64 57-89 0-22-6-36-19-43-39-20-65-11-123 47l-58 57-58-57c-61-61-91-70-124-40s-22 63 39 125l57 58-57 58c-61 61-70 91-40 124s63 22 125-39z"
        transform="matrix(.1 0 0 -.1 0 128)"
      />
    </Svg>
  );
}

export default NoInternetSvg;
