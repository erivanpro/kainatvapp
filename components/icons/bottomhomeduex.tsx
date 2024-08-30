import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';

const BottomIconSvgTwo = (props: SvgProps) => (
  <Animatable.View
    animation="bounce"
    duration={2000} // Duration of 2000ms
    style={{ width: 'auto', height: 'auto' }} // Ensure the SVG fits the container
  >
    <Svg
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke="#F32773"
        strokeLinecap="square"
        strokeWidth={2}
        d="M5 8.011 12 3l7 5.011m-14 0V20h7M5 8.011l-2.5 1.79M19 8.011l2.5 1.79M19 8.011V10"
      />
      <Path
        stroke="#F32773"
        strokeLinecap="square"
        strokeWidth={2}
        d="M5 8.011 12 3l7 5.011m-14 0V20h7M5 8.011l-2.5 1.79M19 8.011l2.5 1.79M19 8.011V10"
      />
      <Path fill="#F32773" d="M19.5 13 15 18.5h2.5V22l4.5-5.5h-2.5V13Z" />
      <Path
        stroke="#F32773"
        strokeLinecap="square"
        strokeWidth={2}
        d="M9.5 12a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"
      />
    </Svg>
  </Animatable.View>
);

export default BottomIconSvgTwo;
