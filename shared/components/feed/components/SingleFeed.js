import React, { useEffect, useState, memo } from 'react';
import { View, Dimensions, ActivityIndicator, Pressable, Image } from 'react-native';
import Video from 'react-native-video';
import styled from '@emotion/native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import Dots from '../../../images/dots.svg';
import Block from '../../../images/block.svg';

import { openDareBackBottomDrawer, selectedPost } from '../../../redux-ui-state/slices/dareBackSlice';
import { FullAuthentication, openAuthenticationBottomDrawer } from '../../../redux-ui-state/slices/authenticationSlice';
import { feedScreenDisplay, openThreeDotsBottomDrawer, selectedFeedItem } from '../../../redux-ui-state/slices/feedsSlice';

import ProgressBar from './progress-bar';
import RealInfo from './reel-info';
import FeedOptions from './feed-options';
import { getData, getVideoUrl } from '../../../utils/helper';
import { INITIAL_LOAD_FEED } from '../../../constants';

const WINDOW_WIDTH = Dimensions.get('window').width;

const SingleFeed = ({
  item,
  index,
  currentIndex,
  playing,
  setPlaying,
  TotalhHeight,
  videoRef,
  // onScrollHandler
}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { blockedUsersList, feedScreen } = useSelector(state => state.feeds);

  const asset = item?.videos ? item?.videos[0] || '' : '';
  const uri = asset?.reference || item?.compressedVideoUrl || '';
  const poster = asset?.imageLink || item?.compressedThumbUrl || '';
  const activeVideo = currentIndex == undefined ? false : currentIndex == index;

  // const [videoUri, setVideoUri] = useState(uri);
  // const [opacity, setOpacity] = useState(0);
  const [mute, setMute] = useState(false);
  // const [isCover, setIsCover] = useState(false);
  const [progress, setProgress] = useState();
  const [isBlockToggle, setIsBlockToggle] = useState(false);

  let isBlocked = false; //blockedUsersList.indexOf(item?.id) > -1;
  let isPowerUser = false; //getData('power_user');
  let blockedByPowerUser = false; //item?.blockPowerUserId ? true : false;

  let blockedText = '';

  // if (item?.communityBlockersCount && !item?.blockPowerUserId && !item?.blockedAt) {
  //   blockedText = item?.communityBlockersCount;
  // } else if (!item?.blockPowerUserId && item?.blockedAt) {
  //   blockedText = 'you blocked';
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      isBlocked = blockedUsersList.indexOf(item?.id) > -1;
      isPowerUser = getData('power_user');
      blockedByPowerUser = item?.blockPowerUserId ? true : false;

      let blockedText = '';

      if (item?.communityBlockersCount && !item?.blockPowerUserId && !item?.blockedAt) {
        blockedText = item?.communityBlockersCount;
      } else if (!item?.blockPowerUserId && item?.blockedAt) {
        blockedText = 'you blocked';
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   let fileName = uri.substring(uri.lastIndexOf("/") + 1, uri.length);
  //   if(currentIndex !== undefined) {
  //     getVideoUrl(uri, fileName)
  //     .then(res => {
  //       setVideoUri(res);
  //     })
  //     .catch(url => {
  //       setVideoUri(url);
  //     });
  //   }
    
  // },[])

  const closeModal = () => { }

  const dareBackUI = (isBasicSignupCompleted, isExtendedSignupCompleted) => {
    if (isBasicSignupCompleted != "true" || isExtendedSignupCompleted != "true") {
      dispatch(FullAuthentication(1));
      dispatch(openAuthenticationBottomDrawer());
    } else if (isBasicSignupCompleted == "true" || isExtendedSignupCompleted == "true") {
      dispatch(selectedPost(item))
      dispatch(openDareBackBottomDrawer());
    }
  }

  // const onBuffer = buffer => {
  //   // console.log('buffring', buffer);
  // };
  // const onError = error => {
  //   console.log('single feed error', error);
  // };

  const clickHandler = () => {
    setMute(!mute);
  };

  const PlayAndMute = () => {
    setPlaying(prevState => !prevState)
  }

  const handleOpenDrawer = () => {
    const isMatched = blockedUsersList.indexOf(item.id);
    dispatch(openThreeDotsBottomDrawer())
    dispatch(selectedFeedItem(item))
  }

  return (
    <View
      style={{
        height: TotalhHeight, width: '100%',
        backgroundColor: colors.primary,
        blurRadius: 90,
      }}
    >
        <Pressable activeOpacity={0.9}
          onPress={() => PlayAndMute()}
          style={{
            opacity: isBlocked && isPowerUser == 'false' ? 0.2 : 1,
          }}
        >
        <Video
          ref={videoRef}
          // onBuffer={onBuffer}
          // onError={onError}
          hideShutterView={true}
          removeClippedSubviews={true}
          repeat={true}
          poster={poster}
          posterResizeMode={"contain"} // {isCover ? "cover" : "contain"}
          resizeMode={"contain"} // {isCover ? "cover" : "contain"}
          paused={!activeVideo || !playing}
          source={{ 
            isNetwork: true,
            uri: uri, 
            type: 'm3u8',
            headers: {
              Range: 'bytes=0-'
            }
          }}
          muted={mute}
          playWhenInactive={true}
          maxBitRate={1072437} // 97.65625
          minLoadRetryCount={5}
          bufferConfig={{
            minBufferMs: 15000, //number
            maxBufferMs: 50000, //number
            bufferForPlaybackMs: 2500, //number
            bufferForPlaybackAfterRebufferMs: 5000 //number
          }}
          automaticallyWaitsToMinimizeStalling={false}
          allowsExternalPlayback={false}
          isLooping
          style={{
            width: '100%',
            height: '100%',
          }}
          progressUpdateInterval={50.0}
          onProgress={data => {
            setProgress(data);
            // if(data.currentTime > 0.10 && !global.videoScroll) {
            //   global.videoScroll = true
            // } else if(global.videoScroll && data.currentTime < 0.50) {
            //   global.videoScroll = false
            // }
          }}
          onLoadStart={() => {
            // setOpacity(1)
            // console.log("onLoadStart ", new Date());
          }}
          onLoad={response => {
            // global.videoScrollIndex = index
            // console.log("onLoad ", new Date());

            const { orientation } = response.naturalSize;
            const isPortrait = orientation == 'portrait' ? true : false;
            setIsCover(isPortrait);
             
            if(feedScreen < INITIAL_LOAD_FEED) {
              dispatch(feedScreenDisplay(feedScreen + 1))
            }
          }}
        />
        </Pressable>
        <ActivityIndicator
          animating
          size="large"
          color={"#9900D9"}
          style={[{
            position: 'absolute',
            top: TotalhHeight / 2.2,
            left: WINDOW_WIDTH / 2,
            right: WINDOW_WIDTH / 2,
          },
          { opacity: progress?.currentTime > 0 ? 0 : 1 }
          ]}
        />
        
        {(isBlocked || (item?.communityBlockersCount > 0 && isPowerUser == 'true')) &&
          <BlockBGView blockedByPowerUser={blockedByPowerUser} isBlockToggle={isBlockToggle} onPress={() => setIsBlockToggle(status => !status)}>
            <BlockUpperView>
              <Block />
              <BlockText>{'Blocked'}</BlockText>
            </BlockUpperView>
            {isBlockToggle && <BlockLowerView colors={colors}>
              <BlockCountText>{blockedText}</BlockCountText>
            </BlockLowerView>}
          </BlockBGView>
          // <BlockItem />
        }
      <ThreeDots onPress={() => handleOpenDrawer()}>
        <Dots height={25} width={25} />
      </ThreeDots>
      <FeedOptionsContainer>
          <FeedOptions 
            data={item} 
            clickHandler={clickHandler} 
            mute={mute}
          />
      </FeedOptionsContainer>
      <RealInfo 
        item={item} 
        progress={progress} 
        windowHeight={TotalhHeight}
        dareBackUI={dareBackUI}
        closeModal={closeModal}
      />
      <ProgressBar data={progress} windowHeight={TotalhHeight} />
    </View>
  );
};

export default memo(SingleFeed);

const FeedOptionsContainer = styled.View`
  position: absolute;
  right: 4px;
  height: 100%;
`;

const ThreeDots = styled.TouchableOpacity`
  position: absolute;
  right: 5px;
  transform: rotate(90deg);
  hitSlop: {top: 100, bottom: 100, left: 100, right: 100}
  padding: 20px 20px 20px 0;
`;

const BlockBGView = styled.TouchableOpacity`
  padding: 4.67px 8.78px;
  display: flex;
  align-items: flex-start;
  margin-left: 25px;
  background-color: ${props => props.blockedByPowerUser ? '#b80000' : 'rgb(184, 110, 0)'}; //rgb(184, 110, 0); //linear-gradient(rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0) 59.62%), rgb(184, 110, 0);
  border: 0.5px solid rgba(255, 255, 255, 0.53);
  box-shadow: rgb(0 0 0 / 71%) 0px 2px 2px;
  border-radius: 0px 0px 14px 14px;
  position: absolute;
  top: 0px;
  width: ${props => props.isBlockToggle ? '23%' : '7%'};
  height: 4%;
`;

const BlockText = styled.Text`
  color: #fff;
  padding-left: 10px;
`;

const BlockUpperView = styled.View`
  flex-direction: row;
`;

const BlockLowerView = styled.View`
  margin-top: 10%;
  width: 100%;
  height: 200%;
  padding-top: 6px;
  flex-direction: row;
  justify-content: center;
  background-color: hsla(0,0%,85%,.8);
`;

const BlockCountText = styled.Text`
    color: #000;
    text-align: center;
`;