import React, {useEffect, useState, useRef} from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import { useInfiniteFeeds } from '../../../hooks/useInfiniteFeeds';
import SingleFeed from './SingleFeed';
// import videoData from './Database';

const ReelsList = ({videoHeight}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const feedRecord = useRef([]);
  const [refresh, setRefresh] = useState(false)
  const [playing, setPlaying] = useState(true);
  const { status, data, error, isLoading, refetch, fetchNextPage } = useInfiniteFeeds();

  const handleChangeIndexValue = ({index}) => {
    feedRecord.current = [...feedRecord.current, ...data?.feeds.slice(index+1, index+2)];
    setCurrentIndex(index);
  };

  useEffect(() => {
    if(data?.feeds !== undefined) {
      feedRecord.current = [...feedRecord.current, ...data?.feeds.slice(0, 2)];
      setRefresh(!refresh)
    }
  }, [data?.feeds, currentIndex == undefined])

 
  return (
    <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={feedRecord.current}
      renderItem={({item, index}) => (
        <SingleFeed 
          item={item} 
          index={index} 
          currentIndex={currentIndex} 
          playing={playing} 
          setPlaying={setPlaying}
          videoHeight={videoHeight}
        />
      )}
      keyExtractor={(item, index) => index}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={1}
      maxToRenderPerBatch={2}
    />
  );
};

export default ReelsList;
