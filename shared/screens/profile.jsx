import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {FullAuthentication, openAuthenticationBottomDrawer} from '../redux-ui-state/slices/authenticationSlice';
import withAuthentication from '../hoc/withAuthentication';

const Profile = ({isToken}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isToken) {
      dispatch(FullAuthentication(0));
      dispatch(openAuthenticationBottomDrawer());
    }
  }, [isToken]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile</Text>
    </View>
  );
};

export default withAuthentication(Profile);
