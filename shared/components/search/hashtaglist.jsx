import React from 'react';
import styled from '@emotion/native';
import {FlatList} from 'react-native';

import Item from './item';

const _renderItem = item => (
  <ItemView key={item.id}>
    <Item
      url={`/hashtag?slug=${item.alias}`}
      text={item.alias}
      type={'hashtag'}
    />
  </ItemView>
);

const HashtagsList = ({data}) => {
  return (
    <Container>
      <Content>
        <FlatList data={data} renderItem={({item}) => _renderItem(item)} />
      </Content>
    </Container>
  );
};

export default HashtagsList;

const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: scroll;
`;

const Content = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding-top: 20px;
`;

const ItemView = styled.View`
  padding: 3px 30px 3px 32px;
  width: 100%;
`;
