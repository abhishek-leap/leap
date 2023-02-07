// @flow
import React from "react";
import styled from "@emotion/native";
import {Text} from 'react-native';

const Content = ({ text, isHashTag, fontSize, id, closeModal }) => {
  const url = isHashTag ? `/hashtag/${text}` : `/skill/${id}`;
  const onClick = () => {
    if (closeModal) closeModal();
  };
  return (
    <Wrapper fontSize={fontSize}>
      {/* <Link to={url} rel="noopener noreferrer" onClick={onClick}>
        {isHashTag && "#"}
        {text}
      </Link> */}
      <Text style={{color: 'white'}}>{isHashTag && "#"}{text}</Text>
    </Wrapper>
  );
};

export default Content;

const Wrapper = styled.View`
  padding-right: 5px;
  a {
    color: white;
    ${props => props?.fontSize && `font-size:${props?.fontSize}px`};
    letter-spacing: 0.4px;
    font-family: "Metropolis-Regular";
  }
`;
