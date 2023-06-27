import React, {useEffect, useRef} from 'react';
import Video from 'react-native-video';
import {INITIAL_LOAD_FEED} from '../../../constants';
import {useDispatch} from 'react-redux';
import {feedScreenDisplay} from '../../../redux-ui-state/slices/feedsSlice';

const areEqual = (prevProps, nextProps) => {
  const {
    muted: prevMuted,
    playing: prevPlaying,
    assetReference: prevUrl,
  } = prevProps;
  const {
    muted: nextMuted,
    playing: nextPlaying,
    assetReference: nextUrl,
  } = nextProps;

  if (
    prevMuted === nextMuted &&
    prevPlaying === nextPlaying &&
    prevUrl === nextUrl
  )
    return true;
  return false;
};

const MemoisedReactNativePlayer = React.memo(Video, areEqual);

const FeedPlayer = ({
  videoRef,
  feedScreen,
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
  const dispatch = useDispatch();
  const onReadyForDisplay = () => {
    setShowLoader(false);
    isReady.current = true;
    if (activeVideo && virtualRef.current && isReady.current) {
      virtualRef.current.setNativeProps({
        scrollEnabled: true,
      });
    }
  };
  const onLoad = () => {
    if (feedScreen < INITIAL_LOAD_FEED) {
      dispatch(feedScreenDisplay(feedScreen + 1));
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
    <MemoisedReactNativePlayer
      ref={ref => {
        videoRef.current = ref;
      }}
      key={assetReference}
      hideShutterView={true}
      removeClippedSubviews={true}
      repeat={loop}
      poster={assetPoster}
      posterResizeMode="contain" //{isCover ? "cover" : "contain"}
      resizeMode="contain" //{isCover ? "cover" : "contain"}
      paused={pausedStatus} //!activeVideo || !playing
      source={{
        isNetwork: true,
        uri: assetReference,
        type: 'm3u8',
        headers: {
          Range: 'bytes=0-',
        },
      }}
      muted={muted} // mute
      playWhenInactive={false}
      playInBackground={false}
      maxBitRate={10724378} // 1072437
      reportBandwidth={true}
      minLoadRetryCount={3}
      selectedVideoTrack={{
        type: 'resolution',
        value: 480,
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
