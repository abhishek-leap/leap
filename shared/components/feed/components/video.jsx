import {memo} from 'react';
import Video from 'react-native-video';

const areEqual = (prevProps, nextProps) => {
  const {
    muted: prevMuted,
    paused: prevPaused,
    assetReference: prevUrl,
  } = prevProps;
  const {
    muted: nextMuted,
    paused: nextPaused,
    assetReference: nextUrl,
  } = nextProps;

  if (
    prevMuted === nextMuted &&
    prevPaused === nextPaused &&
    prevUrl === nextUrl
  )
    return true;
  return false;
};

const MemoisedReactNativePlayer = memo(Video, areEqual);

const VideoPlayer = ({
  ref,
  paused,
  assetPoster,
  assetReference,
  muted,
  repeat,
  isHorizontal,
  hideShutterView,
  removeClippedSubviews,
  maxBitRate,
  bufferConfig,
  progressUpdateInterval,
  onProgress = () => {},
  onLoad = () => {},
  onError = () => {},
  onReadyForDisplay = () => {},
  onEnd = () => {},
}) => {
  console.log('RN video', assetReference, assetPoster);
  return (
    <MemoisedReactNativePlayer
      hideShutterView={hideShutterView}
      removeClippedSubviews={removeClippedSubviews}
      ref={ref}
      key={assetReference}
      repeat={repeat}
      decelerationRate={'normal'}
      poster={
        assetPoster.replace('d1hus0nx0ytxoz.cloudfront', 'playleap-img.imgix') +
        '?max-w=350&auto=compress'
      }
      posterResizeMode={isHorizontal ? 'contain' : 'cover'} //{isCover ? "cover" : "contain"}
      resizeMode={isHorizontal ? 'contain' : 'cover'} //{isCover ? "cover" : "contain"}
      paused={paused} //!activeVideo || !playing
      source={{
        isNetwork: true,
        uri: assetReference,
        type: 'm3u8',
        headers: {
          Range: 'bytes=0-',
        },
      }}
      useSecureView={true}
      shutterColor="transparent"
      muted={muted} // mute
      playWhenInactive={true}
      playInBackground={true}
      maxBitRate={maxBitRate} // 1072437
      minLoadRetryCount={5}
      selectedVideoTrack={{
        type: 'resolution',
        value: 240,
      }}
      bufferConfig={{
        minBufferMs: 1500, //number
        maxBufferMs: 3000, //number
        bufferForPlaybackMs: 1500, //number
        bufferForPlaybackAfterRebufferMs: 1500, //number
        ...(bufferConfig || {}),
      }}
      automaticallyWaitsToMinimizeStalling={false}
      useTextureView={true}
      allowsExternalPlayback={false}
      style={{
        width: '100%',
        height: '100%',
      }}
      progressUpdateInterval={progressUpdateInterval}
      onProgress={onProgress}
      onReadyForDisplay={onReadyForDisplay}
      onLoad={onLoad}
      onError={onError}
      onEnd={onEnd}
      ignoreSilentSwitch={'ignore'}
    />
  );
};

export default VideoPlayer;
