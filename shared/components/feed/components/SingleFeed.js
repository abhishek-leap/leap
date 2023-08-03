import React, {useEffect, useState, memo, useMemo, useCallback} from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator,
  Pressable,
  AppState,
} from 'react-native';
// import Video from 'react-native-video';
import styled from '@emotion/native';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme} from '@react-navigation/native';

import Dots from '../../../images/dots.svg';
import Block from '../../../images/block.svg';
import {
  // feedScreenDisplay,
  openThreeDotsBottomDrawer,
  selectedFeedItem,
  setAudioOff,
  setAudioOn,
} from '../../../redux-ui-state/slices/feedsSlice';

import RealInfo from './reel-info';
import FeedOptions from './feed-options';
import {getData} from '../../../utils/helper';
// import {INITIAL_LOAD_FEED} from '../../../constants';
import LinearProgress from '../../common/linearProgressBar';
import FeedPlayer from './Feed-Player';
import Loader from '../../common/loader';

// import { Image } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

const areEqualFeed = (prevProps, nextProps) => {
  const {
    item: prevItem,
    currentIndex: prevCurrentInex,
    index: prevIndex,
  } = prevProps;
  const {
    item: nextItem,
    currentIndex: nextCurrentInex,
    index: nextIndex,
  } = nextProps;
  // console.log("prevCurrentInex nextCurrentInex prevIndex nextIndex ", prevCurrentInex + ' ' + nextCurrentInex + ' ' + prevIndex + ' ' + nextIndex);
  if (prevCurrentInex === nextCurrentInex) return true;
  return false;
};

const SingleFeed = ({
  item,
  index,
  currentIndex,
  TotalhHeight,
  videoRef,
  virtualRef,
}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {blockedUsersList, feedScreen, audioOn} = useSelector(
    state => state.feeds,
  );

  const [progress, setProgress] = useState();
  const [isBlockToggle, setIsBlockToggle] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  const asset = item?.videos ? item?.videos[0] || '' : '';
  const uri = asset?.reference || item?.compressedVideoUrl || '';
  const poster = asset?.imageLink || item?.compressedThumbUrl || '';
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
      isBlocked = blockedUsersList.indexOf(item?.id) > -1;
      isPowerUser = getData('power_user');
      blockedByPowerUser = item?.blockPowerUserId ? true : false;
      let blockedText = '';
      if (
        item?.communityBlockersCount &&
        !item?.blockPowerUserId &&
        !item?.blockedAt
      ) {
        blockedText = item?.communityBlockersCount;
      } else if (!item?.blockPowerUserId && item?.blockedAt) {
        blockedText = 'you blocked';
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      setPlaying(false);
    }
  };

  const closeModal = () => {};

  const clickHandler = useCallback(() => {
    if (audioOn) {
      dispatch(setAudioOff());
    } else {
      dispatch(setAudioOn());
    }
  }, [audioOn]);

  const playAndPause = useCallback(() => {
    setPlaying(prevPlaying => !prevPlaying);
  }, []);

  const handleOpenDrawer = useCallback(() => {
    dispatch(openThreeDotsBottomDrawer());
    dispatch(selectedFeedItem(item));
  }, [blockedUsersList, item]);

  const FeedContent = useMemo(() => {
    if (isPrevVideo || activeVideo || isNextVideo) {
      return (
        <>
          {
            (isBlocked ||
              (item?.communityBlockersCount > 0 && isPowerUser == 'true')) && (
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
          }
          <ThreeDots onPress={handleOpenDrawer}>
            <Dots height={25} width={25} />
          </ThreeDots>
          <FeedOptionsContainer>
            <FeedOptions
              data={item}
              clickHandler={clickHandler}
              mute={!audioOn}
            />
          </FeedOptionsContainer>
          <RealInfo
            item={item}
            windowHeight={TotalhHeight}
            closeModal={closeModal}
          />
        </>
      );
    } else {
      return <></>;
    }
  }, [index, audioOn, activeVideo, isPrevVideo, isNextVideo]);

  const handleProgress = data => {
    if (activeVideo) {
      setProgress(data);
    }
  };



  return (
    <View
      key={item?.id}
      style={{
        height: TotalhHeight,
        width: '100%',
        backgroundColor: colors.primary,
        blurRadius: 90,
      }}>
      <Pressable
        activeOpacity={0.7}
        onPress={playAndPause}
        style={{
          opacity: isBlocked && isPowerUser == 'false' ? 0.2 : 1,
        }}>
        <FeedPlayer
          loop={true}
          assetPoster={poster}
          pausedStatus={!activeVideo || !playing}
          assetReference={uri}
          muted={!audioOn}
          handleProgress={handleProgress}
          feedScreen={feedScreen}
          videoRef={videoRef}
          setShowLoader={setShowLoader}
          virtualRef={virtualRef}
          activeVideo={activeVideo}
        />
      </Pressable>
      {showLoader && (
        <LoaderContainer height={TotalhHeight}>
          <Loader />
        </LoaderContainer>
      )}
      {progress?.currentTime === 0 ? (
        <ActivityIndicator
          animating
          size="large"
          color={'#9900D9'}
          style={[
            {
              position: 'absolute',
              top: TotalhHeight / 2.2,
              left: WINDOW_WIDTH / 2,
              right: WINDOW_WIDTH / 2,
            },
            {opacity: 1},
          ]}
        />
      ) : null}
      {/* {FeedContent} */}
      {activeVideo && (
        <LinearProgress
          backgroundColor={colors.PLAYLEAP_PROGRESS_BG_COLOR}
          completedColor={colors.PLAYLEAP_PROGRESS_COLOR}
          data={progress}
          percentage={false}
        />
      )}
    </View>
  );
};

export default memo(SingleFeed, areEqualFeed);

const FeedOptionsContainer = styled.View`
  position: absolute;
  right: 4px;
  height: 100%;
`;

const ThreeDots = styled.TouchableOpacity`
  position: absolute;
  right: 5px;
  transform: rotate(90deg);
  hitSlop: {top: 100, bottom: 100, left: 100, right: 100}
  padding: 20px 20px 20px 0;
`;

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
