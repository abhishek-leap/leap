import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {openAuthenticationBottomDrawer} from '../redux-ui-state/slices/authenticationSlice';

export default () => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(openAuthenticationBottomDrawer());
    }, []),
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Search</Text>
    </View>
  );
};
