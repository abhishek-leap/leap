import styled from '@emotion/native';
import {useState} from 'react';
import FeedOptions from './components/feed-options';
import ProgressBar from './components/progress-bar';
import VideoPlayer from './components/video-player';

export default ({data, isActive, muted, setIsMuted}) => {
  const [progress, setProgress] = useState();
  return (
    <Container>
      <VideoPlayer
        data={data}
        isActive={isActive}
        muted={muted}
        setProgress={setProgress}
      />
      <ProgressBar data={progress} />
      <FeedOptionsContainer>
        <FeedOptions />
      </FeedOptionsContainer>
      <AudioIconContainer
        onPress={() => {
          setIsMuted(prevState => !prevState);
        }}>
        <ImageContainer
          source={
            muted
              ? require('../../images/mutedwhite.png')
              : require('../../images/unmutedwhite.png')
          }
        />
      </AudioIconContainer>
    </Container>
  );
};

const Container = styled.View`
  height: 100%;
  width: 100%;
  padding-top:10px;
  padding-bottom:10px;
`;

const FeedOptionsContainer = styled.View`
  position: absolute;
  right: 20px;
  height: 100%;
`;

const AudioIconContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 15px;
  left: 15px;
`;

const ImageContainer = styled.Image`
  height: 10px;
  width: 15px;
`;
