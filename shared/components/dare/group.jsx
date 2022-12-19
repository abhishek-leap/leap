import React from 'react';
import styled from '@emotion/native';
import Card from './card';
import Shield from './shield';

const Group = ({width = 115, height = 90, dare}) => {
  return (
    <Container height={height} width={width}>
      <ShieldWrapper>
        <Shield />
      </ShieldWrapper>
      <SubContainer>
        <CardWrapper>
          <Card src={dare?.assets[0]?.dareCover} />
        </CardWrapper>
        <CardWrapper>
          <Card src={dare?.assets[0]?.dareCover} />
        </CardWrapper>
      </SubContainer>
    </Container>
  );
};

export default React.memo(Group);

const Container = styled.View`
  width: ${props => `${props.width - 10}px`};
  height:${props => `${props.height - 10}px`};
  margin-left: 6px;
  margin-right: 6px;
`;
const SubContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  height:100%;
`;

const CardWrapper = styled.View`
  flex-direction: row;
  width: 48%;
`;

const ShieldWrapper = styled.View`
  flex-direction: row;
  position: absolute;
  z-index: 5;
  left: 24%;
  top: 28%;
  height: 55%;
  width: 60%;
`;
