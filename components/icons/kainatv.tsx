import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const XComponent = (props: SvgProps) => (
  <Svg
    
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M22.159 3.75h3.817l-8.34 9.53 9.81 12.97h-7.68l-6.017-7.866-6.884 7.866H3.046l8.92-10.194L2.555 3.75h7.876l5.438 7.19 6.29-7.19Zm-1.34 20.215h2.115L9.282 5.915h-2.27l13.807 18.05Z"
    />
  </Svg>
)
export default XComponent
