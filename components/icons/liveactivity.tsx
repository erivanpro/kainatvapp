import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LiveIconSecond = (props: SvgProps) => (
  <Svg
  
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeWidth={2}
      d="M12 3a9 9 0 1 1-4 .936M12 6.5a5.5 5.5 0 1 1-5 3.206M10 12a2 2 0 1 0 2-2"
    />
  </Svg>
)
export default LiveIconSecond
