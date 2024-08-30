import * as React from "react"
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
export default function CameraComponent(props) {
  return (
    <Svg
    data-name="Groupe 250"
    xmlns="http://www.w3.org/2000/svg"
    width={440.787}
    height={349.618}
    viewBox="0 0 440.787 349.618"
    {...props}
  >
    <Defs>
      <ClipPath id="a">
        <Path
          data-name="Rectangle 102"
          fill="none"
          stroke="#d6d6d6"
          strokeWidth={1}
          d="M0 0H440.787V349.618H0z"
        />
      </ClipPath>
    </Defs>
    <G data-name="Groupe 249" clipPath="url(#a)">
      <Path
        data-name="Trac\xE9 186"
        d="M437.426 322.59a14.917 14.917 0 01-22.12 13.312l-122.837-67.906v78.261H3.362V124.383h35.231c-20.91-10.555-28.508-32.137-28.508-57.149a63.873 63.873 0 01127.745 0c0 25.011-7.6 46.593-28.507 57.149h77.185c-20.91-10.556-28.507-32.138-28.507-57.149a63.873 63.873 0 01127.745 0c0 25.011-7.6 46.593-28.507 57.149h35.231v80.479l119.072-71.739a14.9 14.9 0 0122.589 12.439z"
        fill="none"
        stroke="#d6d6d6"
        strokeMiterlimit={10}
        strokeWidth={1}
      />
    </G>
  </Svg>
  )
}