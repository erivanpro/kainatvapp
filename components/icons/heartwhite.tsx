import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const HeartWhite = (props: SvgProps) => (
  <Svg
    
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeWidth={2}
      d="M21 10c0 5.75-8.25 10-9 10s-9-4.25-9-10c0-4 2.5-6 5-6s4 1.5 4 1.5S13.5 4 16 4s5 2 5 6Z"
    />
  </Svg>
)
export default  HeartWhite
