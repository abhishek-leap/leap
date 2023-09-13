import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PinkBorderLine = ({height = 3.5, top}) => {
  return (
    <LinearGradient
      style={[styles.linearGradient, {height, top: top ? 0 : 188}]}
      start={{x: 0.1, y: 10}}
      end={{x: 0.9, y: 10}}
      colors={[
        'rgba(0, 0, 0, 0)',
        '#FF00AC',
        'rgba(0, 0, 0, 0)',
      ]}></LinearGradient>
  );
};

export default PinkBorderLine;

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    position: 'absolute',
    border: 0,
    margin: 0,
    bottom: 0,
  },
});
