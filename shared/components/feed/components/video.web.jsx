import {memo} from 'react';
import ReactPlayer from 'react-player';

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

const MemoisedReactPlayer = memo(ReactPlayer, areEqual);

const Video = ({
  ref,
  paused,
  assetPoster,
  assetReference,
  muted,
  repeat,
  isHorizontal,
  onProgress = () => {},
  onLoad = () => {},
  onError = () => {},
  onReadyForDisplay = () => {},
  hideShutterView,
  removeClippedSubviews,
  maxBitRate,
  bufferConfig,
  progressUpdateInterval,
  onEnd = () => {},
}) => {
  const isSafari = /Macintosh|iPod|iPad|iPhone|AppleWebKit/i.test(
    navigator.userAgent,
  );
  console.log('video', assetReference, assetPoster);
  return (
    <MemoisedReactPlayer
      ref={ref}
      width="100%"
      height="100%"
      playsinline={true}
      loop={repeat}
      url={assetReference}
      progressInterval={300}
      onReady={onReadyForDisplay}
      playing={!paused}
      muted={muted}
      onProgress={onProgress}
      onEnded={onEnd}
      config={{
        file: {
          forceHLS: !isSafari,
          forceVideo: true,
          attributes: {
            autoPlay: false,
            poster: assetPoster,
            preload: 'auto',
          },
        },
      }}
    />
  );
};

export default Video;
