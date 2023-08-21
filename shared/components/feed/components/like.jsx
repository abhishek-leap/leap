import React from 'react';
import HeartIcon from '../../../images/heart.svg';
import FilledHeartIcon from '../../../images/filledHeartIcon.svg';

import withAuthentication from '../../../hoc/withAuthentication';
import styled from '@emotion/native';

const Like = ({
  width,
  height,
  isBasicSignupCompleted,
  isExtendedSignupCompleted,
  onPress,
  totalLikes,
  onClicked,
  userReaction,
}) => {
  return (
    <StyledSection
      onPress={() =>
        onPress(isBasicSignupCompleted, isExtendedSignupCompleted)
      }>
      {onClicked ? (
        <FilledHeartIcon height={35} width={35} />
      ) : (
        <HeartIcon height={35} width={35} />
      )}

      <StyledText>{totalLikes}</StyledText>
    </StyledSection>
  );
};

export default withAuthentication(Like);

const StyledSection = styled.TouchableOpacity`
  margin-bottom: 6px;
`;

const StyledText = styled.Text`
  color: white;
  text-align: center;
  font-size: 12px;
`;
