import React, { useEffect, useState }  from 'react';
import styled from '@emotion/native';
import {
  Grayscale,
} from 'react-native-color-matrix-image-filters';
import { Image } from 'react-native';

const Card = ({src, isBlur}) => {
  const [isPortrait, setisPortrait] = useState(false);
  
  useEffect(() => {
    Image.getSize(src, (width, height) => {
      setisPortrait(height > width);
    })
  }, [])

  return (
    <Container>
      {isBlur == 'completed'?
      <Grayscale>
        <StyledImage
          resizeMode="contain"
          source={{
            uri: src,
          }}
          isBlur={isBlur}
          portrait={isPortrait}
        />
        </Grayscale>
        :
        <StyledImage
          resizeMode="contain"
          source={{
            uri: src,
          }}
          isBlur={isBlur}
          portrait={isPortrait}
        />
      }
    </Container>
  );
};

export default Card;

const Container = styled.View`
  width: 100%;
  height: 100%;
  border-width: 0.5px;
  border-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
  overflow: hidden;
  align-items: center;
  align-self: center;
`;

const StyledImage = styled.Image`
  width: ${props => `${props.portrait == true ? 200 : 50}px`};
  height: ${props => `${props.portrait == true ? 80 : 40}px`};
  margin-top: ${props => `${props.portrait === true ? 0 : 20}px`};
  opacity: ${props => props.isBlur ? '0.8' : null};
`;