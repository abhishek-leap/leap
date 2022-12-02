import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, FlatList, Dimensions, Platform} from 'react-native';
import {loadFeeds} from '../apis';
import DareBar from '../components/dare/darebar';
import VideoPlayer from '../components/feed';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const height =
  Platform.OS === 'ios' ? windowHeight * 0.695 : windowHeight * 0.738;
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

const Slide = ({item, isActive, muted, setIsMuted}) => {
  // const {height, width} = useWindowDimensions();
  return (
    <View style={styles.slide}>
      <VideoPlayer
        data={item}
        isActive={isActive}
        muted={muted}
        setIsMuted={setIsMuted}
      />
    </View>
  );
};

export default () => {
  const [feeds, setFeeds] = useState([]);
  const [feedMetaData, setFeedMetaData] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setIsMuted] = useState(true);

  const fetchFeedsFromApi = async offset => {
    console.log('Calling API ??????: ', offset);
    const queyParams = {options: JSON.stringify({offset, limit: 10})};
    const res = await loadFeeds(queyParams);
    const result = await res.json();

    const {feeds: apiFeeds, meta} = result;
    setFeeds([...feeds, ...apiFeeds]);
    setFeedMetaData(meta);
  };

  useEffect(() => {
    fetchFeedsFromApi(0);
  }, []);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    const item = viewableItems[0];
    setActiveIndex(item.index);
  }, []);

  const loadMoreFeeds = async info => {
    console.log('fetching more: ', info);
    const offset = feeds.length;
    // no more elements to fetch
    if (offset >= feedMetaData.total) return;

    fetchFeedsFromApi(offset);
  };

  return (
    <View style={styles.wrapper}>
      <DareBar height={90} />
      <FlatList
        data={feeds}
        renderItem={({item, index}) => (
          <Slide
            isActive={index === activeIndex}
            item={item}
            muted={muted}
            setIsMuted={setIsMuted}
          />
        )}
        keyExtractor={(item, index) => `${index}_${item.id}`}
        snapToInterval={height}
        decelerationRate={0}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        onViewableItemsChanged={onViewableItemsChanged}
        onEndReached={loadMoreFeeds}
        onEndReachedThreshold={3}
      />
    </View>
  );
};
