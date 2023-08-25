import React, {useCallback, useEffect, useRef,useState} from 'react';
import {Platform, StyleSheet, Animated} from 'react-native';
import {useTheme} from '@react-navigation/native';
import styled from '@emotion/native';
import Header from '../components/header';
import DareBar from '../components/dare/darebar';
import SingleFeed from '../components/feed/components/singleFeed';
import {useInfiniteFeeds} from '../hooks/useInfiniteFeeds';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  BOTTOM_BAR_HEIGHT,
  DARE_BAR_HEIGHT,
  HEADER_HEIGHT,
} from '../constants';
import {setGlobalNavigation} from '../utils/helper';
import Loader from '../components/common/loader';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const otherHeight =
  BOTTOM_BAR_HEIGHT + (Platform.OS === 'ios' ? getStatusBarHeight() + 2 : 0);
const totalhHeight = WINDOW_HEIGHT-otherHeight - DARE_BAR_HEIGHT - HEADER_HEIGHT;

export default ({navigation}) => {
  const {colors} = useTheme();
  const {data, fetchNextPage,refetch,isRefetching} = useInfiniteFeeds();
  const videoRef = useRef(null);
  const virtualRef = useRef(null);
  const Yscroll = React.useRef(new Animated.Value(0)).current;
  // const activeIndex = React.useRef(0);
  const [activeIndex,setActiveIndex]=useState(0);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    const item = viewableItems[0];
    if (item?.index !== undefined) {
      // activeIndex.current = item?.index;
      setActiveIndex(item?.index);
      if (virtualRef.current) {
        virtualRef.current.setNativeProps({
          scrollEnabled: false,
        });
      }
    }
  }, []);

  const getItemLayout = useCallback(
    (item, index) => ({
      length: totalhHeight,
      offset: totalhHeight * index,
      index,
    }),
    [],
  );

  const keyExtractor = useCallback((item, index) => {
    return item?.id.toString() + index;
  }, []);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: Yscroll}}}],
    {
      useNativeDriver: true,
    },
  );

  const Slide = ({item, index}) => {
    const scale = Yscroll.interpolate({
      inputRange: [-1, 0, totalhHeight * index, totalhHeight * (index + 1)],
      outputRange: [1, 1, 1, 1],
    });
    return (
      <Animated.View
        key={item?.id}
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
          currentIndex={activeIndex}
          totalhHeight={totalhHeight}
          virtualRef={virtualRef}
        />
      </Animated.View>
    );
  };

  useEffect(() => {
    setGlobalNavigation(navigation);
  }, []);

  return (
    <Container colors={colors}>
      <Header />
      <DareView colors={colors} height={DARE_BAR_HEIGHT}>
        <DareBar />
      </DareView>
      {data?.feeds?.length > 0 ? (
        <Animated.FlatList
          ref={virtualRef}
          data={data?.feeds}
          key={'flatlist'}
          // extraData={feedRecord.current}
          renderItem={Slide}
          keyExtractor={keyExtractor}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={totalhHeight}
          onScroll={handleScroll}
          // Below three settings stop free scrolling
          snapToInterval={totalhHeight}
          snapToAlignment={'start'}
          decelerationRate={0.980}
          //Performance settings
          removeClippedSubviews={true}
          initialNumToRender={0}
          maxToRenderPerBatch={5}
          windowSize={10}
          // updateCellsBatchingPeriod={100} // Increase time between renders
          disableIntervalMomentum={true}
          scrollEventThrottle={100}
          getItemLayout={getItemLayout}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 50,
          }}
          onViewableItemsChanged={onViewableItemsChanged}
          onRefresh={refetch}
          refreshing={isRefetching}
        />
      ) : (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  height: ${Platform.OS === 'ios' ? '100%' : '100%'};
  background-color: ${props => props.colors.primary};
`;

const DareView = styled.View`
  height: ${props => `${props.height}px`};
`;

const LoaderContainer = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const styles = StyleSheet.create({
  slide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: WINDOW_WIDTH,
  },
});
