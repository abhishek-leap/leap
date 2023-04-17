import React from 'react';
import {Text, View} from 'react-native';

const SkillAndHashtag = (props) => {
  const { screen } = props.route.params

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{screen}</Text>
    </View>
  );
};

export default SkillAndHashtag;