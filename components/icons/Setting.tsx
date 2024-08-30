import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
const SettingIconSvg = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Circle cx={12} cy={12} r={9} stroke="#fff" strokeWidth={2} />
    <Path
      fill="#fff"
      d="M13.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM16.129 11.604l-.273-1.98-.413.056c-1.141.16-2.29.32-3.441.32-1.151 0-2.3-.16-3.441-.32l-.414-.057-.272 1.981c1.028.142 2.054.282 3.09.354a5.207 5.207 0 0 1-.32 1.405c-.254.648-.67 1.264-1.342 1.922l-.715.699 1.398 1.43.715-.699a8.159 8.159 0 0 0 1.342-1.673c.316.56.72 1.106 1.234 1.647l.689.725 1.45-1.378-.69-.725c-.976-1.028-1.43-2.037-1.626-3.357 1.016-.073 2.02-.211 3.029-.35Z"
    />
  </Svg>
)
export default SettingIconSvg
