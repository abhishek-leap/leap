import React, {useState, useRef} from 'react';
import styled from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';
import {Animated, Dimensions, View} from 'react-native';

import VideoPlayer from '../common/video.player';
import {setAudioOff, setAudioOn} from '../../redux-ui-state/slices/feedsSlice';
import UnmuteMuteIcon from '../../images/unmuteMute.svg';
import CubeNavigationHorizontal from './horizontal.cubeAnimate';
import {StyleSheet} from 'react-native';
import OneTapToaster from './oneTap.toaster';
import useLocalization from '../../hooks/useLocalization';

const {width, height} = Dimensions.get('window');

const VideoPlayMode = ({
  firstVideoUrl,
  firstCover,
  secondVideoUrl,
  secondCover,
  secondVideoProgress,
  firstVideoProgress,
  onEnd,
  source,
  rotateAngleX,
}) => {
  const {audioOn} = useSelector(state => state.feeds);
  const dispatch = useDispatch();
  const [VideoPlayStatus, setVideoPlayStatus] = useState(true);
  const [onCurrentScreen, setOnCurrentScreen] = useState(true);
  const move = useState(new Animated.Value(600));
  const cube = useRef();
  const {translate}=useLocalization();

  const handleAudio = () => {
    console.log("audio on",audioOn);
    if (audioOn) {
      dispatch(setAudioOff());
    } else {
      dispatch(setAudioOn());
    }
  };

  const handleFirstVideoFinish = (skipped=false) => {
    if (secondVideoUrl) {
      if(!skipped){
        firstVideoProgress(100);
      }
      if (source === 'bar') {
        goToNext();
      } else {
      }
    } else {
      onEnd();
    }
  };

  const handleSecondVideoFinish = () => {
    secondVideoProgress(100);
    setOnCurrentScreen(false);
    onEnd();
  };

  goToNext = () => {
    setVideoPlayStatus(false);
    cube.current.scrollTo(1);
  };

  callBackAfterSwipe = pos => {
    let abs_pos = Math.abs(pos);
    rotateAngleX(abs_pos / 4.6);
    if (abs_pos < 200 && !VideoPlayStatus) {
      setVideoPlayStatus(true);
    } else if (abs_pos > 200 && VideoPlayStatus) {
      setVideoPlayStatus(false);
    }

    if (abs_pos === width * 2) {
      Animated.timing(move, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        delay: 0,
      }).start();
    }
  };

  return (
    <Wrapper>
      <CubeNavigationHorizontal
        ref={view => {
          cube.current = view;
        }}
        callBackAfterSwipe={callBackAfterSwipe}>
        <View style={styles.container}>
          {firstVideoUrl && (
            <>
              <TapView onPress={() => goToNext()}>
                <VideoPlayer
                  assetPoster={firstCover}
                  assetReference={firstVideoUrl}
                  handleProgress={playedObj => {
                    // if (isActive) {
                    if (playedObj.currentTime > 0)
                      firstVideoProgress(
                        (playedObj.currentTime * 100) /
                          playedObj.seekableDuration,
                      );
                    // }
                  }}
                  handleEnd={handleFirstVideoFinish}
                  muted={!audioOn}
                  playing={VideoPlayStatus && onCurrentScreen}
                  loop={false}
                />
              </TapView>
              <VolumeBtnWrapper onPress={() => handleAudio()}>
                <UnmuteMuteIcon
                  height={35}
                  width={35}
                  fill={!audioOn ? 'transparent' : 'white'}
                  color={!audioOn ? 'white' : 'transparent'}
                />
              </VolumeBtnWrapper>
              <OneTapToaster
                toasterMessage={translate('tapToSkip')}
                handleFirstVideoFinish={()=>{handleFirstVideoFinish(true)}}
              />
            </>
          )}
        </View>
        <View >
          {secondVideoUrl && (
            <>
              <TapView onPress={() => handleSecondVideoFinish()}>
                <VideoPlayer
                  assetPoster={secondCover}
                  assetReference={secondVideoUrl}
                  handleProgress={playedObj => {
                    // if (isActive) {
                    // console.log(playedObj)
                    if (playedObj.currentTime > 0)
                      secondVideoProgress(
                        (playedObj.currentTime * 100) /
                          playedObj.seekableDuration,
                      );
                    // }
                  }}
                  handleEnd={handleSecondVideoFinish}
                  muted={!audioOn}
                  playing={!VideoPlayStatus && onCurrentScreen} // !VideoPlayStatus
                  loop={false}
                />
              </TapView>
              <VolumeBtnWrapper onPress={() => handleAudio()}>
                <UnmuteMuteIcon
                  height={35}
                  width={35}
                  fill={!audioOn ? 'transparent' : 'white'}
                  color={!audioOn ? 'white' : 'transparent'}
                />
              </VolumeBtnWrapper>
            </>
          )}
        </View>
      </CubeNavigationHorizontal>
    </Wrapper>
  );
};

export default VideoPlayMode;

const Wrapper = styled.View`
  height: 100%;
`;

const VolumeBtnWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 25%;
`;

const TapView = styled.TouchableOpacity``;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#290c54"
  },
});
