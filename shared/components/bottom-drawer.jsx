import styled from '@emotion/native';
import {View, Animated, SafeAreaView, Text} from 'react-native';
import Xicon from '../images/x.svg';

const BottomDrawer = () => {
  return (
    <Root>
      <Container>
        <Text>Hello There!!!!</Text>
        <CloseIcon width={50} height={50} />
      </Container>
    </Root>
  );
};

export default BottomDrawer;

const Root = styled.SafeAreaView`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  background: green;
  width: 100%;
  height: 100%;
`;

const Container = styled.View`
  background: red;
`;

const CloseIcon = styled(Xicon)`
  position: absolute;
  top: -100%;
  right: 0;
  color: white;
`;
