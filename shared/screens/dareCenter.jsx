import React from 'react';
import { View, Button } from 'react-native';
import { removeAllData } from '../utils/helper';

const DareCenter = () => {
  const handleButtonPress = () => {
    removeAllData();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={() => handleButtonPress()} title="Logout" />
    </View>
  );
};

export default DareCenter;
