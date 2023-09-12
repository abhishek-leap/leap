import React, {memo} from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import SingleComment from './singleComment';

const areEqual = (prevProps, nextProps) => {
  const {
    feedItem: prevFeedItem,
    data: prevData,
    totalComments: prevTotalComments,
  } = prevProps;
  const {
    feedItem: nextFeedItem,
    data: nextData,
    totalComments: nextTotalComments,
  } = nextProps;
  return (
    prevData.length === nextData.length &&
    prevTotalComments === nextTotalComments &&
    prevFeedItem.id === nextFeedItem.id
  );
};

const CommentsListing = ({onPressProfile, data, feedItem}) => {
  const {colors} = useTheme();

  const _renderItem = ({item}) => {
    let message = '';
    if (item?.body) {
      try {
        const bodyObj = JSON.parse(item?.body);
        const elements = bodyObj.blocks;
        message = elements[0]?.text;
      } catch {
        message = item?.body;
      }
    }

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const today = new Date(item?.createdAt);
    return (
      <CommentView>
        <SingleComment
          author={item?.author || {}}
          alias={item?.author?.alias}
          role={item?.role}
          message={message}
          dateTime={today.toLocaleDateString('en-US', options)}
          feedItem={feedItem}
          item={item}
          onPressProfile={onPressProfile}
        />
      </CommentView>
    );
  };

  _listEmptyComponent = () => {
    return (
      <EmptyView>
        <EmptyText colors={colors}>{'There is no comments'}</EmptyText>
      </EmptyView>
    );
  };

  return (
    <>
      <FlatList
        data={[...data].reverse()}
        inverted
        renderItem={item => _renderItem(item)}
        keyExtractor={(item, index) => item.id}
        ItemSeparatorComponent={<HR colors={colors} />}
        // ListEmptyComponent={_listEmptyComponent()}
      />
    </>
  );
};

export default memo(CommentsListing, areEqual);

const FlatList = styled.FlatList``;
const EmptyView = styled.View`
  background-color: black;
`;
const EmptyText = styled.Text`
  color: ${props => props.colors.PLAYLEAP_WHITE};
`;
const HR = styled.View`
  background-color: ${props => props.colors.PLAYLEAP_PINK};
  height: 1px;
  margin: 4% 4% 1% 4%;
`;
const CommentView = styled.View`
  flex-direction: column;
`;
