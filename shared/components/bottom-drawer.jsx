import {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import {View, Animated, SafeAreaView, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {closeAuthenticationBottomDrawer} from '../redux-ui-state/slices/authenticationSlice';
import Xicon from '../images/x.svg';
import {WINDOW_HEIGHT} from '../constants';

const ANIMATION_DURATION = 1000; // 5 sec

const BottomDrawer = props => {
  const dispatch = useDispatch();
  const {show} = useSelector(state => state.authentication);

  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: show ? 100 : WINDOW_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    toggleDrawer();
  }, [toggleDrawer, show]);

  return (
    <Animated.View
      style={{
        ...props.style,
        position: 'absolute',
        backgroundColor: colors.primary,
        width: '100%',
        height: '100%',
        transform: [{translateY: slideAnimation}],
      }}>
      <SafeAreaView>
        <Body></Body>
      </SafeAreaView>
    </Animated.View>
  );
};

export default BottomDrawer;

// const CloseIcon = styled(Xicon)`
//   position: absolute;
//   top: 150%;
//   right: 0;
//   color: white;
// `;

const Body = styled.View`
  height: 100%;
  background: red;
`;
