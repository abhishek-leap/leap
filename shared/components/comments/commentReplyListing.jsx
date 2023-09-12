import React from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import SingleComment from './singleComment';

const CommentsReplyListing = ({
  onPressProfile,
  data,
  feedItem,
  id,
  setShowCommentBox,
}) => {
  const {colors} = useTheme();

  const _renderItem = ({item}) => {
    let message = '';
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const today = new Date(item?.createdAt);
    try {
      const bodyObj = JSON.parse(item?.body);
      const elements = bodyObj.blocks;
      message = elements[0]?.text;
    } catch {
      message = item?.body;
    }
    return (
      <SingleComment
        author={item?.author}
        alias={item?.author?.alias}
        role={item?.role}
        message={message}
        dateTime={today.toLocaleDateString('en-US', options)}
        feedItem={feedItem}
        item={{id}}
        openCommentBox={setShowCommentBox}
        onPressProfile={onPressProfile}
      />
    );
  };

  return (
    <FlatList
      data={[...data].reverse()}
      inverted
      renderItem={item => _renderItem(item)}
      keyExtractor={(item, index) => item.id}
      ItemSeparatorComponent={<HR colors={colors} />}
    />
  );
};

export default CommentsReplyListing;

const HR = styled.View`
  background-color: ${props => props.colors.PLAYLEAP_PINK};
  height: 1px;
  margin: 4% 4% 1% 4%;
`;
const FlatList = styled.FlatList`
  padding-left: 10px;
  width: 90%;
  align-self: flex-end;
`;
