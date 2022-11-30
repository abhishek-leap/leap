import {View} from 'react-native';
import Card from './card';
import {storiesOf} from '@storybook/react-native';

storiesOf('Card', module).add('default', () => (
  <View
    style={{
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    }}>
    <Card />
  </View>
));
