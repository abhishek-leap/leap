import React from 'react';
import styled from '@emotion/native';

const ProgressBar= ({data}) => {
  const progress = (data?.currentTime * 100) / data?.seekableDuration || 0;
  return (
    <Container>
      <ProgressLine progress={progress} />
      <ProgressDot progress={progress} />
    </Container>
  );
};

export default ProgressBar;

const Container = styled.View`
  height: 3px;
  width: 100%;
  background-color: rgba(255, 0, 172, 0.5);
  bottom: -6.5px;
`;

const ProgressLine = styled.View`
  height: 100%;
  width: ${props => (props.progress ? `${props.progress}%` : `0%`)};
  background-color: rgb(255, 0, 172);
  border-radius: 40px;
  text-align: right;
  bottom: 1.5px;
`;

const ProgressDot = styled.View`
  height: 8px;
  width: 8px;
  background-color: rgb(255, 0, 172);
  border-radius: 30px;
  position: absolute;
  left: ${props => (props.progress ? `${props.progress - 1}%` : 0)};
  bottom: -1.0px;
`;
