import React from "react";
import styled from '@emotion/native';
import { StyleSheet } from "react-native";

import { DARE_STATE } from '../../constants';
import PinkBorderLine from "../common/pinkBorderLine";
import FadeInView from "../common/fadeIn.animate";

const previewHeight = 190;
const previewBorderHeight = 3.5;
export const previewRotateDegs = "6.5deg";


const DareSeparator = ({ title, subTitle, dareState }) => {
  return (
    <Wrapper dareState={dareState}>
      <FadeInView duration={600}>
      {dareState === DARE_STATE.PREVIEW ? (
        <>
          <PinkBorderLine height={previewBorderHeight} top={true}/>
          <Content>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
          </Content>
        </>
      ) : null}
      <PinkBorderLine height={previewBorderHeight} top={false}/>
      </FadeInView>
    </Wrapper>
  );
};

export default DareSeparator;

const styles = StyleSheet.create({
  linearGradient: {
    width: '200%',
    height: previewBorderHeight,
    position: 'absolute',
    border: 0,
    margin: 0,
    top: 188,
    bottom: 0
  }
});

const Wrapper = styled.View`
  ${(props) =>
    props.dareState === DARE_STATE.PREVIEW
      ? `
    height: ${previewHeight}px;
    top: -${previewHeight / 2}px;
    background-color: #290c54;
    `
      : ``};
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  transform: skewY(-${previewRotateDegs});
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.View`
  max-width: 50%;
  margin: auto;
  transform: skewY(${previewRotateDegs});
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 23px;
  font-style: italic;
  font-weight: 700;
`;

const SubTitle = styled.Text`
  color: #ffffff60;
  font-size: 16px;
  margin-top: 5px;
  font-weight: 400;
  text-align: center;
`;