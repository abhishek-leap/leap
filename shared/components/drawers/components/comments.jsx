import React, { useEffect, useState } from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import CloseIcon from '../../../images/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { closeCommentUItBottomDrawer } from '../../../redux-ui-state/slices/feedsSlice';
import CommentsListing from '../../comments/commentsListing';
import { comments } from '../../../apis';
import AddCommentBox from '../../comments/addComment';
import { useCommentAPI } from '../../../hooks/useInfiniteFeeds';

const CommentsBox = () => {
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const {feedItem} = useSelector(state => state.feeds);
    const [commentText, setCommentText] = useState('');
    const mutationComment = useCommentAPI();
    const [commentsData, setCommentData] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      getCommentAPI();
    }, [])

    const onFocus = () => {
      setIsFocused(true)
    }

    const getCommentAPI = async () => {
      await mutationComment.mutate(feedItem?.id)
      const data = mutationComment.data?.comments || []
      setCommentData(data)
    }

    handleSendButton = async () => {
      if(commentText !== '') {
        const dicData = {
          body: commentText.trim(),
          entityId: feedItem?.author?.entityId || '',
          entityName: feedItem?.author?.entityName || 'Customer',
          role: "player"
        }
      
        await comments(feedItem.id, dicData);
        getCommentAPI();
        setCommentText('');
      }
        
    }

    const onPressProfile = () => {
      // console.log("clicked onPressProfile");
    }

    return (
        <Container>
            <Header>
                <TitleTxt>
                    Comments ({mutationComment.data?.comments?.length || 0})
                </TitleTxt>
                <ClosedContainer onPress={() => dispatch(closeCommentUItBottomDrawer())}>
                    <CloseIcon color={colors.PLAYLEAP_WHITE} width={25} height={25} />
                </ClosedContainer>
            </Header>
            <HR colors={colors}/>
            {/* {isFocused ? <ScrollView automaticallyAdjustKeyboardInsets={true}> */}
            <Body>
             
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
            />
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
}

export default CommentsBox;

const ScrollView = styled.ScrollView`
`;

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