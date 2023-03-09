import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import { handleGoBack } from '../navigation/navigationService';

const PlayerProfile = ({isToken}) => {
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Player Profile</Text>
      <TouchableOpacity onPress={() => handleGoBack()} >
        <Text>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayerProfile;
