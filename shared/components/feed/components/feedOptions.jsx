import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from '@emotion/native';

// SVG Imports
import ShareIcon from '../../../images/share.svg';
import UnmuteMuteIcon from '../../../images/unmuteMute.svg';
import {dislike, like} from '../../../apis';

// Components imports
import Profile from './profile';
import Like from './like';
import Comments from './comments';

//Redux imports
import {
  FullAuthentication,
  openAuthenticationBottomDrawer,
} from '../../../redux-ui-state/slices/authenticationSlice';
import {
  openCommentUItBottomDrawer,
  selectedFeedItem,
} from '../../../redux-ui-state/slices/feedsSlice';
import ShareItem from '../../common/share';
import {BASE_URL_SITE} from '../../../apis/urls';
import { getData } from '../../../utils/helper';

const FeedOptions = ({data, clickHandler, mute}) => {
  const { stats, author, id, following } = data;
  const [likeClicked, setLikeClicked] = useState(
    data?.userReactions[0]?.id ? true : false,
  );
  const [totalLiked, setTotalLiked] = useState(data?.stats?.reactions);
  const [likeAPIResponse, setLikeAPIResponse] = useState({});
  const dispatch = useDispatch();
  const loggedInUserId = getData("user_id");

  const onPressProfile = () => {};

  const onPressLike = async (
    isBasicSignupCompleted,
    isExtendedSignupCompleted,
  ) => {
    if (
      isBasicSignupCompleted != 'true' ||
      isExtendedSignupCompleted != 'true'
    ) {
      dispatch(FullAuthentication(1));
      dispatch(openAuthenticationBottomDrawer());
    } else if (
      isBasicSignupCompleted == 'true' ||
      isExtendedSignupCompleted == 'true'
    ) {
      setLikeClicked(likedStatus => !likedStatus);
      if (data?.userReactions.length == 0 && !likeClicked) {
        setTotalLiked(totalLike => totalLike + 1);
        const params = {reactionType: 'like'};
        const likeAPIResponse = await like(id, params);
        setLikeAPIResponse(likeAPIResponse);
        if (likeAPIResponse?.error) {
          setLikeClicked(likeStatus => !likeStatus);
          setTotalLiked(totalLike => totalLike - 1);
        }
      } else {
        setTotalLiked(totalLike => totalLike - 1);

        const dislikeID = data?.userReactions[0]?.id || likeAPIResponse?.id;
        const dislikeAPIResponse = await dislike(dislikeID);
        if (dislikeAPIResponse?.error) {
          setLikeClicked(likeStatus => !likeStatus);
          setTotalLiked(totalLike => totalLike + 1);
        }
      }
    }
  };

  const onPressComments = async (
    isBasicSignupCompleted,
    isExtendedSignupCompleted,
  ) => {
    if (
      isBasicSignupCompleted != 'true' ||
      isExtendedSignupCompleted != 'true'
    ) {
      dispatch(FullAuthentication(1));
      dispatch(openAuthenticationBottomDrawer());
    } else if (
      isBasicSignupCompleted == 'true' ||
      isExtendedSignupCompleted == 'true'
    ) {
      dispatch(openCommentUItBottomDrawer());
      dispatch(selectedFeedItem(data));
    }
  };

  const onPressShare = () => {};

  return (
    <Container>
      <StyledSection onPress={onPressProfile}>
        <Profile 
          author={author} 
          hasFollowIcon={
            !following?.isFollowing && author?.entityId !== loggedInUserId
          }
        />
        {/* <PlusIcon>
          <ProfilePlusIcon />
        </PlusIcon> */}
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
      <StyledShareSection onPress={onPressShare}>
        {/* <ShareIcon height={35} width={35} /> */}
        {/* <StyledText>{data?.stats?.views}</StyledText> */}
        <ShareItem
          component={<ShareIcon height={35} width={35} />}
          copyText={BASE_URL_SITE + '/?feedId=' + id}
        />
      </StyledShareSection>
      <AudioIconContainer onPress={clickHandler}>
        <UnmuteMuteIcon
          height={35}
          width={35}
          fill={mute ? 'transparent' : 'white'}
          color={mute ? 'white' : 'transparent'}
        />
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
  margin-bottom: 30px;
`;

const StyledShareSection = styled.TouchableOpacity`
  margin-vertical: 6px;
`;

const StyledText = styled.Text`
  color: white;
  text-align: center;
  font-size: 12px;
`;

const AudioIconContainer = styled.TouchableOpacity`
  padding: 5px;
  margin-top: 6px;
`;

const PlusIcon = styled.View`
  padding-left: ${Platform.OS === 'ios' ? '44%' : '42%'};
  padding-top: 62px;
  position: absolute;
`;
