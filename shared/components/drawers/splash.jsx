import React,{useEffect, useRef} from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {SafeAreaView, View, Text, Animated, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useInfiniteDares } from '../../hooks/useInfiniteDares';
import { useInfiniteFeeds } from '../../hooks/useInfiniteFeeds';
import {INITIAL_LOAD_FEED, WINDOW_HEIGHT} from '../../constants';
import Logo from '../../images/logo.svg';

const ANIMATION_DURATION = 1; // 5 sec
// const DURATION = 2000;

const SplashDrawer = (props, { navigation }) => {
  const {data: daresData } = useInfiniteDares();
  const {data: feedData } = useInfiniteFeeds();

  const dispatch = useDispatch();
  const {feedScreen} = useSelector(state => state.feeds);

  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;
  // const opacity = useRef(new Animated.Value(0)).current;

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: feedScreen == INITIAL_LOAD_FEED ? WINDOW_HEIGHT : 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const onCloseIconClick = () => {
    dispatch(closeAuthenticationBottomDrawer());
  };

  useEffect(() => {
    if(feedData?.feeds && daresData?.dares.length > 0) {
     
    }
  }, [])

  useEffect(() => {
    toggleDrawer();
  }, [toggleDrawer, feedScreen]);

  // const fadeIn = () => {
  //   Animated.timing(opacity, {
  //     toValue: 1,
  //     DURATION
  //   }).start();
  // };
  
  // useEffect(() => {
  //   fadeIn();
  // }, [ opacity ]);

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
              {/* <Text style={styles.txt}>{'Playleap'}</Text> */}
              
              {/* <Animated.View
                style={
                  {
                    opacity
                  }
                }
              > */}
                <Logo height={40} width={120} />
              {/* </Animated.View> */}
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
      alignItems: 'center'
  },
  txt: {
      fontSize: 24,
      color: "#ffffff"
  },
});