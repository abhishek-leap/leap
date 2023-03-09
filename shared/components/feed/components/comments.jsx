import React from "react";
import CommentIcon from '../../../images/comment.svg';
import withAuthentication from '../../../hoc/withAuthentication';
import styled from '@emotion/native';

const Comments = ({ width, height, isBasicSignupCompleted, isExtendedSignupCompleted, onPress, totalComments }) => {
  
  return (
      <StyledSection onPress={() => onPress(isBasicSignupCompleted, isExtendedSignupCompleted)}>
        <CommentIcon height={28} />
        <StyledText>{totalComments}</StyledText>
      </StyledSection>
  );
};

export default withAuthentication(Comments);

const StyledSection = styled.TouchableOpacity`
  margin-bottom: 6px;
  margin-top: 6px;
`;

const StyledText = styled.Text`
  color: white;
  text-align: center;
  font-size: 12px;
`;
