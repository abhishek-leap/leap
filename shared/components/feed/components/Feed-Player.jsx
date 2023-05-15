import React from 'react';
import Video from 'react-native-video';
import { INITIAL_LOAD_FEED } from '../../../constants';
import { useDispatch } from 'react-redux';
import { feedScreenDisplay } from '../../../redux-ui-state/slices/feedsSlice';

const areEqual = (prevProps, nextProps) => {
    const { muted: prevMuted, playing: prevPlaying, url: prevUrl } = prevProps;
    const { muted: nextMuted, playing: nextPlaying, url: nextUrl } = nextProps;
  
    if (
      prevMuted === nextMuted &&
      prevPlaying === nextPlaying &&
      prevUrl === nextUrl
    )
      return true;
    return false;
};

const MemoisedReactNativePlayer = React.memo(Video, areEqual);

const FeedPlayer= ({
  videoRef,
  feedScreen,
  pausedStatus,
  assetPoster, 
  assetReference,
  muted,
  loop,
  handleProgress = (val) => {},
  handleEnd = () => {},
}) => {
  const dispatch = useDispatch();
  return (
    <MemoisedReactNativePlayer
        ref={(ref) => {
            videoRef.current = ref
        }}
        hideShutterView={true}
        removeClippedSubviews={true}
        repeat={loop}
        poster={assetPoster}
        posterResizeMode='contain' //{isCover ? "cover" : "contain"}
        resizeMode='contain' //{isCover ? "cover" : "contain"}
        paused={pausedStatus} //!activeVideo || !playing
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
        playInBackground={false}
        maxBitRate={10724378} // 1072437
        reportBandwidth={true}
        minLoadRetryCount={3}
        selectedVideoTrack={{
            type: "resolution",
            value: 480
        }}
        useTextureView={false}
        disableFocus={true}
        bufferConfig={{
            minBufferMs: 2500, //number
            maxBufferMs: 5000, //number
            bufferForPlaybackMs: 2500, //number
            bufferForPlaybackAfterRebufferMs: 2500, //number
        }}
        automaticallyWaitsToMinimizeStalling={false}
        allowsExternalPlayback={false}
        style={{
          width: '100%',
          height: '100%',
        }}
        progressUpdateInterval={50.0}
        onProgress={handleProgress}
        onEnd={handleEnd}
        onLoadStart={() => {
        }}
        onLoad={response => {
            if (feedScreen < INITIAL_LOAD_FEED) {
                dispatch(feedScreenDisplay(feedScreen + 1));
            }
        }}
    />
  );
};
export default FeedPlayer;