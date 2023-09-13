import React, {useState} from 'react';
import {NativeModules, Platform} from 'react-native';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
// import { createThumbnail } from "react-native-create-thumbnail";

// import
import {
  HEADER_DARE_BACK_DETAILS,
  HEADER_DARE_BACK_SUBTITLE,
  WINDOW_WIDTH,
} from '../../constants';
import Header from './components/header';
import Footer from './components/footer';
import {lensGroup, dareBack} from '../../apis';
import {getBase64FromUrl, getData} from '../../utils/helper';
import Row from './components/row';
import {useDareBackInfiniteFeeds} from '../../hooks/useInfiniteFeeds';
import StartBattle from './components/startBattle';
import {
  closeDareBackBottomDrawer,
  openDareBackSecondStepBottomDrawer,
} from '../../redux-ui-state/slices/dareBackSlice';
import {
  selectedVedioURI,
  vedioThumbnail,
} from '../../redux-ui-state/slices/createDareSlice';

const DareBack = ({onCloseIconClick, selectedPostItem}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {status, data, error, isLoading, refetch, fetchNextPage} =
    useDareBackInfiniteFeeds();
  const [backIcon, setBackIcon] = useState(false);
  const [headDetailShow, setHeadDetailShow] = useState(true);
  const [startBattleData, setStartBattleData] = useState([]);
  const {VideoEditorModule} = NativeModules;

  const openVideoEditor = async () => {
    const token = getData('token');
    // lensGroup.mutate(token);
    const data = await lensGroup();
    let lenseGroup = [];
    lenseGroup = data?.groups?.toString();
    const videoUri = await VideoEditorModule.openVideoEditor(
      token,
      lenseGroup,
      false,
    );
    if (videoUri) {
      dispatch(closeDareBackBottomDrawer());
      dispatch(selectedVedioURI(videoUri));
      // createThumbnail({
      //   url: Platform.OS == "ios" ? videoUri : `file:/${videoUri}`,
      //   timeStamp: 100,
      // })
      // .then(async (response) => {
      //   const img = await getBase64FromUrl(response.path);
      //   dispatch(vedioThumbnail(img));
      //   dispatch(openDareBackSecondStepBottomDrawer());
      // })
      // .catch((err) => console.log({ err }));
    }
  };

  const callBackStartBattleFunction = async () => {
    handleBack();
    dispatch(closeDareBackBottomDrawer());
    const assets = {
      assetId: startBattleData.assetId,
      dareCover: startBattleData.url,
      feedId: startBattleData.feedId,
      type: 'video',
    };
    const options = {
      assets: [assets],
      feedId: selectedPostItem.id,
      hashTags: selectedPostItem.hashTags,
      isFromUserFeed: true,
    };
    const dareBackResponse = await dareBack(options);
  };

  const handleBack = () => {
    setBackIcon(false);
    setHeadDetailShow(true);
  };

  const handleClose = () => {
    setBackIcon(false);
    onCloseIconClick();
  };

  const callBackFunction = data => {
    setStartBattleData(data);
    setBackIcon(true);
    setHeadDetailShow(false);
  };

  const callBackFooterFunction = () => {
    openVideoEditor();
  };

  return (
    <>
      <Header
        title={selectedPostItem ? selectedPostItem.skills[0]?.alias : ''}
        subTitle={HEADER_DARE_BACK_SUBTITLE}
        details={headDetailShow ? HEADER_DARE_BACK_DETAILS : ''}
        handleClose={handleClose}
        handleBack={handleBack}
        backIcon={backIcon}
      />
      {backIcon ? (
        <StartBattle
          dareBackPostData={selectedPostItem}
          data={startBattleData}
          callBackStartBattleFunction={callBackStartBattleFunction}
        />
      ) : (
        <>
          <InnerView colors={colors} currentWidth={WINDOW_WIDTH}>
            <FlatList
              data={data?.feeds}
              extraData={data?.feeds}
              keyExtractor={(item, index) => `${index}_${item?.id}`}
              renderItem={({item, index}) => (
                <Row
                  url={item.videos[0]?.imageLink}
                  title={item.body}
                  skills={item.skills[0]?.alias}
                  hashtags={item?.hashTags || ''}
                  likeCount={item.stats?.reactions}
                  ViewsCount={item.stats?.views}
                  assetId={item.videos[0]?.id}
                  feedId={item.id}
                  callBackFunction={callBackFunction}
                  onEndReached={() => fetchNextPage()}
                  onEndReachedThreshold={10}
                />
              )}
              // onEndReached={() => fetchNextPage()}
              // onEndReachedThreshold={5}
            />
          </InnerView>
          <Footer callBackFooterFunction={callBackFooterFunction} />
        </>
      )}
    </>
  );
};

export default DareBack;

const InnerView = styled.View`
  flex: 1;
  background-color: ${props => props.colors.primary};
`;

const FlatList = styled.FlatList``;
