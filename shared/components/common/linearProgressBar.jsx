import React, {useState} from 'react';
import styled from '@emotion/native';

const LinearProgress = ({
  data,
  backgroundColor,
  completedColor,
  percentage,
  bgHeight,
}) => {
  const progress = percentage
    ? data
    : (data?.currentTime * 100) / data?.seekableDuration || 0;
  return (
    <Container backgroundColor={backgroundColor}>
      <TopView>
        <ProgressBarHeight
          backgroundColor={backgroundColor}
          bgHeight={bgHeight}
        />
        <ProgressBarFillingColorView
          percentage={progress}
          completedColor={completedColor}
        />
      </TopView>
    </Container>
  );
};

export default LinearProgress;

const Container = styled.View`
  width: 100%;
  height: 2px;
  bottom:4px;
`;

const TopView = styled.View`
  justify-content: center;
`;

const ProgressBarHeight = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border-color: ${props =>
    props.backgroundColor ? props.backgroundColor : '#4f0e6c'};
  border-width: ${props => (props.bgHeight ? props.bgHeight : '0px')};
`;

const ProgressBarFillingColorView = styled.View`
  width: ${props => (props.percentage ? `${props.percentage}%` : `0%`)};
  margin-vertical: 4px;
  border-radius: 5px;
  background-color: ${props =>
    props.completedColor ? props.completedColor : '#f400b0'};
  position: absolute;

  height: 100%;
`;
