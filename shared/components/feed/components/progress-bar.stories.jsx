import {View} from 'react-native';
import ProgressBar from './progress-bar';
import {storiesOf} from '@storybook/react-native';

const data = {
  currentTime: 2,
  seekableDuration: 6,
};

storiesOf('ProgressBar', module).add('default', () => (
  <View
    style={{
      height: '100%',
      justifyContent: 'center',
    }}>
    <ProgressBar data={data} />
  </View>
));
