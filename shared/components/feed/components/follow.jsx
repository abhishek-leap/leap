import React, {useEffect, useState} from 'react';
import styled from '@emotion/native';
import FollowIcon from '../../../images/profile-plus.svg';
import withAuthentication from '../../../hoc/withAuthentication';
import {loadProfile, startFollow} from '../../../apis';
import {getData} from '../../../utils/helper';
import {
  FullAuthentication,
  openAuthenticationBottomDrawer,
} from '../../../redux-ui-state/slices/authenticationSlice';
import {useDispatch} from 'react-redux';

const ProfileFollowButton = ({
  followId,
  isText = true,
  entityId,
  hasFollowIcon,
  updateFollowers,
  isBasicSignupCompleted,
  setFollowList,
  updateFollowings,
  isNotification,
  isToken,
}) => {
  //   const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasFollow, setHasFollowIcon] = useState(hasFollowIcon);
  const [followedId, setFollowedId] = useState();
  const dispatch = useDispatch();
  const alias = getData('user_alias');

  const followUser = async data => {
    try {
      let followData = await startFollow(data);
      if (followData?.id) {
        if (!isText) {
          setHasFollowIcon(false);
        } else {
          setFollowedId(followData?.id);
          setLoading(false);
          if (updateFollowers) {
            updateFollowers({type: 'follow', data: followData});
          }
          if (setFollowList) {
            setFollowList(prev => {
              return [...prev, followData?.bindEntityId];
            });
          }
          if (updateFollowings) {
            updateFollowings({data: followData});
          }
        }
      } else {
        setHasFollowIcon(hasFollowIcon);
      }
    } catch (e) {
      setHasFollowIcon(hasFollowIcon);
    } finally {
    }
  };

  const unfollowUser = async () => {
    if (!updateFollowers && !updateFollowings) return;
    try {
      const unfollowData = await deleteFollow(followedId);
      if (unfollowData?.count) {
        setFollowedId('');
        setLoading(false);
        if (updateFollowings) {
          updateFollowings({followedId});
        }
        if (updateFollowers) {
          updateFollowers({type: 'unfollow', followedId});
        }
      }
    } catch (e) {
    } finally {
    }
  };

  const handleFollowUnfollow = async () => {
    if (isBasicSignupCompleted) {
      setLoading(true);
      if (!isText) {
        setHasFollowIcon(false);
      }
      if (followedId) {
        unfollowUser();
      } else {
        const data = await loadProfile({userAlias: alias});
        followUser({
          id: data?.details?.id,
          data: {
            bindEntityId: entityId,
            bindEntityName: 'Customer',
          },
        });
      }
    } else {
      if (!isToken) {
        dispatch(FullAuthentication(0));
        dispatch(openAuthenticationBottomDrawer());
      }
    }
  };

  useEffect(() => {
    if (followId) {
      setFollowedId(followId);
    }
  }, [followId]);

  return (
    <Root onClick={handleFollowUnfollow} notification={isNotification}>
      {isText ? (
        <>
          {!updateFollowers && !setFollowList && !!followedId ? (
            isNotification ? (
              <UnFollowIconWrapper>
                {/* <UnFollowIcon /> */}
              </UnFollowIconWrapper>
            ) : (
              <FollowText>Following</FollowText>
            )
          ) : (
            <FollowBtnWrapper
              disabled={loading}
              type={!!followedId && 'secondary'}>
              <FollowBtn
                disabled={loading}
                type={!!followedId && 'secondary'}
                notification={isNotification}>
                {!!followedId ? 'UNFOLLOW' : 'FOLLOW'}
              </FollowBtn>
            </FollowBtnWrapper>
          )}
        </>
      ) : (
        <>
          {!hasFollow ? (
            <></>
          ) : (
            <StyledButton onPress={() => handleFollowUnfollow()}>
              <FollowIcon />
            </StyledButton>
          )}
        </>
      )}
    </Root>
  );
};

const Root = styled.View`
  ${props =>
    props.notification &&
    `
  width: 75px
  `}
`;

const StyledButton = styled.TouchableOpacity``;

const FollowBtnWrapper = styled.View`
  padding: 4px 3.21px;

  background: ${props =>
    props.disabled
      ? '#C0C8D9'
      : props.type === 'secondary'
      ? 'rgba(153, 0, 217, 0.38)'
      : 'linear-gradient(270deg, rgba(255, 0, 172, 0.24) 0%, rgba(153, 0, 217, 0.24) 100%);'};
  border-radius: 18px;
  display: block;
`;

const FollowBtn = styled.Button`
  background: ${props =>
    props.disabled
      ? '#C0C8D9'
      : props.type === 'secondary'
      ? 'rgba(153, 0, 217, 0.38)'
      : 'linear-gradient(270deg, #ff00ac 0%, #9900d9 100%)'};
  font-weight: 500;
  font-size: ${props => (props.notification ? 10 : 12)}px;
  line-height: ${props => (props.notification ? 12 : 16)}px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.07143px;
  color: #ffffff;
  border-radius: 15px;
  border: 0;
  display: block;
  width: 100%;
  padding: 4px 11px;
`;

const FollowText = styled.View`
  color: white;
  text-align: center;
  font-weight: 400;
`;

const UnFollowIconWrapper = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default withAuthentication(ProfileFollowButton);
