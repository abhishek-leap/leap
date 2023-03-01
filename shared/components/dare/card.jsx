import React  from 'react';
import styled from '@emotion/native';

const Card = ({src, isBlur}) => {
  return (
    <Container>
      <StyledImage
        resizeMode="contain"
        source={{
          uri: src,
        }}
        isBlur={isBlur}
      />
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
  width: 100%;
  height: 100%;
  // tint-color: ${props => props.isBlur ? 'light-grey' : null};
  // opacity: ${props => props.isBlur ? '0.2' : null};
  // background: ${props => props.isBlur ? 'rgba(61, 18, 125, 0.3)' : null};
`;
