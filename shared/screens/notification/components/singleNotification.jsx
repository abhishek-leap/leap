import React, { useState } from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import Profile from '../../feed/components/profile';

const SingleNotification = ({
    author,
    alias,
    role,
    message,
    dateTime,
    item,
    feedItem,
    onPressProfile,
    handleSendButton,
    fromReplyListing
}) => {
    const {colors} = useTheme();

    const handleReply = () => {
        if(commentText !== '') {
            setCommentText('')
            setShowCommentBox(false);
            handleSendButton(item?.id , commentText);
        }
    }

    return (
        <>
            <PickItem>
                <StyledSection onPress={onPressProfile}>
                    <Profile author={author}/>
                </StyledSection>
                <Item>
                    <NameAndType>
                        <ListItemPressable onPress={onPressProfile}>
                            <ListItem color={item?.color || 'rgb(255, 255, 255)'}>{alias}</ListItem>
                        </ListItemPressable>
                        <ListItem color={item?.color || 'rgba(255, 255, 255, 0.6)'} fontSize={12}>{role}</ListItem>
                    </NameAndType>
                    <Message>
                        <ListItem color={item?.color || 'rgba(255, 255, 255, 0.8)'} fontSize={12}>{message}</ListItem>
                    </Message>
                    <ReplyAndDate>
                        <Reply onPress={() => setShowCommentBox(state => !state)}>
                            <ReplyText fontSize={10} colors={colors}>{'reply'}</ReplyText>
                        </Reply>
                        <ListItem color={item?.color || 'rgba(255, 255, 255, 0.6)'} fontSize={12}>{dateTime}</ListItem>
                    </ReplyAndDate>
                </Item>
            </PickItem>
        </> 
    );
}

export default SingleNotification;


const ListItem = styled.Text`
    color: ${props => props.color};
    font-size: ${props => props.fontSize ? props.fontSize + 'px' : '14px'};
    padding: 0px 0 5px 15px;
    letter-spacing: 0.4px;
`;
const ListItemPressable = styled.TouchableOpacity``;
const PickItem = styled.View`
    flex-direction: row;
    padding-top: 3%;
    padding-left: 3%;
    margin-left: ${props => props.sectionList ? '10%' : '0'};
`;
const Item = styled.View`
    flex-direction: column;
    padding-top: 10px;
`;
const NameAndType = styled.View`
    flex-direction: row;
`;
const Message = styled.View`
    width: 97%;
`;
const ReplyAndDate = styled.View`
    flex-direction: row;
    padding-left: 6%;
`;
const StyledSection = styled.TouchableOpacity`
  margin-bottom: 6px;
  margin-top: 6px;
`;
const Reply = styled.TouchableOpacity`
`;
const ReplyText = styled.Text`
    color: 'rgb(124, 147, 167)';
    font-size: ${props => props.fontSize ? props.fontSize + 'px' : '14px'};
`;