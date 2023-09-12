import React, {memo} from 'react';
import CommentIcon from '../../../images/comment.svg';
import withAuthentication from '../../../hoc/withAuthentication';
import styled from '@emotion/native';
import {useDispatch} from 'react-redux';
import {
  FullAuthentication,
  openAuthenticationBottomDrawer,
} from '../../../redux-ui-state/slices/authenticationSlice';
import {openCommentUItBottomDrawer} from '../../../redux-ui-state/slices/feedsSlice';

const areEqual = (prevProps, nextProps) => {
  const {
    feedId: prevFeedId,
    totalComments: prevTotalComments,
    isBasicSignupCompleted: prevIsBasicSignupCompleted,
    isExtendedSignupCompleted: prevIsExtendedSignupCompleted,
  } = prevProps;
  const {
    feedId: nextFeedId,
    totalComments: nextTotalComments,
    isBasicSignupCompleted: nextIsBasicSignupCompleted,
    isExtendedSignupCompleted: nextIsExtendedSignupCompleted,
  } = nextProps;
  return (
    prevFeedId === nextFeedId &&
    prevTotalComments === nextTotalComments &&
    prevIsBasicSignupCompleted === nextIsBasicSignupCompleted &&
    prevIsExtendedSignupCompleted === nextIsExtendedSignupCompleted
  );
};

const Comments = ({
  isBasicSignupCompleted,
  isExtendedSignupCompleted,
  feedId,
  totalComments,
}) => {
  const dispatch = useDispatch();

  const onPressComments = async () => {
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
      dispatch(openCommentUItBottomDrawer(feedId));
    }
  };
  return (
    <StyledSection onPress={onPressComments}>
      <CommentIcon height={35} width={35} />
      <StyledText>{totalComments}</StyledText>
    </StyledSection>
  );
};

export default withAuthentication(memo(Comments, areEqual));

const StyledSection = styled.TouchableOpacity`
  margin-bottom: 6px;
  margin-top: 6px;
`;

const StyledText = styled.Text`
  color: white;
  text-align: center;
  font-size: 12px;
`;
