import styled from '@emotion/native';

const Card = ({src}) => {
  return (
    <Container>
      <StyledImage
        resizeMode="contain"
        source={{
          uri: src,
        }}
      />
    </Container>
  );
};

export default Card;

const Container = styled.View`
  width: 100%;
  height: 100%;
  border-width: 0.5px;
  border-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
  overflow: hidden;
  align-items: center;
  align-self: center;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;
