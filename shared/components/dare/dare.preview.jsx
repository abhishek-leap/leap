import React from "react";
import styled from '@emotion/native';

import { Slide } from '../common/slide.animate';
import { WINDOW_WIDTH } from "../../constants";

const DarePreview = ({
  firstVideoDareCover,
  secondVideoDareCover,
  seprator,
}) => {
  return (
    <Wrapper>
      <PreviewScreens>
        <Slide left={false} duration={1500} leftP={-WINDOW_WIDTH}>
            <PreviewImage
                source={{uri: firstVideoDareCover}}
                defaultSource={require("../../images/defaultCover.png")}
                width={320}
                height={100}
                priority={true}
                alt="cover"
            />
        </Slide>
      </PreviewScreens>
      <Middle>{seprator}</Middle>
      <PreviewScreens>
        <Slide left={true} duration={1500} leftP={WINDOW_WIDTH}>
          <PreviewImage
              source={{uri: secondVideoDareCover}}
              defaultSource={require("../../images/defaultCover.png")}
              width={320}
              height={330}
              priority={true}
              alt="cover"
          />
          </Slide>
      </PreviewScreens>
    </Wrapper>
  );
};

export default DarePreview;


const Wrapper = styled.View`
  position: relative;
  height: 90%;
  overflow: hidden;
`;

const Middle = styled.View`
  position: relative;
  width: 110%;
  z-index: 10;
`;

const PreviewScreens = styled.View`
  height: 50%;
`;

const PreviewImage = styled.Image`
  height: 110%;
`;