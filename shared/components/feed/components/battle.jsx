import React, {useEffect} from "react";
import BattleIcon from "../../../images/battle-back.svg";

import withAuthentication from '../../../hoc/withAuthentication';
import styled from '@emotion/native';

const Battle = ({ width, height, isBasicSignupCompleted, isExtendedSignupCompleted, onCallBackFunc }) => {

  return (
      <BattleIconContainer onPress={() => onCallBackFunc(isBasicSignupCompleted, isExtendedSignupCompleted)} >
        <BattleIcon width={width} height={height} />
      </BattleIconContainer>
  );
};

export default withAuthentication(Battle);

const BattleIconContainer = styled.TouchableOpacity`

`;