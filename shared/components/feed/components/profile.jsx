import React, {useState} from 'react';
import styled from '@emotion/native';
import { Image, View } from 'react-native';
import Svg, { Circle, ClipPath, Path, Polygon, Defs, G } from 'react-native-svg';

import Shield from '../../../images/shield.svg';
import { MEDIA, AVATAR_ID } from '../../../apis/urls';
import defaultThumbnail from "../../../images/defaultCover.png";
import {storage} from '../../../mmkv-store/store';


function SvgComponent(props) {
  return (
    <Svg viewBox="0 0 511 511">
        <G {...props}>
          <Path d="M131.5 96c-11.537 0-21.955 8.129-29.336 22.891C95.61 132 92 149.263 92 167.5s3.61 35.5 10.164 48.609C109.545 230.871 119.964 239 131.5 239s21.955-8.129 29.336-22.891C167.39 203 171 185.737 171 167.5s-3.61-35.5-10.164-48.609C153.455 104.129 143.037 96 131.5 96zm15.92 113.401C142.78 218.679 136.978 224 131.5 224s-11.28-5.321-15.919-14.599C110.048 198.334 107 183.453 107 167.5s3.047-30.834 8.581-41.901C120.22 116.321 126.022 111 131.5 111s11.28 5.321 15.919 14.599C152.953 136.666 156 151.547 156 167.5s-3.047 30.834-8.58 41.901z" />
          <Path d="M474.852 158.011c-1.263-40.427-10.58-78.216-26.555-107.262C430.298 18.023 405.865 0 379.5 0h-248c-26.365 0-50.798 18.023-68.797 50.749C45.484 82.057 36 123.52 36 167.5s9.483 85.443 26.703 116.751C80.702 316.977 105.135 335 131.5 335a57.57 57.57 0 005.867-.312 7.51 7.51 0 002.133.312h48a7.5 7.5 0 000-15h-16c10.686-8.524 20.436-20.547 28.797-35.749 4.423-8.041 8.331-16.756 11.703-26.007V503.5a7.501 7.501 0 0011.569 6.3l20.704-13.373 20.716 13.374a7.498 7.498 0 008.134 0l20.729-13.376 20.729 13.376a7.49 7.49 0 004.066 1.198c1.416 0 2.832-.4 4.07-1.2l20.699-13.372 20.726 13.374a7.5 7.5 0 008.133 0l20.732-13.377 20.738 13.377a7.5 7.5 0 008.126.003l20.783-13.385 20.783 13.385a7.5 7.5 0 0011.561-6.305v-344a7.377 7.377 0 00-.146-1.488zM187.154 277.023C171.911 304.737 152.146 320 131.5 320s-40.411-15.263-55.654-42.977C59.824 247.891 51 208.995 51 167.5s8.824-80.391 24.846-109.523C91.09 30.263 110.854 15 131.5 15s40.411 15.263 55.654 42.977C203.176 87.109 212 126.005 212 167.5s-8.824 80.391-24.846 109.523zm259.563 204.171a7.5 7.5 0 00-8.122 0l-20.78 13.383-20.742-13.38a7.5 7.5 0 00-8.131 0l-20.732 13.376-20.729-13.376a7.497 7.497 0 00-8.136.002l-20.699 13.373-20.727-13.375a7.498 7.498 0 00-8.133 0l-20.728 13.375-20.718-13.375a7.499 7.499 0 00-8.137.001L227 489.728V271h8.5a7.5 7.5 0 000-15H227v-96.5c0-.521-.054-1.03-.155-1.521-1.267-40.416-10.577-78.192-26.548-107.231C191.936 35.547 182.186 23.524 171.5 15h208c20.646 0 40.411 15.263 55.654 42.977C451.176 87.109 460 126.005 460 167.5V256h-.5a7.5 7.5 0 000 15h.5v218.749l-13.283-8.555z" />
          <Path d="M283.5 256h-16a7.5 7.5 0 000 15h16a7.5 7.5 0 000-15zM331.5 256h-16a7.5 7.5 0 000 15h16a7.5 7.5 0 000-15zM379.5 256h-16a7.5 7.5 0 000 15h16a7.5 7.5 0 000-15zM427.5 256h-16a7.5 7.5 0 000 15h16a7.5 7.5 0 000-15z" />
      </G>
    </Svg>
  );
}

const Profile= ({size = 40, author}) => {
  const { entityId } = author;
  const [avatarId, setAvatarId] = useState(storage.getString(AVATAR_ID));
  const [srcImg, setSrcImg] = useState(
    entityId ? `${MEDIA}/Attachments/avatar/download/${entityId}_200x200.jpeg?v=${avatarId}` : defaultThumbnail
  );
  const points = "80,0.3 23.6,23.6 0.3,80 23.6,136.4 80,159.7 136.4,136.4 159.7,80 136.4,2 3.6";
  // console.log(srcImg);
  return (
    <Container size={size}>
      <Shield width="100%" height="100%" />
          {/* <SvgComponent width="100%" height="100%" strokeWidth={5} stroke="black" /> */}
          {/* <Svg width={160} height={160} viewBox={`0 0 160 160`}>
            <Defs>
                <ClipPath id="clip">
                    <Polygon points={points} />
                </ClipPath>
            </Defs>
            <Image x="0" y="0" width="160" height="160" source={require('../../../images/dummyAvatar.jpeg')} clipPath="#clip" />
        </Svg> */}
          {/* <Svg height={size} width={size}>
            <ClipPath id="clip">
            <Polygon 
              fill="none" 
              points="3 12 21 12 18 8 6 8 3 12" 
              stroke={'#333'}
            />
            <Circle r={size + 50} cx={size/2} />
            </ClipPath>
            <ThumbnailContainer width={size}>
            <Content>
            <ThumbnailBgImage
                 source={ srcImg ? { uri: srcImg } : require('../../../images/dummyAvatar.jpeg')}
                 width={size}
                 height={size}
                 preserveAspectRatio="xMidYMid slice"
                 clipPath='url(#clip)'
                 onError={err => {
                  setSrcImg(defaultThumbnail);
                }} 
            />
            
              </Content>
        </ThumbnailContainer>
          </Svg> */}
      {/* <Image
                source={require('../../../images/dummyAvatar.jpeg')}
                width={size}
                height={size}
                preserveAspectRatio="xMidYMid slice"
                clipPath='url(#clip)'
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
              /> */}
    </Container>
  );
};

export default Profile;

const Container = styled.View`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`}
`;

const ThumbnailBgImage = styled.Image`
  width: 100%;
  height: 100%;
`;
const Content = styled.View`
  width: 100%;
  height: 100%;
  -webkit-clip-path: url(#my-clip-path);
  clip-path: url(#my-clip-path);
  clipPath: url(#my-clip-path);
  transform: scale(0.85);
  marginBottom: 80px;
`;

// const ContentWrapper = styled.View`
//   display: flex;
//   justify-content: center;
//   position: relative;
// `;

const ThumbnailContainer = styled.View`
  aspect-ratio: 0.9;
  width: ${props => props.width};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;