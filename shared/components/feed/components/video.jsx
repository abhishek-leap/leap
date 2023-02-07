import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import splash from "../../../images/splash.png";

const Video = ({
  videoUrl,
  progressInterval,
  onEnded,
  onDuration,
  onProgress,
  onReady,
  isPlaying,
  isMute,
  assetPoster
}) => {
  const isSafari = /Macintosh|iPod|iPad|iPhone|AppleWebKit/i.test(navigator.userAgent);
  return (
    <ReactPlayer
      width="100%"
      height="100%"
      playsinline={true}
      url={videoUrl}
      onReady={onReady}
      playing={isPlaying}
      muted={isMute}
      progressInterval={progressInterval}
      onProgress={onProgress}
      onDuration={onDuration}
      onEnded={onEnded}
      config={{
        file: {
          forceHLS: !isSafari,
          forceVideo: true,
          attributes: { autoPlay: false, poster: assetPoster || splash, preload: "auto" }
        }
      }}
    />
  );
};
Video.propTypes = {
  videoUrl: PropTypes.string,
  progressInterval: PropTypes.number,
  isPlaying: PropTypes.bool,
  isMute: PropTypes.bool,
  onDuration: PropTypes.func,
  onProgress: PropTypes.func,
  onReady: PropTypes.func,
  onEnded: PropTypes.func
};

Video.defaultProps = {
  progressInterval: 1000,
  isPlaying: false,
  isMute: false,
  videoUrl: "",
  onDuration: () => {},
  onProgress: () => {},
  onReady: () => {},
  onEnded: () => {}
};

export default Video;
