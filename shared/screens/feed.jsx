import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Platform
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import styled from '@emotion/native';

import { setGlobalNavigation } from '../utils/helper';
import { useInfiniteFeeds } from '../hooks/useInfiniteFeeds';
import VideoPlayer from '../components/feed';
import DareBar from '../components/dare/darebar';

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

const Slide = ({item, muted, setIsMuted, index, Yscroll, playing, setPlaying, activeIndex}) => {
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
          currentIndex={activeIndex.current}
          muted={muted}
          setIsMuted={setIsMuted}
          index={index}
          height={height}
          width={windowWidth}
          playing={playing}
          setPlaying={setPlaying}
          windowHeight={windowHeight}
        />
      </Animated.View>
  );
};

export default ({navigation}) => {
  const {colors} = useTheme();

  const [muted, setIsMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const Yscroll = useRef(new Animated.Value(0)).current;
  const activeIndex = useRef(0);
  const { status, data, error, isLoading, refetch, fetchNextPage } = useInfiniteFeeds();
  const viewabilityConfig = {minimumViewTime: 600, viewAreaCoveragePercentThreshold: 10};
  
  useEffect(() =>{ 
    setGlobalNavigation(navigation);
  }, [])
  const onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
    const item = viewableItems[0];
    activeIndex.current = item?.index
  }, []);

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig: viewabilityConfig, onViewableItemsChanged }])

  return (
    <Container height={height} colors={colors}>
      <DareBar height={Platform.OS == 'ios' ? 105 : 100} />
      <Animated.FlatList
        data={data?.feeds}
        extraData={data?.feeds}
        renderItem={({item, index}) => (
          <Slide
            item={item}
            muted={muted}
            setIsMuted={setIsMuted}
            index={index}
            Yscroll={Yscroll}
            playing={playing}
            setPlaying={setPlaying}
            activeIndex={activeIndex}
          />
        )}
        onScroll={(event) => {
          Animated.event(
            [{nativeEvent: {contentOffset: {y: Yscroll}}}],
            {useNativeDriver: true},
          )
        }}
        keyExtractor={(item, index) => `${index}_${item?.id}`}

        removeClippedSubviews={false}
        windowSize={3} //Cons: For a bigger windowSize, you will have more memory consumption. For a lower windowSize, you will have a bigger chance of seeing blank areas.
        maxToRenderPerBatch={3} //Cons: Less frequent batches may cause blank areas, More frequent batches may cause responsiveness issues.
        initialNumToRender={0} //Cons: Setting a low initialNumToRender may cause blank areas, especially if it's too small to cover the viewport on initial render.
      
        snapToInterval={height}
        snapToAlignment={"start"}
        decelerationRate={'fast'}
        disableIntervalMomentum

        onViewableItemsChanged={onViewableItemsChanged}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={5}
      />
    </Container>
  )
};

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

const Container = styled.View`
  flex: 1;
  height: ${props => props.height};
  background-color: ${props => props.colors.primary};
`;