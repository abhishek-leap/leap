import React, { useState } from 'react';
// import ShareIcon from '../../../images/share.svg';
import Profile from './profile';
import styled from '@emotion/native';
import { dislike, like } from '../../../apis';
import Like from './like';
import { useDispatch } from 'react-redux';
import { FullAuthentication, openAuthenticationBottomDrawer } from '../../../redux-ui-state/slices/authenticationSlice';
import Comments from './comments';
import { openCommentUItBottomDrawer, selectedFeedItem } from '../../../redux-ui-state/slices/feedsSlice';


const FeedOptions= ({data}) => {
  const {stats, author, id} = data;
  const [likeClicked, setLikeClicked] = useState(data?.userReactions[0]?.id ? true : false);
  const [totalLiked, setTotalLiked] = useState(data?.stats?.reactions);
  const [likeAPIResponse, setLikeAPIResponse] = useState({});
  const dispatch = useDispatch();

  const onPressProfile = () => {
  }

  const onPressLike = async (isBasicSignupCompleted, isExtendedSignupCompleted) => {
    if (isBasicSignupCompleted != "true" || isExtendedSignupCompleted != "true") {
      dispatch(FullAuthentication(1));
      dispatch(openAuthenticationBottomDrawer());
    } else if (isBasicSignupCompleted == "true" || isExtendedSignupCompleted == "true") {
      setLikeClicked(likedStatus => !likedStatus);
      if(data?.userReactions.length == 0 && !likeClicked) {
        setTotalLiked(totalLike => totalLike + 1);
        const params = { "reactionType": "like" };    
        const likeAPIResponse = await like(id, params); 
        setLikeAPIResponse(likeAPIResponse);
        if(likeAPIResponse?.error) {
          setLikeClicked(likeStatus => !likeStatus);
          setTotalLiked(totalLike => totalLike - 1);
        }
      } else {
        setTotalLiked(totalLike => totalLike - 1);
        
        const dislikeID = data?.userReactions[0]?.id || likeAPIResponse?.id;
        const dislikeAPIResponse = await dislike(dislikeID); 
        if(dislikeAPIResponse?.error) {
          setLikeClicked(likeStatus => !likeStatus);
          setTotalLiked(totalLike => totalLike + 1);
        }
      }
    }
  }

  const onPressComments = async (isBasicSignupCompleted, isExtendedSignupCompleted) => {
    if (isBasicSignupCompleted != "true" || isExtendedSignupCompleted != "true") {
      dispatch(FullAuthentication(1));
      dispatch(openAuthenticationBottomDrawer());
    } else if (isBasicSignupCompleted == "true" || isExtendedSignupCompleted == "true") {
      dispatch(openCommentUItBottomDrawer());
      dispatch(selectedFeedItem(data))
    }
  }

  const onPressShare = () => {
  }

  return (
    <Container>
     
      <StyledSection onPress={onPressProfile}>
        <Profile author={author}/>
      </StyledSection>
      <Like 
        totalLikes={totalLiked}
        onPress={onPressLike}
        onClicked={likeClicked}
        userReaction={data?.userReactions}
      />
      <Comments 
        totalComments={data?.stats?.comments}
        onPress={onPressComments}
      />
      {/* <StyledSection onPress={onPressLike}>
        <HeartIcon height={28} style={[
            likeClicked
              ? {color: "#FF0000" }
              : { color: "#4FCE5D" },
          ]}/>
        <StyledText>{data?.stats?.reactions}</StyledText>
      </StyledSection> 
      <StyledSection onPress={onPressComments}>
        <CommentIcon height={28} />
        <StyledText>{data?.stats?.comments}</StyledText>
      </StyledSection> */}
      {/* <StyledSection onPress={onPressShare}>
        <ShareIcon color={'transparent'} height={28} />
        <StyledText>{data?.stats?.views}</StyledText>
      </StyledSection> */}
    </Container>
  );
};

export default FeedOptions;

const Container = styled.View`
  justify-content: center;
  height: 100%;
  align-content: center;
  align-items: center;
`;

const StyledSection = styled.TouchableOpacity`
  margin-bottom: 6px;
  margin-top: 6px;
`;

const StyledText = styled.Text`
  color: white;
  text-align: center;
  font-size: 12px;
`;

