import React from 'react';
import styled from '@emotion/native';
import {FlatList} from 'react-native';
import {handlePush} from '../../navigation/navigationService';
import Item from './item';

const handleClick = () => {
  handlePush({name: 'SkillAndHashtag', params: {screen: 'skill'}});
};

const _renderItem = element => (
  <RenderView key={element?.id}>
    <Item
      id={element.id}
      text={element.alias}
      type={'skill'}
      onClick={handleClick}
    />
  </RenderView>
);

const SkillsList = ({data}) => {
  return (
    <Container>
      <Wrapper>
        <FlatList data={data} renderItem={({item}) => _renderItem(item)} />
      </Wrapper>
    </Container>
  );
};

export default SkillsList;

const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: scroll;
`;

const Wrapper = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding-top: 20px;
`;

const RenderView = styled.View`
  padding: 3px 30px 3px 32px;
  width: 100%;
`;
