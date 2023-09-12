import React, {useState} from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import CloseIcon from '../../../images/close.svg';
import {useDispatch} from 'react-redux';
import {closeCommentUItBottomDrawer} from '../../../redux-ui-state/slices/feedsSlice';
import CommentsListing from '../../comments/commentsListing';
import {comments} from '../../../apis';
import AddCommentBox from '../../comments/addComment';
import {useFeed, useFeedActionHandlers} from '../../../hooks/feeds';
import {getData} from '../../../utils/helper';

const CommentsBox = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {data} = useFeed();

  const onPressProfile = () => {
    // console.log("clicked onPressProfile");
  };
  return (
    <Container>
      <Header>
        <TitleTxt>Comments ({data?.stats?.comments || 0})</TitleTxt>
        <ClosedContainer
          onPress={() => dispatch(closeCommentUItBottomDrawer())}>
          <CloseIcon color={colors.PLAYLEAP_WHITE} width={25} height={25} />
        </ClosedContainer>
      </Header>
      <HR colors={colors} />
      {/* {isFocused ? <ScrollView automaticallyAdjustKeyboardInsets={true}>} */}
      <Body>
        {data?.stats?.comments == 0 ? (
          <EmptyText colors={colors}>{'There is no comments'}</EmptyText>
        ) : (
          <CommentsListing
            data={data?.comments}
            onPressProfile={onPressProfile}
            feedItem={data}
            totalComments={data?.stats?.comments || 0}
          />
        )}
      </Body>

      <AddCommentBox onPressProfile={onPressProfile} id={data?.id} />
      {/* </ScrollView> :
            <><Body>
             
            {mutationComment.data?.comments?.length == 0 ? <EmptyText colors={colors}>
                  {'There is no comments'}
            </EmptyText> :  <CommentsListing
              data={mutationComment.data?.comments || commentsData}
              onPressProfile={onPressProfile}
              feedItem={feedItem}
              getCommentAPI={getCommentAPI}
            />}
          </Body>
          
          
          <AddCommentBox 
            commentText={commentText}
            setCommentText={setCommentText}
            onPressProfile={onPressProfile}
            handleSendButton={handleSendButton}
            onFocus={onFocus}
          /></>} */}
    </Container>
  );
};

export default CommentsBox;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  height: 77%;
`;

const Body = styled.View`
  flex: 1;
  justify-content: center;
`;

const HR = styled.View`
  background-color: ${props => props.colors.PLAYLEAP_PINK};
  height: 1px;
  margin: 4% 4% 1% 4%;
`;

const Header = styled.View`
  flex-direction: row;
  padding: 10px;
  margin: 10px 10px 0 10px;
`;

const TitleTxt = styled.Text`
  color: white;
  font-size: 16px;
`;

const ClosedContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  margin-top: 10px;
`;
const EmptyText = styled.Text`
  color: ${props => props.colors.PLAYLEAP_WHITE};
  text-align: center;
`;
