import React from 'react';
import styled from '@emotion/native';

// SVG Imports
import ShareIcon from '../../../images/share.svg';

// Components imports
import Profile from './profile';
import Like from './like';
import Comments from './comments';

//Redux imports
import ShareItem from '../../common/share';
import {BASE_URL_SITE} from '../../../apis/urls';
import {getData} from '../../../utils/helper';
import AudioToggler from './audioToggler';
import {useSelector} from 'react-redux';
import {Platform} from 'react-native';

const FeedOptions = ({data, height}) => {
  const {stats, author, id, following, userReactions} = data || {};
  const {feedPlayerModalId} = useSelector(({feeds}) => feeds);
  const loggedInUserId = getData('user_id');
  const onPressProfile = () => {};

  const onPressShare = () => {};

  return (
    <Container height={height}>
      <StyledSection onPress={onPressProfile}>
        <Profile
          author={author}
          hasFollowIcon={
            !following?.isFollowing && author?.entityId !== loggedInUserId
          }
        />
        {/* <PlusIcon>
          <ProfilePlusIcon />
        </PlusIcon> */}
      </StyledSection>
      <Like
        totalLikes={stats?.reactions || 0}
        userReactions={userReactions}
        feedId={feedPlayerModalId || id}
      />
      <Comments
        totalComments={data?.stats?.comments}
        feedId={feedPlayerModalId || id}
      />
      <StyledShareSection onPress={onPressShare}>
        {/* <ShareIcon height={35} width={35} /> */}
        {/* <StyledText>{data?.stats?.views}</StyledText> */}
        <ShareItem
          component={<ShareIcon height={35} width={35} />}
          copyText={BASE_URL_SITE + '/?feedId=' + id}
        />
      </StyledShareSection>
      <AudioToggler />
    </Container>
  );
};

export default FeedOptions;

const Container = styled.View`
  justify-content: center;
  height: ${props => props.height};
  align-items: center;
`;

const StyledSection = styled.TouchableOpacity`
  margin-bottom: 30px;
  width: 100%
  justify-content: center;
  align-items: center;
`;

const StyledShareSection = styled.TouchableOpacity`
  margin-vertical: 6px;
`;

const StyledText = styled.Text`
  color: white;
  text-align: center;
  font-size: 12px;
`;

const PlusIcon = styled.View`
  padding-left: ${Platform.OS === 'ios' ? '44%' : '42%'};
  padding-top: 62px;
  position: absolute;
`;
