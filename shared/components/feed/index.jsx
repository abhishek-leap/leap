import styled from '@emotion/native';
import React, {useState} from 'react';
import FeedOptions from './components/feed-options';
import ProgressBar from './components/progress-bar';
import VideoPlayer from './components/video-player';

const FeedItem = ({data, isActive, muted, setIsMuted,index}) => {
  const [progress, setProgress] = useState();

  const clickHandler = () => {
    setIsMuted(prevState => !prevState);
  };

  return (
    <Container>
      <VideoPlayer
        data={data}
        isActive={isActive}
        muted={muted}
        setProgress={setProgress}
        index={index}
      />
      <ProgressBar data={progress} />
      <FeedOptionsContainer>
        <FeedOptions />
      </FeedOptionsContainer>
      <AudioIconContainer onPress={clickHandler}>
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

export default React.memo(FeedItem);

const Container = styled.View`
  height: 100%;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const FeedOptionsContainer = styled.View`
  position: absolute;
  right: 20px;
  height: 100%;
`;

const AudioIconContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  left: 15px;
  padding:5px;
`;

const ImageContainer = styled.Image`
  height: 10px;
  width: 15px;
`;
