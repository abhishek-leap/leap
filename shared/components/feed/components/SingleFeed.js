import React, {useRef, useState} from 'react';
import {View, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
import styled from '@emotion/native';

import { openDareBackBottomDrawer, selectedPost } from '../../../redux-ui-state/slices/dareBackSlice';
import { FullAuthentication, openAuthenticationBottomDrawer } from '../../../redux-ui-state/slices/authenticationSlice';
import {useTheme} from '@react-navigation/native';
import ProgressBar from './progress-bar';
import RealInfo from './reel-info';
import FeedOptions from './feed-options';

const SingleFeed = ({item, index, currentIndex, playing, setPlaying, videoHeight}) => {
  const {colors} = useTheme();
  const asset = item?.videos[0] || '';
  const uri =  asset?.reference || null; // item.video; //
  const poster = asset.imageLink; // item.image; //
  const activeVideo = currentIndex == index;

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const videoRef = useRef(null);
  const [mute, setMute] = useState(false);
  const [progress, setProgress] = useState();
  const opacity = useRef(0);

  const closeModal = () => {}

  const dareBackUI = (isBasicSignupCompleted, isExtendedSignupCompleted) => {
    if (isBasicSignupCompleted != "true" || isExtendedSignupCompleted != "true") {
      dispatch(FullAuthentication(1));
      dispatch(openAuthenticationBottomDrawer());
    } else if (isBasicSignupCompleted == "true" || isExtendedSignupCompleted == "true") {
      dispatch(selectedPost(data))
      dispatch(openDareBackBottomDrawer());
    }
  }

  const onBuffer = buffer => {
    // console.log('buffring', buffer);
  };
  const onError = error => {
    console.log('error', error);
  };

  const clickHandler = () => {
    setMute(!mute);
  };

  const PlayAndMute = () => {
    setPlaying(prevState => !prevState)
  }

  // console.log("item ", item);

  return (
    <View
      style={{
        height: parseInt(videoHeight * 0.850), //videoHeight
        width: '100%',
        backgroundColor: colors.primary
      }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => PlayAndMute()}
        style={{
          height: '100%',
        }}>
        <Video
          videoRef={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          poster={poster}
          repeat={true}
          resizeMode="contain"
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
          onLoad={() => {
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
      </TouchableOpacity>
      <ProgressBar data={progress} windowHeight={videoHeight}/>
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