import React,{useState, useRef} from 'react';
import {StyleSheet, View, ActivityIndicator, Dimensions, Platform} from 'react-native';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  video: {
   width: '100%',
   height: '100%',
  },
});
const VideoPlayer= ({data, muted, setProgress,index, height, width, currentIndex, playing, setPlaying}) => {
  const asset = data.videos[0];
  const uri = asset?.reference || null;
  const poster = asset.imageLink;
  const opacity = useRef(0);
  const activeVideo = index === currentIndex;

  return (
    <View style={styles.video}>
      <Video
        muted={muted}
        style={styles.video}
        source={{uri: uri}}
        poster={poster}
        paused={!activeVideo || !playing}
        resizeMode="contain"
        posterResizeMode='contain'
        repeat={true}
        automaticallyWaitsToMinimizeStalling={false}
        currentPlaybackTime
        progressUpdateInterval={5000}
        bufferConfig={{
          minBufferMs: 100000,
          maxBufferMs: 100000,
          bufferForPlaybackMs: 100000,
          bufferForPlaybackAfterRebufferMs: 500000
        }}
        onProgress={data => {
          setProgress(data);
        }}
        onTouchEnd={() => {
          setPlaying(prevState => !prevState);
        }}
        onBuffer={({isBuffering}) => {
          opacity.current = isBuffering ? 1 : 0;
        }}
        onLoadStart={() => {
          opacity.current = 1
        }}
        onLoad={() => {
          opacity.current = 0;
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
            {opacity: opacity.current}
          ]}
      />
    </View>
  );
};
export default VideoPlayer;