import React, { useState, useEffect } from 'react';
import Svg, { SvgProps, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';

const KainaTvIcon = (props: SvgProps) => {
  // State to hold the stroke color
  const [strokeColor, setStrokeColor] = useState('black');

  // Effect to toggle color every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStrokeColor(prevColor => prevColor === 'black' ? 'url(#gradient)' : 'black');
    }, 3000); // Change color every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <Animatable.View
      animation="bounce"
      duration={3000} // Duration of the animation
      style={{ width: 24, height: 24 }} // Ensures the SVG fits the container
    >
      <Svg
        width={24}
        height={24}
        fill="none"
        {...props}
      >
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#F56398" />
            <Stop offset="100%" stopColor="#F32872" />
          </LinearGradient>
        </Defs>
        <Path
          stroke={strokeColor} // Use the stroke color from state
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18 20c-1.886-.649-3.903-1-6-1s-4.114.351-6 1M3 4h18v12H3V4Z"
        />
      </Svg>
    </Animatable.View>
  );
};

export default KainaTvIcon;
