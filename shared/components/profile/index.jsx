import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {FullAuthentication, openAuthenticationBottomDrawer} from '../../redux-ui-state/slices/authenticationSlice';
import withAuthentication from '../../hoc/withAuthentication';

import Profile from '../../screens/profile';

const ProfileTab = ({isToken}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isToken) {
      dispatch(FullAuthentication(0));
      dispatch(openAuthenticationBottomDrawer());
    }
  }, [isToken]);
  return (
    <Profile />
  );
};

export default withAuthentication(ProfileTab);
