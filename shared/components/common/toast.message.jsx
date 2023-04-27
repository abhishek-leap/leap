import React from 'react';
import styled from '@emotion/native';

const ToastMessage = ({ message }) => {
  return (
    <MessageView>
      <MessageNotch/>
      <Message>{message}</Message>
    </MessageView>
  );
};
export default ToastMessage;

const MessageView = styled.View`
    background-color: white;
    align-content: center;
    padding: 8.7px;
    flex: 1;
    justify-content: center;
    margin-top: 25px;
    border-radius: 10px;
    position: relative;
`;

const MessageNotch = styled.View`
    width: 10px;
    height: 10px;
    background: white;
    position: absolute;
    top:-5px;
    transform: rotate(45deg);
    left: 50%;
`;

const Message = styled.Text`
    font-weight: 500;
    font-style: normal;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.5px;
    color: gray;
`;