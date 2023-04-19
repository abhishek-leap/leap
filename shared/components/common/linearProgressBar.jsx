import React, { useState } from 'react';
import styled from '@emotion/native';

const LinearProgress = ({data, backgroundColor, completedColor, percentage, bgHeight }) => {
    const [getBackgroundColor, setBackgroundColor] = useState(backgroundColor);
    const [getCompletedColor, setCompletedColor] = useState(completedColor);

    const progress = percentage ? data : ((data?.currentTime * 100) / data?.seekableDuration || 0);

    return(
        <Container getBackgroundColor={getBackgroundColor} >
        <TopView>
            <ProgressBarHeight 
                getBackgroundColor={getBackgroundColor} 
                bgHeight={bgHeight}
            />
            <ProgressBarFillingColorView 
                getPercentage={progress}
                getCompletedColor={getCompletedColor} 
            />
        </TopView>
        </Container>
    );
}

export default LinearProgress;

const Container = styled.View`
    width: 100%;
    height: 3px;
    // background-color: ${props => props.getBackgroundColor ? props.getBackgroundColor : '#4f0e6c'};
`;

const TopView = styled.View`
    justify-content: center;    
`;

const ProgressBarHeight = styled.View`
    width: 100%;
    bottom: 4.5px;
    height: 20%;
    border-radius: 5px;
    border-color: ${props => props.getBackgroundColor ? props.getBackgroundColor : '#4f0e6c'};
    border-width: ${props => props.bgHeight ? props.bgHeight : '2.5px'};
`;

const ProgressBarFillingColorView = styled.View`
    width: ${props => (props.getPercentage ? `${props.getPercentage}%` : `0%`)};
    margin-vertical: 5px;
    border-radius: 5px;
    background-color: ${props => props.getCompletedColor ? props.getCompletedColor : '#f400b0'};
    position: absolute;
    bottom: 0px;
    height: 50%;
`;