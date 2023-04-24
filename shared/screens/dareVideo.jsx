import React, { useState } from 'react';
import styled from '@emotion/native';

import { DARE_STATE } from '../constants';
import VideoPlayMode from '../components/dare/video.play';
import DareFooter from '../components/dare/dare.footer';
import { useTheme } from '@react-navigation/native';
import OneTapToaster from '../components/dare/oneTap.toaster';
import { View } from 'react-native';

const DareVideo = ({stage, route}) => {
  const { dare, source } = route.params;
  const dareState = stage || DARE_STATE.PREVIEW;
  const {colors} = useTheme();
  const [firstVideoProgress, setFirstVideoProgress] = useState(0);
  const [secondVideoProgress, setSecondVideoProgress] = useState(0);
  const [rotateAngle, setRotateAngle] = useState(0);

  const onFinishPlaying = async () => {
  };

  return (
    <Container>
          <DareFooter
            firstLoaderProgress={firstVideoProgress}
            secondLoaderProgress={secondVideoProgress}
            bgColor={colors.PLAYLEAP_PROGRESS_BG_COLOR}
            progressColor={colors.PLAYLEAP_PROGRESS_COLOR}
          />
          <OneTapToaster toasterMessage={'One Tap to Skip'}/>
          <View style={{alignItems: 'center',opacity: 0.7, height: '10%'}}>
              <View style={{
                height: 0,
                borderBottomWidth: 100,
                width: '80%',
                borderRadius: 5,  
                bottom: 50,
                opacity: 0.3,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{rotateX: "50deg"}, {rotateZ: rotateAngle+"deg"}, {scaleY: 2.8}], // rotateX: "70deg"
                shadowOffset: { width: 10, height: 10 },
                shadowColor: 'black',
                shadowOpacity: 1,
                shadowRadius: 10,
                elevation: 3,
                // background color must be set
                backgroundColor : "#0000", // invisible color


              }}></View>
          </View>
           
           <VideoPlayMode
            firstVideoUrl={dare?.assets?.[0]?.reference}
            firstCover={dare?.assets?.[0]?.dareCover}
            secondVideoUrl={dare?.assets?.[1]?.reference}
            secondCover={dare?.assets?.[1]?.dareCover}
            onEnd={onFinishPlaying}
            firstVideoProgress={(progress) => setFirstVideoProgress(progress)}
            secondVideoProgress={(progress) => setSecondVideoProgress(progress)}
            rotateAngleX={(rotate) => setRotateAngle(rotate)}
            dareState={dareState}
            dareId={dare.id}
            source={source}
          />
    </Container>
  );
};

export default DareVideo;

const Container = styled.View`
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  background-color: #290c54;
`;  