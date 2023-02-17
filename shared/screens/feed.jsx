import React, {useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import DareBar from '../components/dare/darebar';
import VideoPlayer from '../components/feed';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import { useInfiniteFeeds } from '../hooks/useInfiniteFeeds';
import { setGlobalNavigation } from '../utils/helper';

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

export default ({navigation}) => {
  const activeIndex = useRef(0);
  const [muted, setIsMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const {colors} = useTheme();
  const Yscroll = React.useRef(new Animated.Value(0)).current;
  const { status, data, error, isLoading, refetch, fetchNextPage } = useInfiniteFeeds()
  const viewabilityConfig = {minimumViewTime: 600, viewAreaCoveragePercentThreshold: 10};

  setGlobalNavigation(navigation);
  
  const onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
    const item = viewableItems[0];
    activeIndex.current = item?.index
  }, []);

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig: viewabilityConfig, onViewableItemsChanged }])
  
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
          />
        )}
        onScroll={(event) => {
          Animated.event(
            [{nativeEvent: {contentOffset: {y: Yscroll}}}],
            {useNativeDriver: true},
          )
        }}
        removeClippedSubviews={false}
        windowSize={3} //Cons: For a bigger windowSize, you will have more memory consumption. For a lower windowSize, you will have a bigger chance of seeing blank areas.
        maxToRenderPerBatch={3} //Cons: Less frequent batches may cause blank areas, More frequent batches may cause responsiveness issues.
        initialNumToRender={0} //Cons: Setting a low initialNumToRender may cause blank areas, especially if it's too small to cover the viewport on initial render.
        keyExtractor={(item, index) => `${index}_${item?.id}`}
        snapToInterval={height}
        snapToAlignment={"start"}
        decelerationRate={'fast'}
        disableIntervalMomentum
        // viewabilityConfig={{viewAreaCoveragePercentThreshold: 15}}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onViewableItemsChanged={onViewableItemsChanged}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={5}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  height: ${props => props.height};
  background-color: ${props => props.colors.primary};
`;

