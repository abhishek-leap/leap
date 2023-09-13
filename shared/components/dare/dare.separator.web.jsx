import React, {useState} from 'react';
import styled from '@emotion/native';
// import Draggable from 'react-native-draggable';

//Import SVG
import Like from '../../images/like.svg';

import {DARE_STATE, WINDOW_WIDTH} from '../../constants';
import PinkBorderLine from '../common/pinkBorderLine.web';
import FadeInView from '../common/fadeIn.animate';
import Blink from '../common/blink';
import useLocalization from '../../hooks/useLocalization';

const previewHeight = 190;
const previewBorderHeight = 3.5;
const draggableYPosition = -165;
export const previewRotateDegs = '6.5deg';

const DareSeparator = ({title, subTitle, dareState, onVote}) => {
  const [dragPosition, setDragPosition] = useState({
    x: WINDOW_WIDTH / 5,
    y: draggableYPosition,
  });
  const {translate} = useLocalization();

  return (
    <Wrapper dareState={dareState} previewRotateDegs={previewRotateDegs}>
      {dareState === DARE_STATE.PREVIEW ? (
        <FadeInView duration={600}>
          <PinkBorderLine height={previewBorderHeight} top={true} />
          <Content>
            <Title>{translate(title)}</Title>
            <SubTitle>{subTitle}</SubTitle>
          </Content>
          <PinkBorderLine height={previewBorderHeight} top={false} />
        </FadeInView>
      ) : null}
      {dareState === DARE_STATE.VOTE ? (
        <IconsWrapper>
          <ArrowImage
            source={require('../../images/ArrowsUp.gif')}
            alt="arrows-up"
          />
          <VoteIconWrapper>
            {/* <Draggable 
              x={dragPosition.x}
              y={draggableYPosition} 
              maxX={dragPosition.x}
              minX={dragPosition.x}
              shouldReverse={true}
              bounds={{left: 0, top: 0, right: 0, bottom: 500}}
              enableDrag={true}
              onDragRelease={(e, data) => {
                 if (data.dy > 80) {
                  onVote("down");
                } else if(Math.abs(data.dy) > 80) {
                  onVote("up");
                }
              }}
             >
              <Blink duration={1000}>
                <Like 
                  width={180 - Math.abs(dragPosition.y) / 2} 
                  height={150} 
                  // strokeWidth={2} 
                  stroke="white" 
                />
              </Blink>
            </Draggable> */}
          </VoteIconWrapper>
          <ArrowImage
            source={require('../../images/ArrowsDown.gif')}
            alt="arrows-up"
          />
        </IconsWrapper>
      ) : null}
      <PinkBorderLine
        height={previewBorderHeight}
        top={dareState === DARE_STATE.VOTE && 'true'}
      />
    </Wrapper>
  );
};

export default DareSeparator;

const Wrapper = styled.View`
  ${props =>
    props.dareState === DARE_STATE.PREVIEW
      ? `
    height: ${previewHeight}px;
    top: -${previewHeight / 2}px;
    background-color: #290c54;
    `
      : ``};
  position: absolute;
  right: 0;
  left: -10px;
  bottom: ${props =>
    props.dareState === DARE_STATE.PREVIEW
      ? ''
      : props.dareState === DARE_STATE.VOTE
      ? '-30px'
      : '155px'};
  transform: ${props =>
    props.dareState === DARE_STATE.PREVIEW
      ? `skewY(-${previewRotateDegs});
      `
      : ''};
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
  font-family: Metropolis-BoldItalic;
  text-align: center;
`;

const SubTitle = styled.Text`
  color: #ffffff60;
  font-size: 18px;
  margin-top: 5px;
  text-align: center;
  font-family: Metropolis-Regular;
`;

const IconsWrapper = styled.View`
  flex: 1;
  transform: skewY(${previewRotateDegs});
  text-align: center;
  height: 320px;
  width: 130px;
  top: 50%;
  right: 50%;
  position: absolute;
  z-index: 1101;
  flex-direction: column;
`;

const VoteIconWrapper = styled.View`
  paddingvertical: 100px;
`;

const ArrowImage = styled.Image`
  width: 40px;
  height: 80px;
  align-self: center;
  justify-content: center;
  bottom: 63%;
  left: 55%;
`;
