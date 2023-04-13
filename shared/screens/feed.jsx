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

const windowHeight = Dimensions.get('window').height;
const videoHeight = Platform.OS == 'ios' ?  parseInt(windowHeight * 0.850) :  parseInt(windowHeight * 0.847);

const getItem = (data, index) => {
  return data[index]
};

  useEffect(() =>{ 
    setGlobalNavigation(navigation);
    let calculatedHeight = (windowHeight*15)/100;
    console.log("videoHeight ", Math.round(calculatedHeight));
  }, [])

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