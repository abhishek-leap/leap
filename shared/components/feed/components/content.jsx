// @flow
import React from "react";
import styled from "@emotion/native";
import {Text} from 'react-native';
import { handlePush } from "../../../navigation/navigationService";

const Content = ({ text, isHashTag, fontSize, id, closeModal }) => {
  const url = isHashTag ? `/hashtag/${text}` : `/skill/${id}`;
  const onClick = () => {
    if (closeModal) closeModal();
  };
  return (
    // <Wrapper fontSize={fontSize}>
      <AnchorTag onPress={() => handlePush({name: 'SkillAndHashtag', params: {screen: 'hashtag'}})}>
      {/* <Link to={url} rel="noopener noreferrer" onClick={onClick}>
        {isHashTag && "#"}
        {text}
      </Link> */}
        <HastTag>{isHashTag && "#"}{text}</HastTag>
      </AnchorTag>
    // </Wrapper>
  );
};

export default Content;

// const Wrapper = styled.View`
//   padding-right: 5px;
//   a {
//     color: white;
//     ${props => props?.fontSize && `font-size:${props?.fontSize}px`};
//     letter-spacing: 0.4px;
//     font-family: "Metropolis-Regular";
//   }
// `;

const AnchorTag = styled.TouchableOpacity`
    color: rgb(255, 255, 255);
    font-size: 14px;
    font-weight: 500;
`;

const HastTag = styled.Text`
  font-size: 11px;
  letter-spacing: 0.4px;
  color: rgb(255, 255, 255);
  padding-right: 5px;
  line-height: 18px;
  font-family: Metropolis-Medium;
`;