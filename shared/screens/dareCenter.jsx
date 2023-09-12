import React from 'react';
import { View, Button } from 'react-native';
import { removeAllData } from '../utils/helper';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../redux-ui-state/slices/userSlice';
import { registerFcm } from '../apis';
import { getData } from '../utils/helper';

const DareCenter = () => {
  const dispatch=useDispatch();
  const handleButtonPress = () => {
    const fcmToken = getData('fcmToken');
    registerFcm({
       appInstallationId: fcmToken,
       appInstallationDevice: Platform.OS,
       fmsUtm: {},
       isLoggedOff: true
     });
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
