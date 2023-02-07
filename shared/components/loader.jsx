import React from 'react';
import styled from '@emotion/native';
import { ActivityIndicator, Dimensions, Platform } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const height =
  Platform.OS === 'ios'
    ? windowHeight > 850
      ? parseInt(windowHeight * 0.71)
      : windowHeight > 820
      ? parseInt(windowHeight * 0.699)
      : windowHeight > 800
      ? parseInt(windowHeight * 0.689)
      : windowHeight < 680
      ? parseInt(windowHeight * 0.67)
      : parseInt(windowHeight * 0.695)
    : Platform.OS === 'web'
    ? parseInt(windowHeight * 0.79)
    : parseInt(windowHeight * 0.738);

const Loader = () => {

return (
    <ActivityIndicator
        animating
        size="large"
        color={"#9900D9"}
        style={{opacity: 1}}
    />
);
};

export default Loader;

// const LoaderIndicator = styled.ActivityIndicator`
//     background-color: ${props => props.colors.primary};
//     flex-direction: row;
//     padding: 20px;
//     justify-content: space-between;
//     padding-top: ${props => (props.platform === 'ios' ? '45px' : '12px')};
// `;
      