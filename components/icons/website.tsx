import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const WebsiteIcon= (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeWidth={2}
      d="M2.999 12.116c-1.291.695-2.001 1.322-1.883 1.765.286 1.067 5.275.658 11.143-.915 5.868-1.572 10.394-3.712 10.108-4.779-.119-.442-1.048-.63-2.514-.587M3 12.116A9 9 0 1 0 19.854 7.6M2.998 12.116A9.004 9.004 0 0 1 19.854 7.6"
    />
  </Svg>
)
export default WebsiteIcon
