import React from 'react';
import { Share } from 'react-native';
import styled from '@emotion/native';

const ShareItem = ({ component, copyText }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: copyText,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <TapForShare 
        onPress={onShare}>
      {component}
    </TapForShare>
  );
};

export default ShareItem;

const TapForShare = styled.TouchableOpacity`
`;