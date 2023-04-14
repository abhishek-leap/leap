import React from "react";
import HeartIcon from '../../../images/heart.svg';

import withAuthentication from '../../../hoc/withAuthentication';
import styled from '@emotion/native';

const Like = ({ width, height, isBasicSignupCompleted, isExtendedSignupCompleted, onPress, totalLikes, onClicked, userReaction }) => {

  return (
      <StyledSection onPress={() => onPress(isBasicSignupCompleted, isExtendedSignupCompleted)}>
        <HeartIcon height={35} width={35} color={onClicked ? "rgba(233,104,158,1)" : "#290C54"}/>
        <StyledText>{totalLikes}</StyledText>
      </StyledSection>
  );
};

export default withAuthentication(Like);

const StyledSection = styled.TouchableOpacity`
  margin-bottom: 6px;
  margin-top: 6px;
`;

const StyledText = styled.Text`
  color: white;
  text-align: center;
  font-size: 12px;
`;