import React, {useEffect} from 'react';
import {
  Dimensions, Platform,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import styled from '@emotion/native';

import { setGlobalNavigation } from '../utils/helper';
import DareBar from '../components/dare/darebar';
import ReelsList from '../components/feed/components/reels-list';
import { useSelector } from 'react-redux';
import Toaster from '../components/common/toaster';

const windowHeight = Dimensions.get('window').height;
const videoHeight = Platform.OS == 'ios' ?  parseInt(windowHeight * 0.817) :  parseInt(windowHeight * 0.847);

export default ({navigation}) => {
  const {colors} = useTheme();
  const { toasterDisplay, toasterMessage } = useSelector(state => state.feeds);

  useEffect(() =>{ 
    setGlobalNavigation(navigation);
    
  }, [])

  return (
    <Container colors={colors}>
      <DareView colors={colors}>
        <DareBar />
      </DareView>
      <ReelView colors={colors} videoHeight={videoHeight}>
        <ReelsList
          videoHeight={videoHeight}
        />
      </ReelView>
      {/* {toasterDisplay == true ? 
        <Toaster successMessage={toasterMessage}/>
        :
        <></>
      } */}
  </Container>
  )
};

const Container = styled.View`
  flex: 1;
  height: 100%;
  background-color: ${props => props.colors.primary};
`;

const DareView = styled.View`
  height: 15%;
`;

const ReelView = styled.View`
  width: 100%;
  height: 85%;
  // height: ${props => props.videoHeight};
  background-color: ${props => props.colors.primary};
`;