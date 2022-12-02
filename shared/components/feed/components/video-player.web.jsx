import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ReactPlayer from 'react-player';

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
});
export default ({data, isActive, muted, setProgress}) => {
  const asset = data.videos[0];
  const uri = asset.reference;
  const poster = asset.imageLink;
  const [playing, setPlaying] = useState(true);
  return (
    <View style={styles.video}>
      <ReactPlayer
        muted={muted}
        style={styles.video}
        width="100%"
        height="100%"
        poster={poster}
        playing={isActive && playing}
        url={uri}
        loop={true}
        playsinline={true}
      />
    </View>
  );
};
