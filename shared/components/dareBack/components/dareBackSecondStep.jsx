import React, {useRef} from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
// Images 
import ArrowIcon from '../../../images/arrowHeadDown.svg';
import VSShieldIcon from '../../../images/shield-v2.svg';
import CloseIcon from '../../../images/close.svg';

// import 
import {
  PLACEHOLDER_HASHTAGS,
  SELECT_FROM_GALLERY,
  WINDOW_WIDTH, 
  UPLOAD_BROWSE_TYPE, 
  USER_TYPE,
  DARE_BACK
} from '../../../constants';
import { BUTTON_START_BATTLE } from '../../../constants';
import { 
    openHastagBottomDrawer, 
    selectedHashtags,
    progressBarUpdate,
    progressBarDisplay,
    progressBarStatus
 } from '../../../redux-ui-state/slices/createDareSlice';
import { dareBack, getSignedURL, postVideo, uploadVideoMediaAPI } from '../../../apis';
import { TEMP_CDN_VIDEO } from '../../../apis/urls';
import { getFields } from '../../../utils/helper';
import { AppButton } from '../../common/appButton';
import HeaderTwo from './headerTwo';
import { parsePostBody } from '../../../utils';
import { closeDareBackSecondStepBottomDrawer } from '../../../redux-ui-state/slices/dareBackSlice';

const DareBackSecondStep = ({ onCloseIconClick }) => {
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const { selectedPostItem } = useSelector(state => state.dareBack);
    const { videoURI, hashtags, videoThumbnailImg } = useSelector(state => state.createDare);
    const isVideoUploadStatus = useRef('');
    let postTitle = ''
    if(selectedPostItem.body) {
        postTitle = parsePostBody(selectedPostItem.body);
    }
    // console.log("selectedPostItem second step ", selectedPostItem);
    // const [postTitle] = parsePostBody(selectedPostItem.body);
    // const bodyObj = JSON.parse(selectedPostItem.body);
    // const postTitle =  bodyObj.blocks[0]?.text;

    const VideoUploadWithStatus = async (videoUri) => {
        const { url, fields } = await getSignedURL();
        //   console.log("fields.key ", fields.key);
          const dataValue = {
            ...fields,
          };
          const formData = new FormData();
          for (const name in dataValue) {
            formData.append(name, dataValue[name]);
          }
          formData.append("file", {
            uri: videoUri,
            type: 'video/mp4'
          });
          
          await postVideo(url, formData, videoUploadStatusCallBack, onUploadProgress);
          const VideoMediaStatus = {
            dareId: null,
            imageLink: null,
            notification: false,
            providerVideoId: fields.key,
            reference: `${TEMP_CDN_VIDEO}${fields.key}`,
            resource: "AWS",
            type: UPLOAD_BROWSE_TYPE.VIDEO,
            videoStatus: USER_TYPE.CREATOR,
          };
          const uploadVideoFields = await uploadVideoMediaAPI(VideoMediaStatus);
          isVideoUploadStatus.current = uploadVideoFields;
    }

    const videoUploadStatusCallBack =  async (uploadResponse) => {
        if(uploadResponse == 204 && !isVideoUploadStatus.current.error && isVideoUploadStatus.current != '') {
            const assets = {
                assetId: isVideoUploadStatus.current?.id,
                dareCover: "images/defaultCover.png",
                type: "video"
            }
            const options = {
                assets: [assets],
                feedId: selectedPostItem.id, 
                hashTags: getFields(hashtags, "value"),
            };
              
            const dareBackResponse = await dareBack(options);
        } 
    }
    
    //Show Progess bar of bottom tab
    function onUploadProgress(progressEvent) {
        let percentComplete = progressEvent.loaded / progressEvent.total;
        percentComplete = parseInt(percentComplete * 100);
        dispatch(progressBarUpdate(percentComplete));
        if(percentComplete === 100) {
            dispatch(progressBarDisplay(false));
            dispatch(progressBarStatus(true));
            dispatch(progressBarUpdate(0));
        }
    };

    // Submit for API call methods
    const submitButton = () => {
        dispatch(closeDareBackSecondStepBottomDrawer());
        dispatch(progressBarDisplay(true));
        VideoUploadWithStatus(videoURI);
        handleBack();
    }

    // Back Button
    const handleBack = () => {
        dispatch(selectedHashtags(''));
        onCloseIconClick();
    }

    return (
        <>
        <HeaderTwo
            title={DARE_BACK}
            handleBack={handleBack}
        />
        <InnerView colors={colors} currentWidth={WINDOW_WIDTH}>
        <TwoImageViewer colors={colors}>
            <ImageViewer>
                {selectedPostItem && <ImageHorizontal 
                    source={{uri: selectedPostItem.videos[0]?.imageLink || null}}
                /> }
            </ImageViewer>
            <SecondBox>
                <NewDare colors={colors} fontSize={16}>{postTitle}</NewDare>
                <NewDare colors={colors} fontSize={16}>{selectedPostItem ? selectedPostItem.skills[0]?.alias : ''}</NewDare>
                {selectedPostItem?.hashTags?.length > 0 && 
                    <CardLabel color={colors.PLAYLEAP_WHITE}>
                        {selectedPostItem?.hashTags.map((item, index) => (
                            <NewDare key={index} colors={colors} fontSize={11}>{'#'+item+" "}</NewDare>
                        ))}
                    </CardLabel> 
                }
            </SecondBox>
        </TwoImageViewer>
        <ShieldIcon>
            <VSShieldIcon height={'30'} width={'60'}/>
        </ShieldIcon>
        <TopView>
            {videoThumbnailImg && <Thumbnail 
                source={{uri: videoThumbnailImg}}
            /> }
            <ThumbnailRightView>
                <RightText colors={colors}>{SELECT_FROM_GALLERY}</RightText>
            </ThumbnailRightView>
        </TopView>
        <Hashtag onPress={() => dispatch(openHastagBottomDrawer())} currentWidth={WINDOW_WIDTH} colors={colors}>
            {
                hashtags.length == '' ? 
                    <Selected colors={colors}>{PLACEHOLDER_HASHTAGS}</Selected>
                    :
                    hashtags.map((item) => (
                    <HashTag colors={colors} currentWidth={WINDOW_WIDTH} hashtagLength={hashtags.length} >
                        <HashTagItem>{item.value}</HashTagItem>
                        <ClosedContainer colors={colors}  onPress={() => dispatch(selectedHashtags({name: item.value, value: item.value}))}>
                            <CloseIcon color={colors.PLAYLEAP_DARK_PINK} width={25} height={25} />
                        </ClosedContainer>
                    </HashTag> ))
            }
            <DownArrow color={colors.PLAYLEAP_WHITE} width={50}/>
        </Hashtag>
        <StartBattleBtn colors={colors}>
            <AppButton 
                title={BUTTON_START_BATTLE}
                width={'40%'}
                height={'7%'}
                isLoading={false}
                onPress={submitButton}
            />
        </StartBattleBtn>
      </InnerView>
      </>
    )
}

export default DareBackSecondStep;

const InnerView = styled.View`
    flex: 1;
    align-items: center;
    margin-bottom: ${props => props.currentWidth / 6};
`;

const Hashtag = styled.TouchableOpacity`
    width: ${props => props.currentWidth / 1.12 +'px'};
    border-width: 1px;
    border-color: ${props => props.colors.PLAYLEAP_DARK_PINK};
    border-radius: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.colors.primary};
    flex-wrap: ${props => props.hashtagLength !== '' && props.hashtagLength !== undefined ? 'wrap' : ''};
`;

const DownArrow = styled(ArrowIcon)`
    margin: 10px;
`;

const Selected = styled.Text`
    color: rgba(255, 255, 255, 1);
    font-weight: 500;
    font-size: 14px;
    width: 90%;
    padding: 7px 0 8px 30px;
`;

const HashTag = styled.View`
    border-width: 1px;
    border-color: ${props => props.colors.PLAYLEAP_DARK_PINK};
    border-radius: 20px;
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.colors.primary};
    margin-top: 2%;
    flex-wrap: wrap;
`;

const HashTagItem = styled.Text`
    color: rgb(255, 255, 255);
    text-align: center;
    padding: 9px 10px 5px 10px;
`;

const ClosedContainer = styled.TouchableOpacity`
    color: rgb(255, 255, 255);
    border-width: 1px;
    border-color: ${props => props.colors.PLAYLEAP_DARK_PINK};
    border-radius: 20px;
    margin: 2px 2px 2px 0;
`;

const Thumbnail = styled.Image`
    width: 107px;
    height: 160px;
    border-radius: 20px;
`;

const TopView = styled.View`
    width: 95%;
    height: 28%;
    margin: 5% 0 0% 10%;
    flex-direction: row;
`;

const ThumbnailRightView = styled.View`
    width: 60%;
    padding: 20% 5% 0 3%;
`;

const RightText = styled.Text`
    color: ${props => props.colors.PLAYLEAP_OFF_WHITE};
    padding-top: 10%;
`;

const StartBattleBtn = styled.View`
    height: 100%;
    flex-direction: row;
    justify-content: center;
    bottom: 0px;
    margin-top: 10%;
`;

const TwoImageViewer = styled.View`
    width: 85%;
    height: 37.5%;
    border-width: 1px;
    border-color: ${props => props.colors.secondary};
    border-radius: 20px;
    margin: 30px 2px 2px 0;
    flex-direction: column;
    background-color: rgba(38, 42, 82, 0.6);
`;

const ImageViewer = styled.View`
    width: 100%;
    height: 50%;
    margin: 0% 0 0% 0%;
    flex-direction: row;
`;

const ImageHorizontal = styled.Image`
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    // clip-path: polygon(0px 0px, 0px 100%, 100% 75%, 100% 0px);
    // clip-path: polygon(
    //     50% 0%,
    //     63% 38%,
    //     100% 38%,
    //     69% 59%,
    //     82% 100%,
    //     50% 75%,
    //     18% 100%,
    //     31% 59%,
    //     0% 38%,
    //     37% 38%
    // );
    // clip-path: circle(50px at 100% 0%)
`;

const NewDare = styled.Text`
    flex-wrap: wrap;
    height: 20px;
    text-align: center;
    color:  ${props => props.colors.PLAYLEAP_WHITE};
    align-item: center;
    font-size: ${props => props.fontSize}px;
`;
const CardLabel = styled.Text`
    text-align: left;
    text-align: center;
    color: ${props => props.color}
`;

const SecondBox = styled.View`
    padding: 13% 0 0 0;
    margin: 0 0 5% 0;
`;
const ShieldIcon = styled.View`
    position: absolute;
    padding-top: 520%;
    z-Index: 1;
`;