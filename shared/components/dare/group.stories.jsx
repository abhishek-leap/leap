import {View} from 'react-native';
import Group from './group';
import {storiesOf} from '@storybook/react-native';

const dare = {
  assets: [
    {
      assetId: '637c71252be0970026eae103',
      assetType: 'dareCreator',
      dareCover:
        'https://d1hus0nx0ytxoz.cloudfront.net/3259e2f1-27ad-447f-b6e0-b9bc311db221/thumbnails/459c32c0-a339-41ad-b26c-d813f77671d7_thumb.0000000.jpg',
      feedId: '637c71274cda0b002e9a1124',
      id: null,
      isValidated: true,
      totalVotes: 0,
      type: 'video',
      userId: '6377900ce14b90002672149b',
      userName: 'test sdfg',
    },
    {
      assetId: '637c717e2be0970026eae104',
      assetType: 'dareCompetitor',
      dareCover:
        'https://d1hus0nx0ytxoz.cloudfront.net/a395f96f-1a46-4842-9962-be1f0cb571fd/thumbnails/b4d98465-a98b-4e0c-afb8-4cbba72f7904_thumb.0000000.jpg',
      feedId: '637c718000ffcc00353b885a',
      isValidated: true,
      totalVotes: 0,
      type: 'video',
      userId: '637b30f3e14b90002672151d',
      userName: 'sadf asdf',
    },
  ],
};

storiesOf('Group', module).add('default', () => (
  <View
    style={{
      height: '100%',
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center',
    }}>
    <Group width={100} height={Platform.OS === 'ios' ? 80 : 90} dare={dare} />
  </View>
));
