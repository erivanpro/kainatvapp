import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const BottomIconSvg = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="square"
      strokeWidth={2}
      d="M5 8.011 12 3l7 5.011m-14 0V20h7M5 8.011l-2.5 1.79M19 8.011l2.5 1.79M19 8.011V10"
    />
    <Path
      stroke="#000"
      strokeLinecap="square"
      strokeWidth={2}
      d="M5 8.011 12 3l7 5.011m-14 0V20h7M5 8.011l-2.5 1.79M19 8.011l2.5 1.79M19 8.011V10"
    />
    <Path fill="#000" d="M19.5 13 15 18.5h2.5V22l4.5-5.5h-2.5V13Z" />
    <Path
      stroke="#000"
      strokeLinecap="square"
      strokeWidth={2}
      d="M9.5 12a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"
    />
  </Svg>
)
export default BottomIconSvg
