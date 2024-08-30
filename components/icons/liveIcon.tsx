import React, { useState, useEffect } from 'react';
import Svg, { SvgProps, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';

// Define the component
const LiveIcon = (props: SvgProps) => {
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
          strokeLinecap="square"
          strokeWidth={2}
          d="M5.636 5.637A8.972 8.972 0 0 0 3 12a8.972 8.972 0 0 0 2.636 6.364m2.828-9.9A4.984 4.984 0 0 0 7 12.001c0 1.38.56 2.63 1.464 3.535m7.072 0A4.984 4.984 0 0 0 17 12.001c0-1.381-.56-2.631-1.464-3.536m2.828 9.9A8.972 8.972 0 0 0 21 12a8.972 8.972 0 0 0-2.636-6.364M13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        />
      </Svg>
    </Animatable.View>
  );
};

export default LiveIcon;
