import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const CloseComponent = (props: SvgProps) => (
    <Svg
    width={33}
    height={33}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="square"
      strokeWidth={2}
      d="m11 11 11 11m0-11L11 22"
    />
  </Svg>
)
export default CloseComponent
