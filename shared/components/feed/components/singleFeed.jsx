import React, {useEffect, useState, useCallback} from 'react';
import {Pressable, AppState} from 'react-native';
// import Video from 'react-native-video';
import styled from '@emotion/native';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import Dots from '../../../images/dots.svg';
import Block from '../../../images/block.svg';
import {
  firstFeedLoaded,
  openThreeDotsBottomDrawer,
  selectedFeedItem,
} from '../../../redux-ui-state/slices/feedsSlice';
import Info from './info';
import FeedOptions from './feedOptions';
import {getData} from '../../../utils/helper';
import LinearProgress from '../../common/linearProgressBar';
import FeedPlayer from './feedPlayer';
import Loader from '../../common/loader';
import {useFeed} from '../../../hooks/feeds';
import Battle from './battle';

const SingleFeed = ({
  item,
  index,
  currentIndex,
  totalhHeight,
  virtualRef,
  videoRef,
}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {data} = useFeed();
  const feed = item || data || {};
  const {blockedUsersList, audioOn} = useSelector(state => state.feeds);
  const [progress, setProgress] = useState();
  const [isBlockToggle, setIsBlockToggle] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const asset = feed?.videos ? feed?.videos[0] || '' : '';
  const uri = asset?.reference || feed?.compressedVideoUrl || '';
  const poster = asset?.imageLink || feed?.compressedThumbUrl || '';
  const activeVideo =
    currentIndex === undefined ? false : currentIndex === index;

  const isPrevVideo = currentIndex === index + 1;
  const isNextVideo = currentIndex === index - 1;

  let isBlocked = false; //blockedUsersList.indexOf(item?.id) > -1;
  let isPowerUser = false; //getData('power_user');
  let blockedByPowerUser = false; //item?.blockPowerUserId ? true : false;
  let blockedText = '';

  useEffect(() => {
    const blur = global.navRef.addListener('blur', () => {
      setPlaying(false);
    });
    const focus = global.navRef.addListener('focus', () => {
      setPlaying(true);
    });
    // return blur,remove
  }, [global.navRef]);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    const timeout = setTimeout(() => {
      isBlocked = blockedUsersList.indexOf(feed?.id) > -1;
      isPowerUser = getData('power_user');
      blockedByPowerUser = feed?.blockPowerUserId ? true : false;
      let blockedText = '';
      if (
        feed?.communityBlockersCount &&
        !feed?.blockPowerUserId &&
        !feed?.blockedAt
      ) {
        blockedText = feed?.communityBlockersCount;
      } else if (!feed?.blockPowerUserId && feed?.blockedAt) {
        blockedText = 'you blocked';
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      setPlaying(false);
    } else if (nextAppState === 'active') {
      setPlaying(true);
    }
  };

  const closeModal = () => {};

  const playAndPause = useCallback(() => {
    setPlaying(prevPlaying => !prevPlaying);
  }, []);

  const handleOpenDrawer = useCallback(() => {
    dispatch(openThreeDotsBottomDrawer());
    dispatch(selectedFeedItem(feed));
  }, [blockedUsersList, feed]);

  const handleProgress = data => {
    if (currentIndex === 0) {
      dispatch(firstFeedLoaded());
    }
    if (activeVideo) {
      setProgress(data);
    }
  };

  return (
    <StyledView key={feed?.id} height={totalhHeight} bgColor={colors.primary}>
      <Pressable
        activeOpacity={0.7}
        onPress={playAndPause}
        style={{
          opacity: isBlocked && isPowerUser == 'false' ? 0.2 : 1,
        }}>
        <FeedPlayer
          loop={true}
          assetPoster={poster}
          pausedStatus={true || !activeVideo || !playing}
          assetReference={uri}
          muted={!audioOn}
          handleProgress={handleProgress}
          setShowLoader={setShowLoader}
          virtualRef={virtualRef}
          activeVideo={activeVideo}
          videoRef={videoRef}
        />
      </Pressable>
      {showLoader && (
        <LoaderContainer height={totalhHeight}>
          <Loader />
        </LoaderContainer>
      )}
      {/* {
        (isBlocked ||
          (feed?.communityBlockersCount > 0 && isPowerUser == 'true')) && (
          <BlockBGView
            blockedByPowerUser={blockedByPowerUser}
            isBlockToggle={isBlockToggle}
            onPress={() => setIsBlockToggle(status => !status)}>
            <BlockUpperView>
              <Block />
              <BlockText>{'Blocked'}</BlockText>
            </BlockUpperView>
            {isBlockToggle && (
              <BlockLowerView colors={colors}>
                <BlockCountText>{blockedText}</BlockCountText>
              </BlockLowerView>
            )}
          </BlockBGView>
        )
        // <BlockItem />
      } */}

      <FeedOptionsContainer windowHeight={totalhHeight}>
        <ThreeDots onPress={handleOpenDrawer}>
          <Dots height={25} width={25} />
        </ThreeDots>
        <FeedOptions data={feed} height={totalhHeight - 100} />
        <BattleIconContainer>
          {feed?.availableForDareBack ? (
            <Battle width={63} height={70} item={item} />
          ) : (
            <></>
          )}
        </BattleIconContainer>
      </FeedOptionsContainer>
      <Info item={feed} windowHeight={totalhHeight} closeModal={closeModal} />
      {activeVideo && (
        <LinearProgress
          backgroundColor={colors.PLAYLEAP_PROGRESS_BG_COLOR}
          completedColor={colors.PLAYLEAP_PROGRESS_COLOR}
          data={progress}
          percentage={false}
        />
      )}
    </StyledView>
  );
};

export default SingleFeed;

const StyledView = styled.View`
  height: ${props => props.height};
  width: 100%;
  background-color: ${props => props.bgColor};
  blur-radius: 90px;
  position: relative;
`;

const FeedOptionsContainer = styled.View`
  position: absolute;
  right: 4px;
  height: ${props => props.windowHeight || '100%'};
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const ThreeDots = styled.TouchableOpacity`
  position: absolute;
  transform: rotate(90deg);
  padding: 20px 20px 20px 0;
`;
const BattleIconContainer = styled.TouchableOpacity``;

const BlockBGView = styled.TouchableOpacity`
  padding: 4.67px 8.78px;
  display: flex;
  align-items: flex-start;
  margin-left: 25px;
  background-color: ${props =>
    props.blockedByPowerUser
      ? '#b80000'
      : 'rgb(184, 110, 0)'}; //rgb(184, 110, 0); //linear-gradient(rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0) 59.62%), rgb(184, 110, 0);
  border: 0.5px solid rgba(255, 255, 255, 0.53);
  box-shadow: rgb(0 0 0 / 71%) 0px 2px 2px;
  border-radius: 0px 0px 14px 14px;
  position: absolute;
  top: 0px;
  width: ${props => (props.isBlockToggle ? '23%' : '7%')};
  height: 4%;
`;

const BlockText = styled.Text`
  color: #fff;
  padding-left: 10px;
`;

const BlockUpperView = styled.View`
  flex-direction: row;
`;

const BlockLowerView = styled.View`
  margin-top: 10%;
  width: 100%;
  height: 200%;
  padding-top: 6px;
  flex-direction: row;
  justify-content: center;
  background-color: hsla(0, 0%, 85%, 0.8);
`;

const BlockCountText = styled.Text`
  color: #000;
  text-align: center;
`;

const LoaderContainer = styled.View`
  position: absolute;
  height: ${props => (props.height ? props.height : '100%')};
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
`;
