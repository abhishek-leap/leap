import React from "react";
import styled from '@emotion/native';

import LinearProgress from "../common/linearProgressBar";
import Shield from './shield';

const DareFooter = ({ firstLoaderProgress, secondLoaderProgress, bgColor, progressColor }) => (
  <DareFooterWrapper>
    <ProgressBar>
      <LinearProgress 
              data={firstLoaderProgress} 
              backgroundColor={bgColor}
              completedColor={progressColor}
              percentage={true}
              bgHeight={'2px'}
              />
    </ProgressBar>
    <Shield height={42} width={70} />
    <ProgressBar>
    <LinearProgress 
            data={secondLoaderProgress}
            backgroundColor={bgColor}
            completedColor={progressColor}
            percentage={true}
            bgHeight={'2px'}
        />
    </ProgressBar>
  </DareFooterWrapper>
);

export default DareFooter;

const DareFooterWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #290c54;
  padding: 10px 20px;
`;

const ProgressBar = styled.View`
  width: 40%;
`;