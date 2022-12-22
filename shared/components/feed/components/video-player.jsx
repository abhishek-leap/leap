import React,{useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
});
const VideoPlayer= ({data, isActive, muted, setProgress,index}) => {
  const asset = data.videos[0];
  const uri = asset.reference;
  const poster = asset.imageLink;
  const [playing, setPlaying] = useState(true);
  return (
    <View style={styles.video}>
      <Video
        muted={muted}
        style={styles.video}
        width="100%"
        height="100%"
        source={{uri: uri}}
        poster={poster}
        paused={!isActive || !playing}
        resizeMode="contain"
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
      />
    </View>
  );
};

export default VideoPlayer;