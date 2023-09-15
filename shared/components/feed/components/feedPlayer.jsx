import React, {useEffect, useRef, useState} from 'react';
import VideoPlayer from './video';

const FeedPlayer = ({
  videoRef,
  pausedStatus,
  assetPoster,
  assetReference,
  muted,
  loop,
  setShowLoader,
  handleProgress = val => {},
  virtualRef,
  activeVideo,
}) => {
  const isReady = useRef(false);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const onReadyForDisplay = () => {
    setShowLoader(false);
    isReady.current = true;
    if (activeVideo && virtualRef.current && isReady.current) {
      virtualRef.current.setNativeProps({
        scrollEnabled: true,
      });
    }
  };
  const onLoad = ({naturalSize}) => {
    if (naturalSize.height > naturalSize.width) {
      setIsHorizontal(false);
    }
    setShowLoader(false);
  };

  useEffect(() => {
    if (activeVideo && virtualRef.current && isReady.current) {
      virtualRef.current.setNativeProps({
        scrollEnabled: true,
      });
    }
  }, [activeVideo]);

  return (
    <VideoPlayer
      ref={ref => {
        videoRef.current = ref;
      }}
      assetPoster={assetPoster}
      assetReference={assetReference}
      isHorizontal={isHorizontal}
      repeat={loop}
      paused={pausedStatus} //!activeVideo || !playing
      muted={muted} // mute
      progressUpdateInterval={50.0}
      onProgress={handleProgress}
      onReadyForDisplay={onReadyForDisplay}
      onLoad={onLoad}
      onError={() => {
        if (virtualRef.current) {
          virtualRef.current.setNativeProps({
            scrollEnabled: true,
          });
        }
      }}
    />
  );
};
export default FeedPlayer;
