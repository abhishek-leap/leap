import React, {useState} from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';

import TxtInput from '../common/textInput';
import {AppButton} from '../common/appButton';
import {PLACEHOLDER_COMMENT} from '../../constants';
import Send from '../../images/send.svg';
import Profile from '../feed/components/profile';
import {getData} from '../../utils/helper';
import {useFeedActionHandlers} from '../../hooks/feeds';
import {comments, commentsReply} from '../../apis';

const AddCommentBox = ({
  onPressProfile,
  id,
  width,
  marginLeft,
  isReply = false,
}) => {
  const {colors} = useTheme();
  const [commentText, setCommentText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const {updateComments} = useFeedActionHandlers();

  const onFocus = () => {
    setIsFocused(true);
  };

  const handleSendButton = async () => {
    if (commentText !== '') {
      const dicData = {
        body: commentText.trim(),
        entityId: getData('user_id'),
        entityName: 'Customer',
        role: 'player',
      };
      setCommentText('');
      if (isReply) {
        const res = await commentsReply(id, dicData);
        if (res && !res?.error) {
          updateComments(res?.[0]);
        }
      } else {
        const res = await comments(id, dicData);
        updateComments(res);
      }
    }
  };

  return (
    <BottomView colors={colors} marginLeft={marginLeft} reply={isReply}>
      <StyledSection onPress={onPressProfile}>
        <Profile
          author={{entityId: getData('user_id')}}
          shieldHeight={50}
          width={45}
        />
      </StyledSection>
      <TextInputView width={width}>
        <TxtInput
          value={commentText}
          width={'100%'}
          onChangeText={text => setCommentText(text)}
          placeholder={PLACEHOLDER_COMMENT}
          placeholderTextColor={colors.PLAYLEAP_WHITE}
          bgcolor={'rgba(153,0,217,0.17)'}
          onFocus={onFocus}
        />
      </TextInputView>
      <SendButton>
        <AppButton
          width={'50%'}
          height={'100%'}
          onPress={handleSendButton}
          backgroundColor={colors.PLAYLEAP_LIGHT_GREY}
          imageEnable={true}
          imageURL={<Send />}
        />
      </SendButton>
    </BottomView>
  );
};

export default AddCommentBox;

const BottomView = styled.View`
  flex-direction: row;
  margin-left: ${props => props.marginLeft || '0%'};
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background-color: ${props => props.colors.PLAYLEAP_BLUE};
  padding: ${props =>
    props.reply ? `10px 15px 10px 5px` : `10px 15px 30px 5px`};
`;
const StyledSection = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
const TextInputView = styled.View`
  width: ${props => props.width || '70%'};
`;
const SendButton = styled.View``;
