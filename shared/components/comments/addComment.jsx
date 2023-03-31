import React from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {  useSelector } from 'react-redux';

import TxtInput from '../common/textInput';
import { AppButton } from '../common/appButton';
import { PLACEHOLDER_COMMENT, WINDOW_WIDTH } from '../../constants';
import Send from '../../images/send.svg';
import Profile from '../feed/components/profile';

const AddCommentBox = ({
    onPressProfile,
    setCommentText,
    commentText,
    width,
    height,
    item,
    marginLeft,
    handleSendButton,
    onFocus
}) => {
    const {colors} = useTheme();
    const {feedItem} = useSelector(state => state.feeds);
    return (
        <BottomView colors={colors} marginLeft={marginLeft}>
            <StyledSection onPress={onPressProfile}>
                <Profile author={feedItem?.author}/>
            </StyledSection>
            <TextInputView width={width}>
                <TxtInput 
                    value={commentText}
                    width={WINDOW_WIDTH / 1.40 +'px'}
                    onChangeText={(text) => setCommentText(text)}
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
}

export default AddCommentBox;


const BottomView = styled.View`
  flex-direction: row;
  margin-left: ${props => props.marginLeft || '0%'};
  justify-content: space-between;
  padding-vertical: 3%;
  padding-horizontal: 2%;
  background-color: ${props => props.colors.PLAYLEAP_BLUE};
`;
const StyledSection = styled.TouchableOpacity`
//   margin-bottom: 0px;
//   margin-top: 6px;
`;
const TextInputView = styled.View`
  padding-top: 2%;
  width: ${props => props.width};
`;
const SendButton = styled.View`
  padding-top: 2%;
`;