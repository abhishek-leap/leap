import React, {memo} from 'react';
import {Share} from 'react-native';
import styled from '@emotion/native';

const areEqual = (prevProps, nextProps) => {
  const {copyText: prevText} = prevProps;
  const {copyText: nextText} = nextProps;
  return prevText === nextText;
};

const ShareItem = ({component, copyText}) => {
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
  return <TapForShare onPress={onShare}>{component}</TapForShare>;
};

export default memo(ShareItem, areEqual);

const TapForShare = styled.TouchableOpacity``;
