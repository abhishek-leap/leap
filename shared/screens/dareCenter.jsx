import React from 'react';
import {Text, View, Button} from 'react-native';
import {storage} from '../../shared/mmkv-store/store';

const DareCenter = () => {
  const handleButtonPress = () => {
    const isAuthenticated = storage.getString('isAuthenticated');
    if (isAuthenticated) {
      storage.delete('isAuthenticated');
    } else {
      storage.set('isAuthenticated', 'yes');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Dare Center</Text>
      <Button onPress={handleButtonPress} title="Toggle Authentication key" />
    </View>
  );
};

export default DareCenter;
