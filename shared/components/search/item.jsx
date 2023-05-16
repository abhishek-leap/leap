import React from 'react';
import styled from '@emotion/native';

import HashTagIcon from '../../images/hashtag.svg';
import SkillIcon from '../../images/Skill.svg';
import {handlePush} from '../../navigation/navigationService';
import Profile from '../feed/components/profile';

const Item = ({url, text, type, user, fontStyle, disabled}) => {
  return (
    <Container
      onPress={() =>
        handlePush({name: 'SkillAndHashtag', params: {screen: type}})
      }
      type={type}>
      <InnerView>
        {type === 'hashtag' ? (
          <HashTagIcon width={45} height={45} />
        ) : type === 'skill' ? (
          <SkillIcon width={35} height={35} />
        ) : (
          <Profile author={{entityId: user.userId}} shieldHeight={'45%'} />
        )}
      </InnerView>
      <ItemTextView type={type}>
        <Text fontStyle={fontStyle}>{`${
          type === 'hashtag' ? '#' : ''
        }${text}`}</Text>
      </ItemTextView>
    </Container>
  );
};

export default Item;

const Container = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  flex-direction: row;
  // gap: ${({type}) => (type == 'skill' ? 2 : type == 'hashtag' ? 15 : 0)};
`;

const InnerView = styled.View`
  width: 80px;
`;
const Text = styled.Text`
  width: 70%;
  // display: block;
  color: white;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-style: ${({fontStyle}) => (fontStyle ? 'italic' : '')};
`;

const ItemTextView = styled.View`
  width: 120%;
  padding-bottom: ${({type}) => (type === 'talent' ? '25' : '10')}px;
`;
