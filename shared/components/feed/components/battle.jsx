import React, {memo} from 'react';
import styled from '@emotion/native';

import BattleIcon from '../../../images/battle-back.svg';
import withAuthentication from '../../../hoc/withAuthentication';
import {useDispatch} from 'react-redux';
import {
  FullAuthentication,
  openAuthenticationBottomDrawer,
} from '../../../redux-ui-state/slices/authenticationSlice';
import {
  openDareBackBottomDrawer,
  selectedPost,
} from '../../../redux-ui-state/slices/dareBackSlice';

const areEqual = (prevProps, nextProps) => {
  const {
    item: prevItem,
    isBasicSignupCompleted: prevIsBasicSignupCompleted,
    isExtendedSignupCompleted: prevIsExtendedSignupCompleted,
  } = prevProps;
  const {
    item: nextItem,
    isBasicSignupCompleted: nextIsBasicSignupCompleted,
    isExtendedSignupCompleted: nextIsExtendedSignupCompleted,
  } = nextProps;
  return (
    prevItem &&
    nextItem &&
    prevItem.id === nextItem.id &&
    prevIsBasicSignupCompleted === nextIsBasicSignupCompleted &&
    prevIsExtendedSignupCompleted === nextIsExtendedSignupCompleted
  );
};

const Battle = ({
  width,
  height,
  isBasicSignupCompleted,
  isExtendedSignupCompleted,
  item,
}) => {
  const dispatch = useDispatch();

  const dareBackUI = (isBasicSignupCompleted, isExtendedSignupCompleted) => {
    if (
      isBasicSignupCompleted != 'true' ||
      isExtendedSignupCompleted != 'true'
    ) {
      dispatch(FullAuthentication(1));
      dispatch(openAuthenticationBottomDrawer());
    } else if (
      isBasicSignupCompleted == 'true' ||
      isExtendedSignupCompleted == 'true'
    ) {
      dispatch(selectedPost(item));
      dispatch(openDareBackBottomDrawer());
    }
  };

  return (
    <BattleIconContainer
      onPress={() =>
        dareBackUI(isBasicSignupCompleted, isExtendedSignupCompleted)
      }>
      <BattleIcon width={width} height={height} />
    </BattleIconContainer>
  );
};

export default withAuthentication(memo(Battle, areEqual));

const BattleIconContainer = styled.TouchableOpacity`
  shadow-color: #000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: 3;
`;
