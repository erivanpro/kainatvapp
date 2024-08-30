import * as React from "react"
import Svg, { SvgProps, Defs, ClipPath, Path, G } from "react-native-svg"
const MenuIconSVG = (props: SvgProps) => (
  <Svg  width={31} height={21} {...props}>
    <Defs>
      <ClipPath id="a">
        <Path fill="none" d="M0 0h31v21H0z" data-name="Rectangle 70" />
      </ClipPath>
    </Defs>
    <G fill="#d6d6d6" clipPath="url(#a)" data-name="Groupe 176">
      <Path
        d="M28.655 4.457H2.201a2.035 2.035 0 0 1 0-4.07h26.454a2.035 2.035 0 0 1 0 4.07"
        data-name="Trac\xE9 132"
      />
      <Path
        d="M22.55 12.597H2.201a2.035 2.035 0 0 1 0-4.07H22.55a2.035 2.035 0 0 1 0 4.07"
        data-name="Trac\xE9 133"
      />
      <Path
        d="M14.75 20.737H2.201a2.035 2.035 0 1 1 0-4.07H14.75a2.035 2.035 0 1 1 0 4.07"
        data-name="Trac\xE9 134"
      />
    </G>
  </Svg>
)
export default MenuIconSVG
