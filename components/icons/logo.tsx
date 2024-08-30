import * as React from "react"
import Svg, { SvgProps, Defs, ClipPath, Path, G, Image } from "react-native-svg"
const LogoComponent= (props: SvgProps) => (
  <Svg
    width={34.633}
    height={36.926}
    {...props}
  >
    <Defs>
      <ClipPath id="a">
        <Path fill="none" d="M0 0h34.633v36.926H0z" data-name="Rectangle 64" />
      </ClipPath>
      <ClipPath id="b">
        <Path
          fill="none"
          d="M14.688 0 9.705 9.482H7.437V0H0v26.03h7.437v-9.482H9.78l5.317 9.482h9.036l-8.032-13.127 7.623-12.9Z"
          data-name="Trac\xE9 117"
        />
      </ClipPath>
      <ClipPath id="c">
        <Path fill="none" d="M0 0h24.134v26.03H0z" data-name="Rectangle 66" />
      </ClipPath>
    </Defs>
    <G data-name="Groupe 159">
      <G
        fill="none"
        stroke="#818285"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={3}
        clipPath="url(#a)"
        data-name="Groupe 158"
      >
        <Path d="M.294 4.594v-4.3h10.229" data-name="Trac\xE9 115" />
        <Path d="M23.807.294h10.229v4.3" data-name="Trac\xE9 116" />
      </G>
    </G>
    <G data-name="Groupe 164">
      <G
        clipPath="url(#b)"
        data-name="Groupe 163"
        transform="translate(5.409 5.409)"
      >
        <G data-name="Groupe 162">
          <G data-name="Groupe 161">
            <G clipPath="url(#c)" data-name="Groupe 160">
              <Image
                xlinkHref="data:image/png;base64,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"
                width={24.185}
                height={26.067}
                data-name="Rectangle 65"
                transform="translate(-.045 -.007)"
              />
            </G>
          </G>
        </G>
      </G>
    </G>
    <G data-name="Groupe 166">
      <G
        fill="none"
        stroke="#818285"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={3}
        clipPath="url(#a)"
        data-name="Groupe 165"
      >
        <Path d="M34.334 32.329v4.3H24.109" data-name="Trac\xE9 118" />
        <Path d="M10.826 36.628H.596v-4.3" data-name="Trac\xE9 119" />
      </G>
    </G>
  </Svg>
)
export default LogoComponent



