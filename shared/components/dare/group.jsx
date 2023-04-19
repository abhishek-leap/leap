import React from 'react';
import styled from '@emotion/native';
import Card from './card';
import Shield from './shield';
import FilterShield from './filter.shield';
import { handlePush } from '../../navigation/navigationService';

const Group = ({index, width = 115, height = 90, dare, allDares}) => {
  return (
    <Container height={height} width={width} key={index}>
      <ShieldWrapper>
        {dare?.status == "completed"?
          <FilterShield width={55} height={40}/>
          :
          <Shield />
        }
      </ShieldWrapper>
      <SubContainer>
        <CardWrapper onPress={() => handlePush({name: 'DarePreview', params: {dare, source: 'bar'}})}>
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

const Container = styled.View`
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

const CardWrapper = styled.TouchableOpacity`
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
