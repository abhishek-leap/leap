import React, {useEffect, useRef,useState} from 'react';
import Video from 'react-native-video';
import {useDispatch} from 'react-redux';

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
  const [isHorizontal,setIsHorizontal]=useState(true);
  const onReadyForDisplay = () => {
    setShowLoader(false);
    isReady.current = true;
    if (activeVideo && virtualRef.current && isReady.current) {
      virtualRef.current.setNativeProps({
        scrollEnabled: true,
      });
    }
  };
  const onLoad = ({ naturalSize }) => {
    if(naturalSize.height>naturalSize.width){
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
    <MemoisedReactNativePlayer
      ref={ref => {
        videoRef.current = ref;
      }}
      key={assetReference}
      hideShutterView={true}
      removeClippedSubviews={true}
      repeat={loop}
      decelerationRate={"normal"}
      poster={assetPoster.replace("d1hus0nx0ytxoz.cloudfront", "playleap-img.imgix")+"?max-w=350&auto=compress"}
      posterResizeMode="contain" //{isCover ? "cover" : "contain"}
      resizeMode={isHorizontal ? "contain" : "cover"} //{isCover ? "cover" : "contain"}
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
        value: 240,
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