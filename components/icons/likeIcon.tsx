import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LikeIcon= (props: SvgProps) => (
  <Svg
    
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#EB315E"
      strokeWidth={2}
      d="M12 5.768c6.162-6.25 16.725 5.358 0 14.732C-4.725 11.126 5.838-.482 12 5.768Z"
    />
  </Svg>
)
export default LikeIcon
