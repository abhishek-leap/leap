import { useState } from 'react';
import styled from '@emotion/native';

import ProgressBar from './progress-bar';
import FeedOptions from './feed-options';
import Skill from './skill';
import Battle from './battle';
import { parsePostBody } from '../../../utils';
import Content from './content';

const { DEFAULT_HASH_TAGS_COUNTOSHOW } = require('../../../constants');

const RealInfo = ({item, progress, clickHandler, windowHeight, mute, dareBackUI, closeModal}) => {
    const { author, availableForDareBack, hashTags, skillStr, body } = item;
    const [showMoreHashtagsBtn, setShowMoreHashtagsBtn] = useState(hashTags > DEFAULT_HASH_TAGS_COUNTOSHOW);
    const [postTitle] = parsePostBody(body);

    return (
        <Container windowHeight={windowHeight}>
            <AudioIconContainer onPress={clickHandler}>
                <ImageContainer
                source={
                    mute
                    ? require('../../../images/mutedwhite.png')
                    : require('../../../images/unmutedwhite.png')
                }
                />
            </AudioIconContainer>
            {availableForDareBack ? <BattleIconContainer>
                <Battle width={35} height={35} onCallBackFunc={dareBackUI}/>
            </BattleIconContainer> : <></> }
            <InfoContainer>
                {author.alias !== "" && (
                <AliasText>{author.alias && author.alias !== author?.entityId ? author.alias : author?.name}</AliasText>
                )}
                {postTitle && <PostTitleText>{postTitle}</PostTitleText> }
                {hashTags ? (
                    <HashtagsContainer>
                    {hashTags?.map((item, idx) => {
                        return (
                        <Content key={`${idx}-${item}`} text={item} isHashTag={true} fontSize={11} closeModal={closeModal} />
                        );
                    })}
                    {hashTags.length > DEFAULT_HASH_TAGS_COUNTOSHOW && (
                        <ContentMoreSpan onClick={() => setShowMoreHashtagsBtn(prev => !prev)}>
                        {
                            showMoreHashtagsBtn ? 
                            <HashTagText style={{color: 'white'}}>{'More...'}</HashTagText> :
                            <HashTagText style={{color: 'white'}}>{'...less'}</HashTagText>
                        }
                        </ContentMoreSpan>
                    )}
                    </HashtagsContainer>
                ) : <></>}
                {skillStr && (
                <View style={{flexDirection: 'row'}}>
                    <Skill width={20} height={20} />
                    <SkillText style={{color: 'white'}}>{skillStr}</SkillText>
                </View>
                )}
                
            </InfoContainer> 
         </Container>
    )
}

export default RealInfo;

const Container = styled.View`
  height: ${props => props.windowHeight}
`;

const AudioIconContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  left: 8px;
  padding:5px;
`;

const BattleIconContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
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

const AliasText = styled.Text`
  color: white;
`;

const PostTitleText = styled.Text`
  color: white;
`;

const HashTagText = styled.Text`
  color: white;
`;

const SkillText = styled.Text`
  color: white;
`;