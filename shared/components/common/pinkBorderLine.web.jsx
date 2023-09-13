import React from 'react';
import Styled from '@emotion/react';

const PinkBorderLine = ({height = 3.5, top}) => {
  return <LinearGradient />;
};

export default PinkBorderLine;

const LinearGradient = Styled.div`
    width: '100%',
    position: 'absolute',
    border: 0,
    margin: 0,
    bottom: 0,
    background: linear-gradient(rgba(0, 0, 0, 0), #FF00AC ,rgba(0, 0, 0, 0)),
`;
