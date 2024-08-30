import * as React from "react"
import Svg, { SvgProps, Defs, ClipPath, Path, G } from "react-native-svg"
const CameraComponent = (props: SvgProps) => (
  <Svg
    width={440.787}
    height={349.618}
    data-name="Groupe 250"
    {...props}
  >
    <Defs>
      <ClipPath id="a">
        <Path
          fill="none"
          stroke="#d6d6d6"
          d="M0 0h440.787v349.618H0z"
          data-name="Rectangle 102"
        />
      </ClipPath>
    </Defs>
    <G clipPath="url(#a)" data-name="Groupe 249">
      <Path
        fill="none"
        stroke="#d6d6d6"
        strokeMiterlimit={10}
        d="M437.426 322.59a14.917 14.917 0 0 1-22.12 13.312l-122.837-67.906v78.261H3.362V124.383h35.231c-20.91-10.555-28.508-32.137-28.508-57.149a63.873 63.873 0 0 1 127.745 0c0 25.011-7.6 46.593-28.507 57.149h77.185c-20.91-10.556-28.507-32.138-28.507-57.149a63.873 63.873 0 0 1 127.745 0c0 25.011-7.6 46.593-28.507 57.149h35.231v80.479l119.072-71.739a14.9 14.9 0 0 1 22.589 12.439Z"
        data-name="Trac\xE9 186"
      />
    </G>
  </Svg>
)
export default CameraComponent
