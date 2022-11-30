import HeartIcon from '../../../images/heart.svg';
import CommentIcon from '../../../images/comment.svg';
import ShareIcon from '../../../images/share.svg';
import Profile from './profile';
import styled from '@emotion/native';

export default ({}) => {
  return (
    <Container>
      <StyledSection>
        <Profile />
      </StyledSection>
      <StyledSection>
        <HeartIcon height={28} />
        <StyledText>0</StyledText>
      </StyledSection>
      <StyledSection>
        <CommentIcon height={28} />
        <StyledText>0</StyledText>
      </StyledSection>
      <StyledSection>
        <ShareIcon height={28} />
        <StyledText>0</StyledText>
      </StyledSection>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  height: 100%;
  align-content: center;
  align-items: center;
`;

const StyledSection = styled.View`
  margin-bottom: 6px;
  margin-top: 6px;
`;

const StyledText = styled.Text`
  color: white;
  text-align: center;
  font-size: 12px;
`;
