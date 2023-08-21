import React, {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Animated,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {INITIAL_LOAD_FEED, WINDOW_HEIGHT} from '../../constants';
import Logo from '../../images/logo.svg';
import {feedScreenDisplay} from '../../redux-ui-state/slices/feedsSlice';

const ANIMATION_DURATION = 1;

const SplashDrawer = props => {
  const dispatch = useDispatch();
  const {feedScreen} = useSelector(state => state.feeds);

  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: feedScreen == INITIAL_LOAD_FEED ? WINDOW_HEIGHT : 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      dispatch(feedScreenDisplay(4));
    }, 2000);
    return () => clearInterval(splashTimeout);
  }, []);

  useEffect(() => {
    toggleDrawer();
  }, [toggleDrawer, feedScreen]);

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
          <View style={styles.uiView}>
            <Logo height={40} width={120} />
            <ActivityIndicator
              color={'white'}
              size={'large'}
              style={{marginTop: 30}}
            />
          </View>
        </Body>
      </SafeAreaView>
    </Animated.View>
  );
};

export default SplashDrawer;

const Body = styled.View`
  height: 100%;
`;

const styles = StyleSheet.create({
  uiView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 24,
    color: '#ffffff',
  },
});
