import {View} from 'react-native';
import Shield from './shield';
import {storiesOf} from '@storybook/react-native';

const data = {
  currentTime: 2,
  seekableDuration: 6,
};

storiesOf('Shield', module).add('default', () => (
  <View
    style={{
      height: '100%',
      justifyContent: 'center',
    }}>
    <Shield height={50} width={50} />
  </View>
));
