import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const PlusPink = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#EB315E"
      strokeLinecap="square"
      strokeWidth={2}
      d="M12 4v8m0 0v8m0-8H4m8 0h8"
    />
  </Svg>
)
export default PlusPink
