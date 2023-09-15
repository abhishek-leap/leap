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
      hideShutterView={true}
      removeClippedSubviews={true}
      repeat={loop}
      assetPoster={assetPoster}
      assetReference={assetReference}
      isHorizontal={isHorizontal} //{isCover ? "cover" : "contain"}
      paused={!playing} //!activeVideo || !playing
      muted={muted} // mute
      maxBitRate={1072437} // 97.65625
      bufferConfig={{
        minBufferMs: 15000, //number
        maxBufferMs: 50000, //number
        bufferForPlaybackMs: 2500, //number
        bufferForPlaybackAfterRebufferMs: 5000, //number
      }}
      progressUpdateInterval={100.0}
      onProgress={handleProgress}
      onEnd={handleEnd}
      onLoad={onLoad}
    />
  );
};
export default DareVideoPlayer;
