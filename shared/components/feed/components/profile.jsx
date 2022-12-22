import React from 'react';
import Shield from '../../../images/shield.svg';
import styled from '@emotion/native';

const Profile= ({size = 40}) => {
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

export default Profile;

const Container = styled.View`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`}
`;
