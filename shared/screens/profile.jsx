import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {openAuthenticationBottomDrawer} from '../redux-ui-state/slices/authenticationSlice';
import withAuthentication from '../hoc/withAuthentication';

const Profile = ({isAuthenticated}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openAuthenticationBottomDrawer());
    }
  }, [isAuthenticated]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile</Text>
    </View>
  );
};

export default withAuthentication(Profile);
