import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponentFilter = (props: SvgProps) => (
  <Svg
    
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M13.458 2.375a3.167 3.167 0 0 0-3.067 2.375H3.167a.792.792 0 1 0 0 1.583h7.224a3.167 3.167 0 1 0 3.067-3.958ZM7.125 10.292a3.167 3.167 0 0 0-3.067 2.375h-.891a.792.792 0 1 0 0 1.583h.891a3.167 3.167 0 0 0 6.134 0h5.641a.792.792 0 1 0 0-1.583h-5.641a3.167 3.167 0 0 0-3.067-2.375Z"
    />
  </Svg>
)
export default SvgComponentFilter
