import React, { useState } from 'react';
import styled from '@emotion/native';
import { useTheme } from '@react-navigation/native';

import { DARE_STATE } from '../constants';
import Loader from '../components/common/loader';
import DareFooter from '../components/dare/dare.footer';
import DareItem from "../components/dare/dare.item";


const DarePreview = ({stage, route}) => {
  const { dare, source, allDares } = route.params;
  const dareState = stage || DARE_STATE.PREVIEW;
  const {colors} = useTheme();
  const [firstVideoProgress, setFirstVideoProgress] = useState(0);
  const [secondVideoProgress, setSecondVideoProgress] = useState(0);

  return (
    <Container>
      {dare ? (
        <Wrapper>
          <DareItem
            dare={dare}
            allDares={allDares}
            setFirstVideoProgress={setFirstVideoProgress}
            setSecondVideoProgress={setSecondVideoProgress}
            dareState={dareState}
            source={source}
          />
          <DareFooter
            firstLoaderProgress={firstVideoProgress}
            secondLoaderProgress={secondVideoProgress}
            bgColor={colors.PLAYLEAP_PROGRESS_BG_COLOR}
            progressColor={colors.PLAYLEAP_PROGRESS_COLOR}
          />
        </Wrapper>
      ) : (
        <LoaderView>
          <Loader />
        </LoaderView>
      )}
    </Container>
  );
};

export default DarePreview;


const Container = styled.View`
  height: 100%;
  background-color: #290c54;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const LoaderView = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
`;
