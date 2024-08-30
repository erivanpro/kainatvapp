import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';

const SearchComponent = (props: SvgProps) => (
  <Animatable.View
    animation="shake"
    duration={1000} // Duration of the animation in milliseconds
    style={{ width: 24, height: 24 }} // Ensures the SVG fits the container
  >
    <Svg
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke="#536371"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m21 21-3.5-3.5m2.5-6a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"
      />
    </Svg>
  </Animatable.View>
);

export default SearchComponent;
