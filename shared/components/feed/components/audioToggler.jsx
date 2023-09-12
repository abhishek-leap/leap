import React, {memo} from 'react';
import styled from '@emotion/native';
import UnmuteMuteIcon from '../../../images/unmuteMute.svg';
import {
  setAudioOff,
  setAudioOn,
} from '../../../redux-ui-state/slices/feedsSlice';
import {useDispatch, useSelector} from 'react-redux';

const AudioToggler = () => {
  const {audioOn} = useSelector(state => state.feeds);

  const dispatch = useDispatch();
  const clickHandler = () => {
    if (audioOn) {
      dispatch(setAudioOff());
    } else {
      dispatch(setAudioOn());
    }
  };

  return (
    <AudioIconContainer onPress={clickHandler}>
      <UnmuteMuteIcon
        height={35}
        width={35}
        color={audioOn ? 'transparent' : 'white'}
        fill={audioOn ? 'white' : 'transparent'}
      />
    </AudioIconContainer>
  );
};

export default memo(AudioToggler);

const AudioIconContainer = styled.TouchableOpacity`
  padding: 5px;
  margin-top: 6px;
`;
