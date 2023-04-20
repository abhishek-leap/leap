import React, { useState } from 'react';
import styled from '@emotion/native';

import { DARE_STATE } from '../constants';
import VideoPlayMode from '../components/dare/video.play';
import DareFooter from '../components/dare/dare.footer';
import { useTheme } from '@react-navigation/native';
import OneTapToaster from '../components/dare/oneTap.toaster';

const DareVideo = ({stage, route}) => {
  const { dare, source } = route.params;
  const dareState = stage || DARE_STATE.PREVIEW;
  const {colors} = useTheme();
  const [firstVideoProgress, setFirstVideoProgress] = useState(0);
  const [secondVideoProgress, setSecondVideoProgress] = useState(0);

  const onFinishPlaying = async () => {
  };

  return (
    <Container>
        <VideoPlayMode
          firstVideoUrl={dare?.assets?.[0]?.reference}
          firstCover={dare?.assets?.[0]?.dareCover}
          secondVideoUrl={dare?.assets?.[1]?.reference}
          secondCover={dare?.assets?.[1]?.dareCover}
          onEnd={onFinishPlaying}
          firstVideoProgress={(progress) => setFirstVideoProgress(progress)}
          secondVideoProgress={(progress) => setSecondVideoProgress(progress)}
          dareState={dareState}
          dareId={dare.id}
          source={source}
        />
        <OneTapToaster toasterMessage={'One Tap to Skip'}/>
         <DareFooter
          firstLoaderProgress={firstVideoProgress}
          secondLoaderProgress={secondVideoProgress}
          bgColor={colors.PLAYLEAP_PROGRESS_BG_COLOR}
          progressColor={colors.PLAYLEAP_PROGRESS_COLOR}
        />
    </Container>
  );
};

export default DareVideo;

const Container = styled.View`
  height: 100%;
  background-color: #290c54;
`;