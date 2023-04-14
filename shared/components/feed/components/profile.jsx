import React from 'react';
import styled from '@emotion/native';
import Svg, { ClipPath, Path, Defs, Image } from 'react-native-svg';

import Shield from '../../../images/shield.svg';

import { MEDIA, AVATAR_ID } from '../../../apis/urls';
import { WINDOW_WIDTH } from '../../../constants';

const Profile= ({author}) => {
  const { entityId } = author;
  // const [avatarId, setAvatarId] = useState(storage.getString(AVATAR_ID));
  const srcImg = `${MEDIA}/Attachments/avatar/download/${entityId}_200x200.jpeg`;
  return (
    <Container>
      <Svg height="100" width="100">
      <Defs>
        <ClipPath id="clip">
        <Path
            fill-rule="evenodd" clip-rule="evenodd" stroke="url(#paint0_linear_1467_5741)" stroke-linecap="round" stroke-linejoin="round"  
            d="M1.00014 17.8342C1.00014 27.6238 8.35793 36.7774 18.2467 39C28.1354 36.7774 35.4932 27.6238 35.4932 17.8342V10.1466C35.4932 8.3939 34.4347 6.818 32.8135 6.15401L22.0344 1.74537C19.607 0.751542 16.8863 0.751542 14.4589 1.74537L3.67982 6.15401C2.05865 6.818 1.00014 8.3939 1.00014 10.1466V17.8342Z"
        />
        </ClipPath>
      </Defs>
      <Shield width="80%" height="75%" />
      <>
       <Image
        width="35%"
        height="40%"
        preserveAspectRatio="xMidYMid slice"
        transform={[{scale: 0.90}, {translateX: 1.5}, {translateY: 1.5}]}
        href={require('../../../images/defaultCover.png')}
        clipPath="url(#clip)"
      />
      <Image
        width="35%"
        height="40%"
        preserveAspectRatio="xMidYMid slice"
        transform={[{scale: 0.90}, {translateX: 1.5}, {translateY: 1.5}]}
        href={{uri: srcImg}}
        clipPath="url(#clip)"
      />
      </>
    </Svg>
    </Container>
  );
};

export default Profile;

const Container = styled.View`
  width: ${props => `${(WINDOW_WIDTH / 5.25)}px`};
  height: ${props => `${(WINDOW_WIDTH / 6.25)}px`}
`;