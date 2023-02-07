import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import withAuthentication from '../hoc/withAuthentication';
import {useDispatch} from 'react-redux';
import {FullAuthentication, openAuthenticationBottomDrawer} from '../redux-ui-state/slices/authenticationSlice';

const CreateDare = ({isBasicSignupCompleted, isExtendedSignupCompleted}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isBasicSignupCompleted != "true" || isExtendedSignupCompleted != "true") {
      dispatch(FullAuthentication(1));
      dispatch(openAuthenticationBottomDrawer());
    } 
  }, [isBasicSignupCompleted, isExtendedSignupCompleted]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Create Dare</Text>
    </View>
  );
};

export default withAuthentication(CreateDare);