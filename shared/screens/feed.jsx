import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, Platform, StatusBar, VirtualizedList, StyleSheet } from 'react-native';
// import SwiperFlatList from 'react-native-swiper-flatlist';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import styled from '@emotion/native';
// import { debounce } from 'lodash';

import DareBar from '../components/dare/darebar';
import SingleFeed from '../components/feed/components/SingleFeed';
// import { SaveVideo } from '../utils/helper';
// import { useLeapMockAPI, useMojAPI } from '../hooks/useMasterAPI';
import { useInfiniteFeeds } from '../hooks/useInfiniteFeeds';
import { useDispatch, useSelector } from 'react-redux';
import { dareBarView } from '../redux-ui-state/slices/feedsSlice';
// import {videoData} from '../components/feed/components/Database';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const getItem = (data, index) => {
  return data[index]
};

const getItemCount = (data) => data?.length || 0;

const isIphone = Platform.OS === 'ios' ? 0.3 : 0.88
const iPhoneHeight = Platform.OS == 'ios' ? 85 : 52;

export default ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { dareBarHeight } = useSelector(state => state.feeds);

  const { data, fetchNextPage } = useInfiniteFeeds();
  // const { data } = useMojAPI();
  // const { data } = useLeapMockAPI();
  
  // const feedRecord = useRef([]);
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  // const [refresh, setRefresh] = useState(false)
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const bottomTabHeight = useBottomTabBarHeight();
  const statusBarHeight = StatusBar.currentHeight || 0;
  const TotalHeightMinus = bottomTabHeight + statusBarHeight + Math.floor(dareBarHeight) + iPhoneHeight;
  const TotalhHeight = WINDOW_HEIGHT - TotalHeightMinus;
  
  // const handler = useCallback(debounce(async term => {
  //   if(data.feeds?.length > feedRecord.current?.length) {
  //     const intial = feedRecord.current.length;
  //     const next = intial + 9;
  //     const subArray = data.feeds.slice(intial, next);
      
  //     if(subArray.length > 0) {
  //       feedRecord.current = [...feedRecord.current, ...subArray];
  //       await downloadVideos(subArray);
  //     }
  //   }
  // }, 500), []);

  // async function downloadVideos (array) {
  //   try {
  //     await Promise.all(array.map(async (item) => {
  //       await SaveVideo(item.compressedVideoUrl);
  //     }));
  //   } catch {
  //     console.log("catch block downloadVideos");
  //   }
  // };

  //  useEffect(() => {
  //   if(data.feeds !== undefined && feedRecord.current?.length === 0) {
  //     feedRecord.current = [...feedRecord.current, ...data.feeds.slice(0, 9)];
  //     downloadVideos(feedRecord.current);
  //     setRefresh(!refresh)
  //   }
  // }, [data.feeds !== undefined, activeVideoIndex == undefined])

  /* Below useEffect and updateFeedRecord function code with Feed infinite API */

  // useEffect(() => {
  //   updateFeedRecord();
  // }, [data])

  // const updateFeedRecord = async () => {
  //   if(data.feeds?.length > feedRecord.current?.length) {
  //     const intial = feedRecord.current.length;
  //     const next = intial + 10;
  //     const subArray = data.feeds.slice(intial, next);
      
  //     if(subArray.length > 0) {
  //       feedRecord.current = [...feedRecord.current, ...subArray];
  //       // await downloadVideos(subArray);
  //     }
  //   }
  // }

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    const item = viewableItems[0];
    if(item?.index !== undefined) {
      setActiveVideoIndex(item?.index);
    }
  }, []);

  return (
    <Container colors={colors}>
      <DareView colors={colors} onLayout={(event) => {
        dispatch(dareBarView(event.nativeEvent.layout.height));
      }}>
        <DareBar />
      </DareView>
      {/* <SwiperFlatList
        vertical={true}
        data={feedRecord.current}
        renderItem={({ item, index }) => (
          <SingleFeed
            item={item}
            index={index}
            videoRef={videoRef}
            currentIndex={activeVideoIndex}
            playing={playing}
            setPlaying={setPlaying}
            parentViewHeight={dareBarHeight}
            isActive={activeVideoIndex === index}
            TotalHeightMinus={TotalHeightMinus}
          />
        )}
        keyExtractor={(item, index) => `${index}_${item}`.toString()}
        onEndReachedThreshold={0.5} // 0.1
        // onEndReached={() => fetchNextPage()}

        initialNumToRender={1}
        scrollEventThrottle={1}
        // removeClippedSubviews={true}
        // maxToRenderPerBatch={7}
        // windowSize={3}
        onViewableItemsChanged={onViewableItemsChanged}
        // onScroll={e => {
        //   const index = Math.round(
        //     e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - TotalHeightMinus),
        //   );
        //   console.log("index of scroll ", index);
        //   if(index > 0) {
        //     feedRecord.current = [...feedRecord.current, ...data.slice(feedRecord.current.length, feedRecord.current.length+8)];
        //     const subArray = data.slice(feedRecord.current.length, feedRecord.current.length+8);
        //     downloadVideos(subArray);
        //     // feedRecord.current = [...feedRecord.current, ...data?.feeds.slice(feedRecord.current.length, feedRecord.current.length+2)];
        //     setActiveVideoIndex(index);
        //   }
        // }}
      /> */}
        <VirtualizedList
          data={data?.feeds}
          renderItem={({ item, index }) => (
            <SingleFeed
              item={item}
              index={index}
              videoRef={videoRef}
              currentIndex={activeVideoIndex}
              playing={playing}
              setPlaying={setPlaying}
              isActive={activeVideoIndex === index}
              TotalhHeight={TotalhHeight}
            />
          )}
          keyExtractor={(item, index) => `${index}_${item}`.toString()}
          getItem={getItem}
          getItemCount={getItemCount}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={TotalhHeight}
          snapToInterval={TotalhHeight}
          decelerationRate={isIphone}
          removeClippedSubviews={true}
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          windowSize={2}
          getItemLayout={(item, index) => ({
            length: TotalhHeight,
            offset: TotalhHeight * index,
            index,
          })}
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
          onViewableItemsChanged={onViewableItemsChanged}
        />
    </Container>
  )
};

const Container = styled.SafeAreaView`
  flex: 1;
  height: 100%;
  background-color: ${props => props.colors.primary};
`;

const DareView = styled.View`
  flex: 1,
  height: 13%;
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
});