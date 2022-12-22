import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, Dimensions, Platform, Animated} from 'react-native';
import {loadFeeds} from '../apis';
import DareBar from '../components/dare/darebar';
import VideoPlayer from '../components/feed';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {useInfiniteQuery} from '@tanstack/react-query';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const height =
  Platform.OS === 'ios'
    ? windowHeight > 850
      ? parseInt(windowHeight * 0.71)
      : windowHeight > 820
      ? parseInt(windowHeight * 0.699)
      : windowHeight > 800
      ? parseInt(windowHeight * 0.689)
      : windowHeight < 680
      ? parseInt(windowHeight * 0.67)
      : parseInt(windowHeight * 0.695)
    : Platform.OS === 'web'
    ? parseInt(windowHeight * 0.79)
    : parseInt(windowHeight * 0.738);
const styles = StyleSheet.create({
  wrapper: {flex: 1, height: height, backgroundColor: '#290C54'},
  slide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    height: height,
  },
});

export default () => {
  const [feeds, setFeeds] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setIsMuted] = useState(true);
  const {colors} = useTheme();
  const Yscroll = React.useRef(new Animated.Value(0)).current;

  const fetchFeedsFromApi = async ({pageParam = 0}) => {
    const options = {options: JSON.stringify({offset: pageParam, limit: 10})};
    const queryParams = new URLSearchParams(options);
    const url =
      `https://feedstg.playleap.io/v1/Feeds/feedsByUserId?` + queryParams;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  };

  const {isLoading, data, hasNextPage, fetchNextPage, refetch} =
    useInfiniteQuery({
      queryKey: ['feeds'],
      queryFn: fetchFeedsFromApi,
      getNextPageParam: (lastPage, pages) => pages[0]?.meta?.offset + 10,
    });

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    const item = viewableItems[0];
    setActiveIndex(item?.index);
  }, []);

  const loadMoreFeeds = async info => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  useEffect(() => {
    if (data) {
      console.log(data?.pages);
      const newArr=[...data?.pages[0]?.feeds];
      setFeeds(newArr);
    }
  }, [data]);

  const Slide = ({item, isActive, muted, setIsMuted, index}) => {
    const scale = Yscroll.interpolate({
      inputRange: [-1, 0, height * index, height * (index + 2)],
      outputRange: [1, 1, 1, 0],
    });
    return (
      <Animated.View
        style={[
          styles.slide,
          {
            transform: Platform.OS !== 'web' && [{scale}],
          },
        ]}>
        <VideoPlayer
          data={item}
          isActive={isActive}
          muted={muted}
          setIsMuted={setIsMuted}
          index={index}
        />
      </Animated.View>
    );
  };

  return (
    <Container height={height} colors={colors}>
      <DareBar height={90} />
      <Animated.FlatList
        data={feeds}
        renderItem={({item, index}) => (
          <Slide
            isActive={index === activeIndex}
            item={item}
            muted={muted}
            setIsMuted={setIsMuted}
            index={index}
          />
        )}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: Yscroll}}}],
          {useNativeDriver: true},
        )}
        removeClippedSubviews={true}
        windowSize={3}
        maxToRenderPerBatch={3}
        initialNumToRender={3}
        keyExtractor={(item, index) => `${index}_${item.id}`}
        snapToInterval={height}
        decelerationRate={Platform.OS === 'ios' ? 0.3 : 0.88}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        onViewableItemsChanged={onViewableItemsChanged}
        onEndReached={loadMoreFeeds}
        onEndReachedThreshold={0.3}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  height: ${props => props.height};
  background-color: ${props => props.colors.primary};
`;
