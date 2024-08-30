import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';

const LibraryIconWhite = (props: SvgProps) => (
  <Animatable.View
    animation="bounce"
    duration={2000} // Sets the duration of the animation to 2000ms (2 seconds)
    style={{ width: 24, height: 24 }} // Ensures the SVG fits the container
  >
    <Svg
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke="#fff"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v16M9 4v16m5-15.75L20 20"
      />
    </Svg>
  </Animatable.View>
);

export default LibraryIconWhite;
