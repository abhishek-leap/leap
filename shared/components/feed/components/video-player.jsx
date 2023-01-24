import React,{useState} from 'react';
import {StyleSheet, View, ActivityIndicator, Dimensions} from 'react-native';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  video: {
   width: '100%',
   height: '100%',
  },
});
const VideoPlayer= ({data, isActive, muted, setProgress,index, height, width}) => {
  const asset = data.videos[0];
  const uri = asset.reference;
  const poster = asset.imageLink;
  const [playing, setPlaying] = useState(true);
  const [opacity, setOpacity] = useState(0);
  return (
    <View style={styles.video}>
      <Video
        muted={muted}
        style={styles.video}
        source={{uri: uri}}
        poster={poster}
        paused={!isActive || !playing}
        resizeMode="contain"
        posterResizeMode='contain'
        repeat={true}
        bufferConfig={{
          minBufferMs: 10000,
          maxBufferMs: 10000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000
        }}
        onProgress={data => {
          setProgress(data);
        }}
        onTouchEnd={() => {
          setPlaying(prevState => !prevState);
        }}
        onBuffer={({isBuffering}) => {
          setOpacity(isBuffering ? 1 : 0);
        }}
        onLoadStart={() => {
          setOpacity(1);
        }}
        onLoad={() => {
          videoTracks: [{width: '100%'}],
          setOpacity(0);
        }}
        onSeek={{
          currentTime: 100.5,
          seekTime: 100
        }}
      />
      <ActivityIndicator
          animating
          size="large"
          color={"#9900D9"}
          style={[{
            position: 'absolute',
            top: height / 2.2,
            left: width / 2,
            right: width / 2,
            },
            {opacity: opacity}
          ]}
      />
    </View>
  );
};
export default VideoPlayer;