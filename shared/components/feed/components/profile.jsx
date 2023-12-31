import React, {memo} from 'react';
import styled from '@emotion/native';
import Svg, {ClipPath, Path, Defs, Image, G} from 'react-native-svg';

import Shield from '../../../images/shield.svg';
import DefaultProfileAvatar from '../../../images/default-avatar.svg';

import {MEDIA, AVATAR_ID} from '../../../apis/urls';
import {WINDOW_WIDTH} from '../../../constants';
import {handlePush} from '../../../navigation/navigationService';
import {Platform} from 'react-native';

import ProfileFollowButton from './follow';

const DefaultAvatarWidth = Platform.OS == 'ios' ? '120%' : '105%';

const areEqual = (prevProps, nextProps) => {
  const {author: prevAuthor} = prevProps;
  const {author: nextAuthor} = nextProps;
  return prevAuthor.entityId === nextAuthor.entityId;
};
const Profile = ({author, shieldHeight, hasFollowIcon, width}) => {
  const {entityId} = author;
  // const [avatarId, setAvatarId] = useState(storage.getString(AVATAR_ID));
  const srcImg = `${MEDIA}/Attachments/avatar/download/${entityId}_200x200.jpeg`;

  return (
    <Root width={width} height={shieldHeight}>
      <Container
        onPress={() => handlePush({name: 'Profile', params: {auth: false}})}>
        <Svg height="100" width="100">
          <Defs>
            <ClipPath id="clip">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                stroke="url(#paint0_linear_1467_5741)"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M1.00014 17.8342C1.00014 27.6238 8.35793 36.7774 18.2467 39C28.1354 36.7774 35.4932 27.6238 35.4932 17.8342V10.1466C35.4932 8.3939 34.4347 6.818 32.8135 6.15401L22.0344 1.74537C19.607 0.751542 16.8863 0.751542 14.4589 1.74537L3.67982 6.15401C2.05865 6.818 1.00014 8.3939 1.00014 10.1466V17.8342Z"
              />
            </ClipPath>
          </Defs>
          <Shield
            width={Platform.OS === 'ios' ? '70%' : '60%'}
            height={shieldHeight ? shieldHeight : '75%'}
          />
          <>
            <G
              clipPath="url(#clip)"
              transform={[{scale: 0.85}, {translateX: 2.9}, {translateY: 2.9}]}>
              <DefaultProfileAvatar
                width={Platform.OS === 'ios' ? '120%' : '35%'}
                height={Platform.OS === 'ios' ? '120%' : '40%'}
              />
            </G>
            {srcImg.length > 0 ? (
              <Image
                width="35%"
                height="40%"
                preserveAspectRatio="xMidYMid slice"
                transform={[
                  {scale: 0.85},
                  {translateX: 2.9},
                  {translateY: 2.9},
                ]}
                href={{uri: srcImg}}
                clipPath="url(#clip)"
              />
            ) : null}
          </>
        </Svg>
      </Container>
      <ProfileBtn>
        <ProfileFollowButton
          isText={false}
          entityId={entityId}
          hasFollowIcon={hasFollowIcon}
        />
      </ProfileBtn>
    </Root>
  );
};

export default memo(Profile, areEqual);

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;

const ProfileBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
`;

const Root = styled.View`
  position: relative;
  align-items: center;
  width: ${props => props.width || `${WINDOW_WIDTH / 6.2}px`};
  height: ${props => props.height || `${WINDOW_WIDTH / 5.2}px`};
`;
