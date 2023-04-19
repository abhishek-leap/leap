import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';

export const Slide = ({ children, leftP, duration, left }) => {
  const [leftPosition, setLeftPosition] = useState(new Animated.Value (leftP));

  useEffect(() => {
    left ? moveLR() : moveRL();
  }, []);

  const moveLR = () => {
    Animated.timing(leftPosition, {
      toValue: 0,
      duration, // the duration of the animation
      useNativeDriver: false,
      easing: Easing.linear, // the style of animation
    }).start(); // starts this annimation once this method is called
  };

  const moveRL = () => {
    Animated.timing(leftPosition, {
      toValue: 0,
      duration, // the duration of the animation
      useNativeDriver: false,
      easing: Easing.linear, // the style of animation
    }).start(); // starts this annimation once this method is called
  };

  return (
    <Animated.View style={{left: leftPosition}}>
      {children}
    </Animated.View>
  );
};