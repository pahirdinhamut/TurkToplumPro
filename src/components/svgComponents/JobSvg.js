import * as React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

function SvgJobSvg(props) {
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
      <Defs>
        <LinearGradient
          id="linear-gradient"
          x1={-543.54}
          y1={411.18}
          x2={-545.14}
          y2={412.8}
          gradientTransform="matrix(28.82 0 0 -15.46 15719.64 6400.82)"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0} stopColor="#0ca0ed" />
          <Stop offset={1} stopColor="#3bc3ff" />
        </LinearGradient>
      </Defs>
      <G id="Group_620">
        <G id="Group_615">
          <Path
            id="Path_534"
            d="M8.52 21.75c.07 3.37.27 9.14.3 9.78.09 1.35.59 2.64 1.43 3.7a5.324 5.324 0 004.46 1.97c2.68.01 5.63.01 8.49.01s5.67 0 8.03-.01c1.71.09 3.37-.64 4.45-1.97a6.494 6.494 0 001.4-3.7c.03-.53.17-6.8.26-9.77H8.52z"
            stroke="#fff"
            fill="url(#linear-gradient)"
          />
          <Path
            id="Path_535"
            d="M21.86 27.96v1.87c-.02.6.45 1.1 1.05 1.11.6.02 1.1-.45 1.11-1.05V27.95c.02-.6-.45-1.1-1.05-1.11-.6-.02-1.1.45-1.11 1.05v.07z"
            fill="#fff"
          />
          <Path
            id="Path_536"
            d="M20.37 26.77c-.14.52-.65.86-1.19.79-3.63-.49-7.1-1.78-10.16-3.78-.3-.2-.49-.54-.49-.9v-5c0-3.03 2.47-5.49 5.5-5.49h2.84a4.254 4.254 0 014.22-3.72h3.72c2.14 0 3.94 1.6 4.21 3.72h2.85c3.03 0 5.49 2.46 5.49 5.49v5c0 .36-.18.7-.49.9a24.71 24.71 0 01-10.21 3.79c-.05 0-.1.01-.15.01-.49 0-.93-.34-1.05-.82a2.6 2.6 0 00-2.53-1.95c-1.2 0-2.26.8-2.57 1.96zm4.43-15.94h-3.72c-.95 0-1.78.64-2.02 1.56h7.77a2.086 2.086 0 00-2.02-1.56z"
            fill="#0ca0ed"
            fillRule="evenodd"
            stroke="#fff"
          />
        </G>
      </G>
    </Svg>
  );
}

export default SvgJobSvg;
