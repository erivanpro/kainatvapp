import * as React from "react"
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Circle,
  Path,
} from "react-native-svg"
const PhotoPink = (props: SvgProps) => (
  <Svg  width={93} height={93} {...props}>
    <Defs>
      <LinearGradient
        id="a"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#f16b9c" />
        <Stop offset={1} stopColor="#f32872" />
      </LinearGradient>
    </Defs>
    <G data-name="Image profil" transform="translate(-.5)">
      <Circle
        cx={46.5}
        cy={46.5}
        r={46.5}
        fill="url(#a)"
        data-name="Ellipse 5"
        transform="translate(.5)"
      />
      <Path
        fill="#fff"
        d="M32.25 33.25v-4.5h3v4.5h4.5v3h-4.5v4.5h-3v-4.5h-4.5v-3Zm4.5 9v-4.5h4.5v-4.5h10.5l2.745 3h4.755a3.009 3.009 0 0 1 3 3v18a3.009 3.009 0 0 1-3 3h-24a3.009 3.009 0 0 1-3-3v-15Zm10.5 13.5a7.5 7.5 0 1 0-7.5-7.5 7.5 7.5 0 0 0 7.5 7.5Zm-4.8-7.5a4.8 4.8 0 1 0 4.8-4.8 4.795 4.795 0 0 0-4.8 4.8Z"
        data-name="Icon material-add-a-photo"
      />
    </G>
  </Svg>
)
export default PhotoPink
