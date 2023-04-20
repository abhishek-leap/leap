import React, { useState } from "react";
import styled from '@emotion/native';
import { useDispatch, useSelector } from "react-redux";

import VideoPlayer from "../common/video.player";
import { setAudioOff, setAudioOn } from '../../redux-ui-state/slices/feedsSlice';
import UnmuteMuteIcon from '../../images/unmuteMute.svg';

const VideoPlayMode = ({
  firstVideoUrl,
  firstCover,
  secondVideoUrl,
  secondCover,
  secondVideoProgress,
  firstVideoProgress,
  onEnd,
}) => {
  const { audioOn } = useSelector(state => state.feeds);
  const dispatch = useDispatch();
  const [isExistFirstVideo, setIsExistFirstVideo] = useState(firstVideoUrl);
  const [isExistSecondVideo, setIsExistSecondVideo] = useState('');

  const handleAudio = () => {
    if (audioOn) {
      dispatch(setAudioOff());
    } else {
      dispatch(setAudioOn());
    }
  };

  const handleFirstVideoFinish = () => {
    setIsExistFirstVideo('')
    setIsExistSecondVideo(secondVideoUrl)
  };

  const handleSecondVideoFinish = () => {
    // setIsExistSecondVideo('')
  };

  return (
    <Wrapper onClick={handleFirstVideoFinish}>
          {isExistFirstVideo && (
          <>
            <VideoPlayer
              assetPoster={firstCover}
              assetReference={firstVideoUrl}
              handleProgress={(playedObj) => {
                // if (isActive) {
                  firstVideoProgress(playedObj);
                // }
              }}
              handleEnd={handleFirstVideoFinish}
              muted={audioOn}
              playing={false}
              loop={false}
            />
            <VolumeBtnWrapper onPress={() => handleAudio()}>
              <UnmuteMuteIcon 
                height={35} 
                width={35} 
                fill={audioOn ? 'transparent' : 'white'}
                color={audioOn ? 'white' : 'transparent'}
              />
            </VolumeBtnWrapper> 
          </>
          )}
          {isExistSecondVideo && (
            <>
              <VideoPlayer
                assetPoster={secondCover}
                assetReference={secondVideoUrl}
                handleProgress={(playedObj) => {
                  // if (isActive) {
                    secondVideoProgress(playedObj);
                  // }
                }}
                handleEnd={handleSecondVideoFinish}
                muted={audioOn}
                playing={false}
                loop={false}
              />
              <VolumeBtnWrapper onPress={() => handleAudio()}>
                <UnmuteMuteIcon 
                  height={35} 
                  width={35} 
                  fill={audioOn ? 'transparent' : 'white'}
                  color={audioOn ? 'white' : 'transparent'}
                />
              </VolumeBtnWrapper>
            </>
          )}
    </Wrapper>
  );
};

export default VideoPlayMode;

const Wrapper = styled.View`
  height: 90%;
`;

const VolumeBtnWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 25%;
`;