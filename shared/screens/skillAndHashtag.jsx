import React from 'react';
import {Text, View,Button} from 'react-native';
import { handleGoBack } from '../navigation/navigationService';

const SkillAndHashtag = (props) => {
  const { screen } = props.route.params

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{screen}</Text>
      <Button
        title="Back"
        onPress={handleGoBack}
      />
    </View>
  );
};

export default SkillAndHashtag;