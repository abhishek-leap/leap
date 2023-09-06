import React, { useState } from 'react';
import Video from 'react-native-video';

const VideoPlayer= ({
  playing,
  assetPoster, 
  assetReference,
  muted,
  loop,
  handleProgress = (val) => {},
  handleEnd = () => {},
}) => {

  const [isHorizontal,setIsHorizontal]=useState(true);
  const onLoad = ({ naturalSize }) => {
    if(naturalSize.height>naturalSize.width){
      setIsHorizontal(false);
    }
  };

  return (
    <Video
        hideShutterView={true}
        removeClippedSubviews={true}
        repeat={loop}
        poster={assetPoster.replace("d1hus0nx0ytxoz.cloudfront", "playleap-img.imgix")+"?max-w=350&auto=compress"}
        posterResizeMode="contain" //{isCover ? "cover" : "contain"}
        resizeMode={isHorizontal ? "contain" : "cover"} //{isCover ? "cover" : "contain"}
        paused={!playing} //!activeVideo || !playing
        source={{ 
          isNetwork: true,
          uri: assetReference, 
          type: 'm3u8',
          headers: {
                Range: 'bytes=0-'
            }
        }}
        muted={muted} // mute
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
        style={{
          width: '100%',
          height: '100%',
        }}
        progressUpdateInterval={100.0}
        onProgress={handleProgress}
        onEnd={handleEnd}
        onLoadStart={() => {
        }}
        onLoad={onLoad}
        ignoreSilentSwitch={"ignore"}
    />
  );
};
export default VideoPlayer;