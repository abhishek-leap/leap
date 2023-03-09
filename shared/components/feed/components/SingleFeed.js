import React, {useRef, useState} from 'react';
import {View, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
import styled from '@emotion/native';
import { useSelector} from 'react-redux';

import { openDareBackBottomDrawer, selectedPost } from '../../../redux-ui-state/slices/dareBackSlice';
import { FullAuthentication, openAuthenticationBottomDrawer } from '../../../redux-ui-state/slices/authenticationSlice';
import { openThreeDotsBottomDrawer, closeThreeDotsBottomDrawer, selectedFeedItem } from '../../../redux-ui-state/slices/feedsSlice';

import {useTheme} from '@react-navigation/native';
import ProgressBar from './progress-bar';
import RealInfo from './reel-info';
import FeedOptions from './feed-options';
import { useDispatch } from 'react-redux';
import Dots from '../../../images/dots.svg';
import Block from '../../../images/block.svg';

const SingleFeed = ({
  item, 
  index, 
  currentIndex, 
  playing, 
  setPlaying, 
  videoHeight
}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const asset = item?.videos[0] || '';
  const uri =  asset?.reference || null; // item.video; //
  const poster = asset.imageLink; // item.image; //
  const activeVideo = currentIndex == index;
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const videoRef = useRef(null);
  const [mute, setMute] = useState(false);
  const [isCover, setIsCover] = useState(false);
  const [progress, setProgress] = useState();
  const {blockedUsersList} = useSelector(state => state.feeds);
  const isBlocked = blockedUsersList.indexOf(item.id) > -1;
  const isPowerUser = item?.communityBlockersCount > 0;
  const blockPowerUser = item?.blockPowerUserId || 0 && item?.blockedAt || 0;
  const opacity = useRef(0);
  const [isBlockToggle, setIsBlockToggle] = useState(false);

  const closeModal = () => {}

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

  const onCloseThreeDotsClick = () => {
    dispatch(closeThreeDotsBottomDrawer());
  };

  return (
    <View
      style={{
        height: parseInt(videoHeight * 0.850), //videoHeight
        width: '100%',
        backgroundColor: colors.primary,
        blurRadius: 90,
      }}>
        
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => PlayAndMute()}
          style={{
            height: '100%',
            opacity: isBlocked && !isPowerUser ? 0.2 : 1,
          }}>
          <Video
            videoRef={videoRef}
            onBuffer={onBuffer}
            onError={onError}
            poster={poster}
            repeat={true}
            resizeMode={isCover ? "cover" : "contain"}
            posterResizeMode='contain'
            paused={!activeVideo || !playing}
            source={{uri: uri}}
            muted={mute}
            // maxBitRate={2000000} // 2 megabits
            minLoadRetryCount={5} // retry 2 times
            style={{
              width: '100%',
              height: '100%',
              // position: 'absolute',
            }}
            onProgress={data => {
              setProgress(data);
            }}
            onLoadStart={() => {
              opacity.current = 1
            }}
            onLoad={response => {
              const { width, height } = response.naturalSize;
              const isVertical = height > width;
              setIsCover(isVertical)
              opacity.current = 0;
            }}
          />
          <ActivityIndicator
              animating
              size="large"
              color={"#9900D9"}
              style={[{
                position: 'absolute',
                top: videoHeight / 2.2,
                left: windowWidth / 2,
                right: windowWidth / 2,
                },
                {opacity: opacity.current}
              ]}
          />
          {isBlocked || isPowerUser && 
          <BlockBGView blockPowerUser={blockPowerUser} isBlockToggle={isBlockToggle} onPress={() => setIsBlockToggle(status => !status)}>
            <BlockUpperView>
              <Block />
              <BlockText>{'Blocked'}</BlockText>
            </BlockUpperView>
            {isBlockToggle && <BlockLowerView colors={colors}>
                <BlockCountText>{item?.communityBlockersCount}</BlockCountText>
            </BlockLowerView> }
          </BlockBGView>
          // <BlockItem />
        }
        </TouchableOpacity>
      <ProgressBar data={progress} windowHeight={videoHeight}/>
      <ThreeDots onPress={() => handleOpenDrawer()}>
        <Dots height={25} width={25}/>
      </ThreeDots>
      <FeedOptionsContainer>
          <FeedOptions data={item}/>
      </FeedOptionsContainer>
      <RealInfo 
        item={item} 
        progress={progress} 
        clickHandler={clickHandler} 
        windowHeight={videoHeight}
        mute={mute}
        dareBackUI={dareBackUI}
        closeModal={closeModal}
      />
    </View>
  );
};

export default SingleFeed;


const Container = styled.View`
  height: ${props => props.videoHeight},
  width: 100%,
  background-color: ${props => props.colors.primary}
`;

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
  background-color: ${props => props.blockPowerUser ? '#b80000' : 'rgb(184, 110, 0)'}; //rgb(184, 110, 0); //linear-gradient(rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0) 59.62%), rgb(184, 110, 0);
  border: 0.5px solid rgba(255, 255, 255, 0.53);
  box-shadow: rgb(0 0 0 / 71%) 0px 2px 2px;
  border-radius: 0px 0px 14px 14px;
  position: absolute;
  top: 0px;
  width: ${props => props.isBlockToggle ? '23%': '7%'};
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