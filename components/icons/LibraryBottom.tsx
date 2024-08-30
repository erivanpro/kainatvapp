import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LibraryIcon= (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v16M9 4v16m5-15.75L20 20"
    />
  </Svg>
)
export default LibraryIcon
