import {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import { Animated, SafeAreaView } from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {closeAuthenticationBottomDrawer} from '../redux-ui-state/slices/authenticationSlice';
import {WINDOW_HEIGHT} from '../constants';
import { SignInUp } from '../screens/authentication/signInUp';
import { useState } from 'react';
import { getData } from '../utils/helper';

const ANIMATION_DURATION = 500; // 5 sec

const BottomDrawer = (props, { navigation }) => {
  const dispatch = useDispatch();
  const {show} = useSelector(state => state.authentication);
  const {authStatus} = useSelector(state => state.authentication);
  const [isBasicSignupDone , setIsBasicSignupDone] = useState(false);

  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: show ? 0 : WINDOW_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const onCloseIconClick = () => {
    dispatch(closeAuthenticationBottomDrawer());
  };
  useEffect(() => {
    toggleDrawer();
    const isBasicSignupCompleted = getData('isBasicSignupCompleted');
    setIsBasicSignupDone(isBasicSignupCompleted);
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
        <Body>
          {show &&
            <SignInUp onCloseIconClick={onCloseIconClick} isBasicSignupCompleted={isBasicSignupDone} authStatus={authStatus} />
          }
        </Body>
      </SafeAreaView>
    </Animated.View>
  );
};

export default BottomDrawer;

const Body = styled.View`
  height: 100%;
`;