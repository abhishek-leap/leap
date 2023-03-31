import React, { useEffect, useState, memo } from 'react';
import { View, Dimensions, ActivityIndicator, Pressable, Image } from 'react-native';
import Video from 'react-native-video';
import styled from '@emotion/native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';

// import Dots from '../../../images/dots.svg';
// import Block from '../../../images/block.svg';

import { openDareBackBottomDrawer, selectedPost } from '../../../redux-ui-state/slices/dareBackSlice';
import { FullAuthentication, openAuthenticationBottomDrawer } from '../../../redux-ui-state/slices/authenticationSlice';
import { openThreeDotsBottomDrawer, selectedFeedItem } from '../../../redux-ui-state/slices/feedsSlice';

import ProgressBar from './progress-bar';
// import RealInfo from './reel-info';
// import FeedOptions from './feed-options';
import { getData, getVideoUrl } from '../../../utils/helper';

const WINDOW_WIDTH = Dimensions.get('window').width;

const SingleFeed = ({
  item,
  index,
  currentIndex,
  playing,
  setPlaying,
  TotalhHeight,
  videoRef
}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { blockedUsersList } = useSelector(state => state.feeds);

  const asset = item?.videos ? item?.videos[0] || '' : '';
  const uri = asset?.reference || item?.compressedVideoUrl || '';
  const poster = asset?.imageLink || item?.compressedThumbUrl || '';
  const activeVideo = currentIndex == undefined ? false : currentIndex == index;

  const [videoUri, setVideoUri] = useState(uri);
  const [opacity, setOpacity] = useState(0);
  const [mute, setMute] = useState(false);
  const [isCover, setIsCover] = useState(false);
  const [progress, setProgress] = useState();
  const [isBlockToggle, setIsBlockToggle] = useState(false);

  const isBlocked = blockedUsersList.indexOf(item?.id) > -1;
  const isPowerUser = getData('power_user');
  const blockedByPowerUser = item?.blockPowerUserId ? true : false;

  let blockedText = '';

  if (item?.communityBlockersCount && !item?.blockPowerUserId && !item?.blockedAt) {
    blockedText = item?.communityBlockersCount;
  } else if (!item?.blockPowerUserId && item?.blockedAt) {
    blockedText = 'you blocked';
  }

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

  const onBuffer = buffer => {
    // console.log('buffring', buffer);
  };
  const onError = error => {
    console.log('single feed error', error);
  };

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
          videoRef={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          repeat={true}
          poster={poster}
          posterResizeMode={isCover ? "cover" : "contain"}
          resizeMode={isCover ? "cover" : "contain"}
          paused={!activeVideo || !playing}
          source={{ uri: videoUri}}
          muted={mute}
          maxBitRate={1000} // 97.65625
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
            // width: opacity == 1 ? '0%' : '100%',
            // height: opacity == 1 ? '0%' : '100%',
            // opacity: opacity == 1 ? 0 : 1
          }}
          onProgress={data => {
            setProgress(data);
          }}
          onLoadStart={() => {
            setOpacity(1)
          }}
          onLoad={response => {
            setOpacity(0);
            const { orientation } = response.naturalSize;
            const isPortrait = orientation == 'portrait' ? true : false;
            setIsCover(isPortrait);
          }}
        />
        {/* <Image
          style={{
            width: opacity == 1 ? '100%' : '0%',
            height: opacity == 1 ? '100%' : '0%'
          }}
          source={{uri: poster}}
        /> */}
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
          { opacity: opacity }
          ]}
        />
        
        {/* {(isBlocked || (item?.communityBlockersCount > 0 && isPowerUser == 'true')) &&
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
        } */}
      <ProgressBar data={progress} windowHeight={TotalhHeight} />
      {/* <ThreeDots onPress={() => handleOpenDrawer()}>
        <Dots height={25} width={25} />
      </ThreeDots> */}
      {/* <FeedOptionsContainer>
          <FeedOptions data={item}/>
      </FeedOptionsContainer>
      <RealInfo 
        item={item} 
        progress={progress} 
        clickHandler={clickHandler} 
        windowHeight={TotalhHeight}
        mute={mute}
        dareBackUI={dareBackUI}
        closeModal={closeModal}
      /> */}
    </View>
  );
};

export default memo(SingleFeed);

const FeedOptionsContainer = styled.View`
  position: absolute;
  right: 20px;
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