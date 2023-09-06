import React from 'react';
import { View, Button } from 'react-native';
import { removeAllData } from '../utils/helper';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../redux-ui-state/slices/userSlice';

const DareCenter = () => {
  const dispatch=useDispatch();
  const handleButtonPress = () => {
    removeAllData();
    dispatch(setLanguage(''));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={() => handleButtonPress()} title="Logout" />
    </View>
  );
};

export default DareCenter;
