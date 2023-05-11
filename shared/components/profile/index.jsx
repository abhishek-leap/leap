import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {FullAuthentication, openAuthenticationBottomDrawer} from '../../redux-ui-state/slices/authenticationSlice';
import withAuthentication from '../../hoc/withAuthentication';

import Profile from '../../screens/profile';

const ProfileTab = ({isToken}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isToken && isFocused) {
      dispatch(FullAuthentication(0));
      dispatch(openAuthenticationBottomDrawer());
    }
  }, [isToken, isFocused]);
  return (
    <Profile />
  );
};

export default withAuthentication(ProfileTab);
