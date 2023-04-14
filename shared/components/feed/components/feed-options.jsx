import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/native';

// SVG Imports
import ShareIcon from '../../../images/share.svg';
import MuteIcon from '../../../images/mute.svg';
import UnmuteIcon from '../../../images/unmute.svg';
import ProfilePlusIcon from "../../../images/profile-plus.svg";

import { dislike, like } from '../../../apis';

// Components imports
import Profile from './profile';
import Like from './like';
import Comments from './comments';

//Redux imports
import { FullAuthentication, openAuthenticationBottomDrawer } from '../../../redux-ui-state/slices/authenticationSlice';
import { openCommentUItBottomDrawer, selectedFeedItem } from '../../../redux-ui-state/slices/feedsSlice';


const FeedOptions= ({data, clickHandler, mute}) => {
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
        <PlusIcon>
          <ProfilePlusIcon />
        </PlusIcon>
        
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
      <StyledSection onPress={onPressShare}>
        <ShareIcon height={35} width={35} />
        <StyledText>{data?.stats?.views}</StyledText>
      </StyledSection>
      <AudioIconContainer onPress={clickHandler}>
        {
        mute ?
            <MuteIcon height={35} width={35} />
            :
            <UnmuteIcon height={35} width={35} />
        }
        </AudioIconContainer>
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
  margin-bottom: 10px;
  // margin-top: 6px;
`;

const StyledText = styled.Text`
  color: white;
  text-align: center;
  font-size: 12px;
`;

const AudioIconContainer = styled.TouchableOpacity`
  padding:5px;
`;

const PlusIcon = styled.View`
  padding-left: 23px;
  padding-top: 52px;
  position: absolute;
`;