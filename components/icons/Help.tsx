import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const  HelpIconSvg = (props: SvgProps) => (
  <Svg
  width={24}
  height={24}
  fill="none"
  {...props}
>
  <Path
    fill="#fff"
    d="M19 8h1V7h-1v1Zm-4 4.5.316.949.684-.228V12.5h-1Zm-.628.21.316.948-.316-.949ZM11 16v1h2v-1h-2Zm0-7v1h2V9h-2ZM7.5 6.75V11h2V6.75h-2Zm-3.5 0V14h2V6.75H4ZM6.75 6a.75.75 0 0 1 .75.75h2A2.75 2.75 0 0 0 6.75 4v2Zm0-2A2.75 2.75 0 0 0 4 6.75h2A.75.75 0 0 1 6.75 6V4ZM18 14a6 6 0 0 1-6 6v2a8 8 0 0 0 8-8h-2Zm-6 6a6 6 0 0 1-6-6H4a8 8 0 0 0 8 8v-2ZM9.5 10V4.75h-2V10h2Zm.75-6a.75.75 0 0 1 .75.75h2A2.75 2.75 0 0 0 10.25 2v2Zm-.75.75a.75.75 0 0 1 .75-.75V2A2.75 2.75 0 0 0 7.5 4.75h2Zm5 1v3.591h2V5.75h-2ZM13.75 5a.75.75 0 0 1 .75.75h2A2.75 2.75 0 0 0 13.75 3v2Zm-.75.75a.75.75 0 0 1 .75-.75V3A2.75 2.75 0 0 0 11 5.75h2ZM20 14V8h-2v6h2Zm-1-7h-1v2h1V7Zm-5 4v1.5h2V11h-2Zm.684.551-.628.21.632 1.897.628-.21-.632-1.897Zm-.628.21A4.469 4.469 0 0 0 11 16h2c0-1.063.68-2.006 1.688-2.342l-.633-1.897ZM18 7a4 4 0 0 0-4 4h2a2 2 0 0 1 2-2V7Zm-7-2.25v1h2v-1h-2ZM13 9V5.75h-2V9h2Z"
  />
</Svg>
)
export default HelpIconSvg
