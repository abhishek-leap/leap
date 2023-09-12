import React, {memo} from 'react';
import HeartIcon from '../../../images/heart.svg';
import FilledHeartIcon from '../../../images/filledHeartIcon.svg';

import withAuthentication from '../../../hoc/withAuthentication';
import styled from '@emotion/native';
import {useDispatch} from 'react-redux';
import {useFeedActionHandlers} from '../../../hooks/feeds';
import {useMutation} from '@tanstack/react-query';
import {dislike, like} from '../../../apis';
import {
  FullAuthentication,
  openAuthenticationBottomDrawer,
} from '../../../redux-ui-state/slices/authenticationSlice';

const areEqual = (prevProps, nextProps) => {
  const {
    feedId: prevFeedId,
    totalLikes: prevTotalLikes,
    userReactions: prevUserReactions,
    isBasicSignupCompleted: prevIsBasicSignupCompleted,
    isExtendedSignupCompleted: prevIsExtendedSignupCompleted,
  } = prevProps;
  const {
    feedId: nextFeedId,
    totalLikes: nextTotalLikes,
    userReactions: nextUserReactions,
    isBasicSignupCompleted: nextIsBasicSignupCompleted,
    isExtendedSignupCompleted: nextIsExtendedSignupCompleted,
  } = nextProps;
  const prevReactionId = prevUserReactions?.[0]?.id;
  const nextReactionId = nextUserReactions?.[0]?.id;
  return (
    prevFeedId === nextFeedId &&
    prevTotalLikes === nextTotalLikes &&
    prevReactionId === nextReactionId &&
    prevIsBasicSignupCompleted === nextIsBasicSignupCompleted &&
    prevIsExtendedSignupCompleted === nextIsExtendedSignupCompleted
  );
};

const Like = ({
  width,
  height,
  isBasicSignupCompleted,
  isExtendedSignupCompleted,
  userReactions,
  feedId,
  totalLikes,
}) => {
  const dispatch = useDispatch();
  const {incrementLikes, decrementLikes} = useFeedActionHandlers();
  const feedLike = useMutation({mutationFn: like});
  const feedDislike = useMutation({mutationFn: dislike});

  const onPressLike = async () => {
    if (!(feedLike.isLoading || feedDislike.isLoading)) {
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
        const updateFeedId = feedId || id;
        const initUserReactions = [...(userReactions || [])];
        if (userReactions?.[0]?.id) {
          decrementLikes(updateFeedId);
          const res = await feedDislike.mutateAsync(userReactions?.[0]?.id);
          if (res?.error) {
            incrementLikes(updateFeedId, initUserReactions?.[0]);
          }
        } else {
          incrementLikes(updateFeedId);

          const res = await feedLike.mutateAsync({
            id: updateFeedId,
            params: {
              reactionType: 'like',
            },
          });

          if (res?.error) {
            decrementLikes(updateFeedId);
          } else {
            incrementLikes(updateFeedId, res, false);
          }
        }
      }
    }
  };
  return (
    <StyledSection onPress={onPressLike}>
      {userReactions?.[0]?.id ? (
        <FilledHeartIcon height={35} width={35} />
      ) : (
        <HeartIcon height={35} width={35} />
      )}

      <StyledText>{totalLikes}</StyledText>
    </StyledSection>
  );
};

export default withAuthentication(memo(Like, areEqual));

const StyledSection = styled.TouchableOpacity`
  margin-bottom: 6px;
`;

const StyledText = styled.Text`
  color: white;
  text-align: center;
  font-size: 12px;
`;
