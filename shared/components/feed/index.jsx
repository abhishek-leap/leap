import styled from '@emotion/native';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import FeedOptions from './components/feed-options';
import ProgressBar from './components/progress-bar';
import VideoPlayer from './components/video-player';
import {DEFAULT_HASH_TAGS_COUNTOSHOW} from '../../constants';
import Content from './components/content';
import Skill from '../feed/components/skill';
import Battle from '../feed/components/battle';
import { parsePostBody } from '../../utils';

const FeedItem = ({data, isActive, muted, setIsMuted,index, height, width, currentIndex, playing, setPlaying, windowHeight}) => {
  const { hashTags, body, author, skills, availableForDareBack } = data;
  const [progress, setProgress] = useState();
  const [showMoreHashtagsBtn, setShowMoreHashtagsBtn] = useState(hashTags > DEFAULT_HASH_TAGS_COUNTOSHOW);
  const skillStr = skills?.[0]?.alias;
  const [postTitle] = parsePostBody(body);

  const clickHandler = () => {
    setIsMuted(prevState => !prevState);
  };

  const closeModal = () => {
    // if (currentPostId) {
    //   dispatch(resetCurrentPost());
    // }
  };

  return (
    <Container>
      <VideoPlayer
        data={data}
        // isActive={isActive}
        currentIndex={currentIndex}
        muted={muted}
        setProgress={setProgress}
        index={index}
        height={height}
        width={width}
        playing={playing}
        setPlaying={setPlaying}
      />
      <ProgressBar data={progress} windowHeight={windowHeight}/>
      <FeedOptionsContainer>
        <FeedOptions data={data}/>
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
      {availableForDareBack ? <BattleIconContainer>
        <Battle width={35} height={35}/>
      </BattleIconContainer> : <></> }
      <InfoContainer>
        {author.alias !== "" && (
          <Text style={{color: 'white'}}>{author.alias && author.alias !== author?.entityId ? author.alias : author?.name}</Text>
        )}
        {postTitle && <Text style={{color: 'white'}}>{postTitle}</Text> }
        {hashTags && (
            <HashtagsContainer>
              {data.hashTags?.map((item, idx) => {
                return (
                  <Content key={`${idx}-${item}`} text={item} isHashTag={true} fontSize={11} closeModal={closeModal} />
                );
              })}
              {hashTags.length > DEFAULT_HASH_TAGS_COUNTOSHOW && (
                <ContentMoreSpan onClick={() => setShowMoreHashtagsBtn(prev => !prev)}>
                  {
                    showMoreHashtagsBtn ? 
                      <Text style={{color: 'white'}}>{'More...'}</Text> :
                      <Text style={{color: 'white'}}>{'...less'}</Text>
                  }
                </ContentMoreSpan>
              )}
            </HashtagsContainer>
        )}
        {skillStr && (
           <View style={{flexDirection: 'row'}}>
            <Skill width={20} height={20} />
            <Text style={{color: 'white'}}>{skillStr}</Text>
          </View>
        )}
        
      </InfoContainer>
    </Container>
  );
};

export default FeedItem;

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
  left: 8px;
  padding:5px;
`;

const BattleIconContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  right: 15px;
  padding:5px;
`;

const InfoContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  left: 8px;
  padding:0px;
  flex-direction: column;
`;

const ImageContainer = styled.Image`
  height: 10px;
  width: 15px;
`;

const HashtagsContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const ContentMoreSpan = styled.View`
  font-size: 12px;
  letter-spacing: 0.4px;
  opacity: 0.6;
  padding-left: 10px;
  font-family: "Metropolis-Regular";
  padding-top: 3px;
`;