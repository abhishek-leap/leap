import React, {useState} from 'react';
import VideoPlayer from '../feed/components/video';

const DareVideoPlayer = ({
  playing,
  assetPoster,
  assetReference,
  muted,
  loop,
  handleProgress = val => {},
  handleEnd = () => {},
}) => {
  const [isHorizontal, setIsHorizontal] = useState(true);
  const onLoad = ({naturalSize}) => {
    if (naturalSize.height > naturalSize.width) {
      setIsHorizontal(false);
    }
  };

  return (
    <VideoPlayer
      repeat={loop}
      assetPoster={assetPoster}
      assetReference={assetReference}
      paused={!playing} //!activeVideo || !playing
      muted={muted} // mute
      progressUpdateInterval={100.0}
      onProgress={handleProgress}
      onEnd={handleEnd}
      onLoad={onLoad}
    />
  );
};
export default DareVideoPlayer;
