import React, {useEffect, useState,useRef} from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {SafeAreaView,Text} from 'react-native';
import Logo from '../../images/logo.svg';
import {useInfiniteFeeds} from '../../hooks/useInfiniteFeeds';
import {useInfiniteDares} from '../../hooks/useInfiniteDares';
import LinearProgress from '../common/linearProgressBar';

const SplashDrawer = props => {
  const [show, setShow] = useState(true);
  const {colors} = useTheme();
  const {data: feedsData} = useInfiniteFeeds();
  const {data: daresData} = useInfiniteDares();
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef();

  useEffect(() => {
    if (feedsData && daresData) {
      setProgress(100);
      setTimeout(() => {
        setShow(false);
      }, 200);
    }
  }, [feedsData, daresData]);

  useEffect(() => {
    progressInterval.current = setInterval(() => {
      setProgress(prevProgress => prevProgress + 4);
    }, 40);
  }, []);


  useEffect(() => {
    if(progress>92 && progressInterval.current){
      clearInterval(progressInterval.current);
      progressInterval.current=null
    }
  }, [progress]);


  if (!show) return <></>;

  return (
    <StyledView bgColor={colors.primary}>
      <SafeAreaView>
        <Body>
          <Container>
            <Logo height={40} width={120} />
            <ProgressContainer>
              <LinearProgress
                data={progress}
                percentage={true}
                bgHeight={'4px'}
                bgColor={colors.PLAYLEAP_PROGRESS_BG_COLOR}
                progressColor={colors.PLAYLEAP_PROGRESS_COLOR}
              />
            </ProgressContainer>
            <StyledText>{progress}%</StyledText>
          </Container>
        </Body>
      </SafeAreaView>
    </StyledView>
  );
};

export default SplashDrawer;

const Body = styled.View`
  height: 100%;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ProgressContainer = styled.View`
  width: 30%;
  margin-top: 30px;
`;

const StyledView = styled.View`
  position: absolute;
  background-color: ${props => props.bgColor};
  width: 100%;
  height: 100%;
`;


const StyledText=styled.Text`
  color:white;
  fontSize:12px;
  margin-top:5px;
`