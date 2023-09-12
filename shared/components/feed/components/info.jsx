import {memo, useState} from 'react';
import styled from '@emotion/native';

import Skill from './skill';
import {parsePostBody} from '../../../utils';
import Content from './content';
import {handlePush} from '../../../navigation/navigationService';
import useLocalization from '../../../hooks/useLocalization';

const {DEFAULT_HASH_TAGS_COUNTOSHOW} = require('../../../constants');
const areEqual = (prevProps, nextProps) => {
  const {item: prevItem} = prevProps;
  const {item: nextItem} = nextProps;
  return prevItem && nextItem && prevItem.id === nextItem.id;
};
const Info = ({item, windowHeight, closeModal}) => {
  const {author, hashTags, body, skills} = item;
  const [showMoreHashtagsBtn, setShowMoreHashtagsBtn] = useState(
    hashTags > DEFAULT_HASH_TAGS_COUNTOSHOW,
  );
  const [postTitle] = parsePostBody(body);
  const {translate} = useLocalization();

  return (
    <Container windowHeight={windowHeight}>
      <InfoContainer>
        {author.alias !== '' && (
          <AliasBtn
            onPress={() =>
              handlePush({name: 'Profile', params: {auth: false}})
            }>
            <AliasText>
              {author.alias && author.alias !== author?.entityId
                ? author.alias
                : author?.name}
            </AliasText>
          </AliasBtn>
        )}
        {postTitle && <PostTitleText>{postTitle}</PostTitleText>}
        {hashTags ? (
          <HashtagsContainer>
            {hashTags?.map((item, idx) => {
              return !showMoreHashtagsBtn && idx < 2 ? (
                <Content
                  key={`${idx}-${item}`}
                  text={item}
                  isHashTag={true}
                  fontSize={11}
                  closeModal={closeModal}
                />
              ) : showMoreHashtagsBtn ? (
                <Content
                  key={`${idx}-${item}`}
                  text={item}
                  isHashTag={true}
                  fontSize={11}
                  closeModal={closeModal}
                />
              ) : null;
            })}
            {hashTags.length > DEFAULT_HASH_TAGS_COUNTOSHOW && (
              <ContentMoreSpan
                onPress={() => setShowMoreHashtagsBtn(prev => !prev)}>
                {!showMoreHashtagsBtn ? (
                  <HashTagText>
                    {translate('more')}
                    {'...'}
                  </HashTagText>
                ) : (
                  <HashTagText>
                    {'...'}
                    {translate('less')}
                  </HashTagText>
                )}
              </ContentMoreSpan>
            )}
          </HashtagsContainer>
        ) : (
          <></>
        )}
        {skills.length > 0 ? (
          <SkillView>
            <Skill width={24} height={24} />
            <SkillBtn
              onPress={() =>
                handlePush({name: 'SkillAndHashtag', params: {screen: 'skill'}})
              }>
              <SkillText>{translate(skills[0]?.alias)}</SkillText>
            </SkillBtn>
          </SkillView>
        ) : (
          <></>
        )}
      </InfoContainer>
    </Container>
  );
};

export default memo(Info, areEqual);

const Container = styled.View`
  height: ${props => props.windowHeight};
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

const AliasBtn = styled.TouchableOpacity``;

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

const SkillBtn = styled.TouchableOpacity``;
