import Shield from '../../../images/shield.svg';
import styled from '@emotion/native';

export default ({size = 40}) => {
  return (
    <Container size={size}>
      <Shield width="100%" height="100%" />
      {/* <Image
        source={require('../../../images/dummyAvatar.jpeg')}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
      /> */}
    </Container>
  );
};

const Container = styled.View`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`}
`;
