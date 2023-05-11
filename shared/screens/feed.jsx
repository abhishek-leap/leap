import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Platform, StatusBar, StyleSheet, Animated} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import styled from '@emotion/native';

import DareBar from '../components/dare/darebar';
import SingleFeed from '../components/feed/components/SingleFeed';
import {useInfiniteFeeds} from '../hooks/useInfiniteFeeds';
import {useDispatch, useSelector} from 'react-redux';
import {dareBarView} from '../redux-ui-state/slices/feedsSlice';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  INITIAL_LOAD_FEED,
  BOTTOM_BAR_HEIGHT,
} from '../constants';
import {setGlobalNavigation} from '../utils/helper';

const isIphone = Platform.OS === 'ios' ? 0.8 : 0.88;
const iPhoneHeight = Platform.OS == 'ios' ? 85 : 52;

export default ({navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {dareBarHeight} = useSelector(state => state.feeds);

  const {data, fetchNextPage} = useInfiniteFeeds();

  const feedRecord = useRef([]);
  const videoRef = useRef(null);
  const virtualRef = useRef(null);

  // const [playing, setPlaying] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const Yscroll = React.useRef(new Animated.Value(0)).current;

  // const bottomTabHeight = useBottomTabBarHeight();
  let statuBarHeight = StatusBar.currentHeight;
  if (Platform.OS === 'ios') {
    statuBarHeight = StatusBar.currentHeight || 0;
  } else {
    statuBarHeight = 0;
  }
  const statusBarHeight = statuBarHeight;
  const TotalHeightMinus =
    BOTTOM_BAR_HEIGHT +
    statusBarHeight +
    Math.floor(dareBarHeight) +
    iPhoneHeight;
  const TotalhHeight = WINDOW_HEIGHT - TotalHeightMinus;

  useEffect(() => {
    setGlobalNavigation(navigation);
  }, []);

  useEffect(() => {
    if (data?.feeds !== undefined && feedRecord.current?.length === 0) {
      feedRecord.current = [
        ...feedRecord.current,
        ...data?.feeds.slice(0, INITIAL_LOAD_FEED),
      ];
      setRefresh(!refresh);
    }
  }, [data?.feeds !== undefined, activeVideoIndex == undefined]);

  useEffect(() => {
    if (activeVideoIndex > 0) {
      if (data?.feeds?.length > feedRecord.current?.length) {
        const intial = feedRecord.current.length;
        const next = intial + 4;
        const subArray = data.feeds.slice(intial, next);

        if (subArray.length > 0) {
          feedRecord.current = [...feedRecord.current, ...subArray];
          setRefresh(!refresh);
        }
      }
    }
  }, [data?.feeds, activeVideoIndex]);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    const item = viewableItems[0];
    if (item?.index !== undefined) {
      setActiveVideoIndex(item?.index);
    }
  }, []);

  const Slide = ({item, index}) => {
    const scale = Yscroll.interpolate({
      inputRange: [-1, 0, TotalhHeight * index, TotalhHeight * (index + 2)],
      outputRange: [1, 1, 1, 1],
    });
    return (
      <Animated.View
        style={[
          styles.slide,
          {
            transform: Platform.OS !== 'web' && [{scale}, {perspective: 1000}],
          },
        ]}>
        <SingleFeed
          item={item}
          index={index}
          videoRef={videoRef}
          currentIndex={activeVideoIndex}
          // playing={playing}
          // setPlaying={setPlaying}
          isActive={activeVideoIndex === index}
          TotalhHeight={TotalhHeight}
        />
      </Animated.View>
    );
  };

  function getItemLayout(item, index) {
    return {
      length: TotalhHeight,
      offset: TotalhHeight * index,
      index,
    };
  }

  return (
    <Container colors={colors}>
      <DareView
        colors={colors}
        onLayout={event => {
          dispatch(dareBarView(event.nativeEvent.layout.height));
        }}>
        <DareBar />
      </DareView>
      <Animated.FlatList
        ref={virtualRef}
        data={feedRecord.current}
        renderItem={Slide}
        keyExtractor={(item, index) => `${index}_${item}`.toString()}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={TotalhHeight}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: Yscroll}}}],
          {useNativeDriver: true},
        )}
        // Below three settings stop free scrolling
        snapToInterval={TotalhHeight}
        snapToAlignment={'start'}
        decelerationRate={isIphone}
        //Performance settings
        removeClippedSubviews={true}
        initialNumToRender={3}
        maxToRenderPerBatch={1}
        windowSize={10}
        updateCellsBatchingPeriod={100} // Increase time between renders
        disableIntervalMomentum={true}
        scrollEventThrottle={100}
        // scrollEnabled={global.videoScrollIndex > activeVideoIndex && MAX_SCROLL_INDEX <= activeVideoIndex ? true : false}
        getItemLayout={getItemLayout}
        // disableVirtualization={false} // convert to true when make release build
        viewabilityConfig={{
          // waitForInteraction: false,
          // minimumViewTime: 250,
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  height: ${Platform.OS === 'ios' ? '100%' : '100%'};
  background-color: ${props => props.colors.primary};
`;

const DareView = styled.View`
  flex: 1,
  height: 14%;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
  slide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: WINDOW_WIDTH,
  },
});
