import React from 'react';
import styled from '@emotion/native';
import Card from './card';
import Shield from './shield';
import FilterShield from './filter.shield';

const Group = ({index, width = 115, height = 90, dare, onClick}) => {

  return (
    <Container height={height} width={width} key={index} onPress={() => onClick(dare)}>
      <ShieldWrapper>
        {dare?.status == "completed"?
          <FilterShield width={55} height={40}/>
          :
          <Shield width={53} height={34}/>
        }
      </ShieldWrapper>
      <SubContainer>
        <CardWrapper>
            <Card src={dare?.assets[0]?.dareCover} isBlur={dare?.status}/>
        </CardWrapper>
        <CardWrapper>
          <Card src={dare?.assets[1]?.dareCover} isBlur={dare?.status}/>
        </CardWrapper>
      </SubContainer>
    </Container>
  );
};

export default Group;

const Container = styled.TouchableOpacity`
  width: ${props => `${props.width - 10}px`};
  height:${props => `${props.height - 10}px`};
  margin-left: ${props => `${props.key == 1 ? 0 : 6}px`};
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