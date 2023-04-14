import React, {useEffect} from "react";
import styled from '@emotion/native';

import BattleIcon from "../../../images/battle-back.svg";
import withAuthentication from '../../../hoc/withAuthentication';

const Battle = ({ width, height, isBasicSignupCompleted, isExtendedSignupCompleted, onCallBackFunc }) => {

  return (
      <BattleIconContainer onPress={() => onCallBackFunc(isBasicSignupCompleted, isExtendedSignupCompleted)} >
        <BattleIcon width={width} height={height} />
      </BattleIconContainer>
  );
};

export default withAuthentication(Battle);

const BattleIconContainer = styled.TouchableOpacity`
  shadow-color: #000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: 3
`;