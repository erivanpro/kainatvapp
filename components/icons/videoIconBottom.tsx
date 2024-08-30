import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const VideoBlack = (props: SvgProps) => (
  <Svg
    
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 20c-1.886-.649-3.903-1-6-1s-4.114.351-6 1M3 4h18v12H3V4Z"
    />
  </Svg>
)
export default VideoBlack
