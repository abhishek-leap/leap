import React, {useEffect, useState, useRef, useCallback} from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import { useInfiniteFeeds } from '../../../hooks/useInfiniteFeeds';
import SingleFeed from './SingleFeed';
import {videoData} from './Database';
import { mockAPI, mockAPIPlayLeapFeeds } from '../../../apis';
import styled from '@emotion/native';
import VideoPlayer from '../../feed';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ReelsList = ({parentViewHeight, colors}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const feedRecord = useRef([]);
  const [refresh, setRefresh] = useState(false)
  const [playing, setPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, fetchNextPage } = useInfiniteFeeds();
 const [feedData, setFeedData] = useState([])
 
  useEffect(() => {
    getInfiniteFeedsMock()
  },[])

  const getInfiniteFeedsMock = async () => {
    const data = await mockAPI();
    // const data = await mockAPIPlayLeapFeeds();
    setFeedData(data);
    return data;
  }

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    const item = viewableItems[0];
    setActiveIndex(item?.index);
  }, []);
  
  const handleChangeIndexValue = ({index}) => {
    // feedRecord.current = [...feedRecord.current, ...data?.feeds.slice(feedRecord.current.length, feedRecord.current.length+2)];
    setCurrentIndex(index);
  };

  // useEffect(() => {
  //   // const record = data?.feeds.find(item => item?.videos[0].resource !== 'youtube');
  //   if(data?.feeds !== undefined && feedRecord.current.length === 0) {
  //     feedRecord.current = [...feedRecord.current, ...data?.feeds.slice(0, 2)];
  //     setRefresh(!refresh)
  //   }
  // }, [data?.feeds, currentIndex == undefined])

  return (
      <SwiperFlatList
        vertical={true}
        onChangeIndex={handleChangeIndexValue}
        data={feedData}
        renderItem={({item, index}) => (
          <SingleFeed 
            item={item} 
            index={index} 
            currentIndex={currentIndex} 
            playing={playing} 
            setPlaying={setPlaying}
            parentViewHeight={parentViewHeight}
            // videoHeight={videoHeight}
          />
        )}
        keyExtractor={(item, index) => index}
        // onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={6}
        maxToRenderPerBatch={2}
      />
  );
};

export default ReelsList;