import React, {useState} from 'react';
import styled from '@emotion/native';

import {DARE_STATE} from '../constants';
import VideoPlayMode from '../components/dare/video.play';
import DareFooter from '../components/dare/dare.footer';
import {useTheme} from '@react-navigation/native';
import {View} from 'react-native';
import {handlePush} from '../navigation/navigationService';

const DareVideo = ({route}) => {
  const {dare, allDares, source, stage} = route.params;
  const dareState = stage || DARE_STATE.PREVIEW;
  const {colors} = useTheme();
  const [firstVideoProgress, setFirstVideoProgress] = useState(0);
  const [secondVideoProgress, setSecondVideoProgress] = useState(0);
  const [rotateAngle, setRotateAngle] = useState(0);

  const onFinishPlaying = async () => {
    const state = DARE_STATE.RESULT;
    handlePush({
      name: 'DareResult',
      params: {
        dare,
        allDares,
        dareState,
        source,
        stage: state,
        firstVideoProgress: firstVideoProgress,
        secondVideoProgress: secondVideoProgress,
      },
    });
  };

  return (
    <Container>
      {/* <View
        style={{
          alignItems: 'center',
          opacity: 0.7,
          height: Platform.OS === 'ios' ? '10%' : '15%',
        }}> */}
      {/* <View style={{
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


              }}></View> */}
      {/* </View> */}

      <View
        style={{
          height: '93%',
        }}>
        <VideoPlayMode
          firstVideoUrl={dare?.assets?.[0]?.reference}
          firstCover={dare?.assets?.[0]?.dareCover}
          secondVideoUrl={dare?.assets?.[1]?.reference}
          secondCover={dare?.assets?.[1]?.dareCover}
          onEnd={onFinishPlaying}
          firstVideoProgress={progress => {
            setFirstVideoProgress(progress);
          }}
          secondVideoProgress={progress => {
            setSecondVideoProgress(progress);
          }}
          rotateAngleX={rotate => setRotateAngle(rotate)}
          dareState={dareState}
          dareId={dare.id}
          source={source}
        />
      </View>
      <View
        style={{
          height: '7%',
        }}>
        <DareFooter
          firstVideoProgress={firstVideoProgress}
          secondVideoProgress={secondVideoProgress}
          bgColor={colors.PLAYLEAP_PROGRESS_BG_COLOR}
          progressColor={colors.PLAYLEAP_PROGRESS_COLOR}
        />
      </View>
    </Container>
  );
};

export default DareVideo;

const Container = styled.View`
  display: flex;
  height: 100%;
  background-color: #290c54;
`;
