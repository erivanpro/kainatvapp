import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LoveButtonComplete= (props: SvgProps) => (
  <Svg
    width={20}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill="#F15991"
      d="M10.488 18.372c8.528-4.78 10.626-10.47 9.022-14.47C18.731 1.962 17.097.57 15.17.14c-1.698-.378-3.553.003-5.17 1.287C8.383.142 6.528-.24 4.83.139 2.902.57 1.267 1.961.49 3.903c-1.605 4 .494 9.69 9.022 14.47l.489.274.488-.274Z"
    />
  </Svg>
)
export default LoveButtonComplete
