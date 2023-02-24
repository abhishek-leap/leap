import React from 'react';
import { Dimensions, Platform, View, Text } from 'react-native';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import DareBar from '../components/dare/darebar';
import ReelsList from '../components/feed/components/reels-list'

const windowHeight = Dimensions.get('window').height;
const videoHeight = parseInt(windowHeight * 0.819)
export default () => {
  const {colors} = useTheme();

  return (
    <Container colors={colors}>
      {/* <View style={{height: '15%'}}>
        <DareBar height={Platform.OS == 'ios' ? 105 : 100} />
      </View> */}
      <View
        style={{
          height: videoHeight,
          backgroundColor: colors.primary,
        }}>
      <ReelsList
        videoHeight={videoHeight}
      />
      </View>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.colors.primary};
`;