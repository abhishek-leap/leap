import { useState } from 'react';
import styled from '@emotion/native';

import Skill from './skill';
import Battle from './battle';
import { parsePostBody } from '../../../utils';
import Content from './content';

const { DEFAULT_HASH_TAGS_COUNTOSHOW } = require('../../../constants');

const RealInfo = ({item, windowHeight, dareBackUI, closeModal}) => {
    const { author, availableForDareBack, hashTags, body, skills } = item;
    const [showMoreHashtagsBtn, setShowMoreHashtagsBtn] = useState(hashTags > DEFAULT_HASH_TAGS_COUNTOSHOW);
    const [postTitle] = parsePostBody(body);

    return (
        <Container windowHeight={windowHeight}>
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
                        <ContentMoreSpan onPress={() => setShowMoreHashtagsBtn(prev => !prev)}>
                        {
                            showMoreHashtagsBtn ? 
                            <HashTagText>{'More...'}</HashTagText> :
                            <HashTagText>{'...less'}</HashTagText>
                        }
                        </ContentMoreSpan>
                    )}
                    </HashtagsContainer>
                ) : <></>}
                {skills.length > 0 ? (
                  <SkillView>
                      <Skill width={24} height={24} />
                      <SkillText>{skills[0]?.alias}</SkillText>
                  </SkillView>
                )
                :
                <></>
              }
            </InfoContainer> 
            {availableForDareBack ? <BattleIconContainer>
                <Battle width={63} height={70} onCallBackFunc={dareBackUI}/>
            </BattleIconContainer> : <></> }
         </Container>
    )
}

export default RealInfo;

const Container = styled.View`
  height: ${props => props.windowHeight};
`;

const BattleIconContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const InfoContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  left: 10px;
  flex-direction: column;
`;

const HashtagsContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const ContentMoreSpan = styled.TouchableOpacity`
  font-size: 12px;
  letter-spacing: 0.4px;
  opacity: 0.6;
  padding-left: 10px;
  font-family: Metropolis-Medium;
  padding-top: 3px;
`;

const AliasText = styled.Text`
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  font-family: Metropolis-Medium;
`;

const PostTitleText = styled.Text`
  font-size: 12px;
  letter-spacing: 0.4px;
  color: rgb(255, 255, 255);
  padding-right: 5px;
  line-height: 18px;
  font-family: Metropolis-Regular;
`;

const HashTagText = styled.Text`
    color: rgb(255, 255, 255);
    font-family: Metropolis-Medium;
`;

const SkillView = styled.View`
  flex-direction: row;
  padding-top: 10px;
  align-items: center;
`;

const SkillText = styled.Text`
  font-size: 12px;
  letter-spacing: 0.4px;
  color: rgb(255, 255, 255);
  line-height: 18px;
  padding-left: 10px;
  font-family: Metropolis-Medium;
`;