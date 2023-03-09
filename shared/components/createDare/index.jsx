import React, {useRef, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

// Images 
import ArrowIcon from '../../images/arrowHeadDown.svg';

// import 
import { CREATE_DARE,
  LETS_GO,
  PLACEHOLDER_COMPETITOR,
  PLACEHOLDER_DARE_TITLE,
  PLACEHOLDER_HASHTAGS,
  PLACEHOLDER_SKILLS,
  PLACEHOLDER_SPORTS,
  SELECT_FROM_GALLERY,
  WINDOW_WIDTH 
} from '../../constants';
import Loader from '../common/loader';
import Header from './components/header';
import TxtInput from '../common/textInput';
import { openCompetitorBottomDrawer, 
    openHastagBottomDrawer, 
    openSkillsBottomDrawer, 
    openSportsBottomDrawer,
    selectedHashtags,
    selectedSkills,
    selectedSport,
    progressBarUpdate,
    selectedCompetitor,
    progressBarDisplay,
    progressBarStatus,
    closeCreateDareBottomDrawer
 } from '../../redux-ui-state/slices/createDareSlice';
import { createDare, createFeed, getSignedURL, lensGroup, postVideo, uploadVideoMediaAPI } from '../../apis';
import { TEMP_CDN_VIDEO } from '../../apis/urls';
import { UPLOAD_BROWSE_TYPE, USER_TYPE } from '../../constants';
import CloseIcon from '../../images/close.svg';
import { getFields } from '../../utils/helper';
import Toaster from '../common/toaster';
import { toasterDisplayStatus, toasterMessage } from '../../redux-ui-state/slices/feedsSlice';

const CreateDare = ({ optionChoose, value, isLoading}) => {
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const { videoURI, sport, hashtags, skills, competitor, videoThumbnailImg } = useSelector(state => state.createDare);
    const isVideoUploadStatus = useRef('');
    const [title, setTitle] = useState('');

    const handleBack = () => {
        dispatch(selectedHashtags(''));
        dispatch(selectedSkills(''));
        dispatch(selectedSport(''));
        dispatch(selectedCompetitor(''));
        setTitle('')
        onCloseIconClick();
    }

    const onCloseIconClick = () => {
        dispatch(closeCreateDareBottomDrawer());
    };

    const videoUploadStatusCallBack =  async (uploadResponse) => {
        if(uploadResponse == 204 && !isVideoUploadStatus.current.error && isVideoUploadStatus.current != '') {
            const assets = [
              {
                type: "video", 
                assetId: isVideoUploadStatus.current?.id, 
                userId: isVideoUploadStatus.current?.userId, 
                dareCover: "images/defaultCover.png"
              }, 
              {
                type: "video", 
                userId: competitor?.value,
                assetId: null, 
                dareCover: null
              }];
            const options = {
                assets,
                hashTags: getFields(hashtags, "value"),
                hashtagSport: sport.value,
                skills: [{id: skills.value, alias: skills.alias}],
                title: title,
            }
            if(competitor?.value) {
                const createDareResponse = await createDare(options);
                console.log("createDareResponse ", createDareResponse);
            } else {
                const assetsDare = [
                    {
                      type: "video", 
                      assetId: isVideoUploadStatus.current?.id
                    }];
                  const optionsDare = {
                    assets: assetsDare,
                    hashTags: getFields(hashtags, "value"),
                    hashtagSport: sport.value,
                    skills: [{id: skills.value, alias: skills.alias}],
                    title: title,
                  }
                const createFeedResponse = await createFeed(optionsDare);
                console.log("createFeedResponse ", createFeedResponse);
            }
            
        } else {
          console.log("uploadResponse ", uploadResponse);
        }
    }

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
            reference: `${TEMP_CDN_VIDEO}${fields.key}`,
            imageLink: null,
            resource: "AWS",
            providerVideoId: fields.key,
            type: UPLOAD_BROWSE_TYPE.VIDEO,
            videoStatus: USER_TYPE.CREATOR,
            dareId: null
          };
          const uploadVideoFields = await uploadVideoMediaAPI(VideoMediaStatus);
          isVideoUploadStatus.current = uploadVideoFields;
    }
    
    function onUploadProgress(progressEvent) {
        let percentComplete = progressEvent.loaded / progressEvent.total;
        percentComplete = parseInt(percentComplete * 100);
        dispatch(progressBarUpdate(percentComplete));
        if(percentComplete === 100) {
            dispatch(progressBarDisplay(false));
            dispatch(progressBarStatus(true));
            dispatch(progressBarUpdate(0));
            dispatch(toasterMessage('Video Uploaded Successfully'));
            dispatch(toasterDisplayStatus(true));
        }
    };

    const nextAPI = () => {
        dispatch(progressBarDisplay(true));
        
        VideoUploadWithStatus(videoURI);
        handleBack();
    }

    return (
        <>
        <Header
            text={CREATE_DARE}
            handleBack={handleBack}
        />
        <InnerView colors={colors} currentWidth={WINDOW_WIDTH}>
        <TopView>
            {videoThumbnailImg && <Thumbnail 
                source={{uri: videoThumbnailImg}}
            /> }
            <ThumbnailRightView>
                <RightText colors={colors}>{SELECT_FROM_GALLERY}</RightText>
            </ThumbnailRightView>
        </TopView>
       
        <TextInputOuterView>
        <TxtInput 
            value={title}
            width={WINDOW_WIDTH/ 3.85 +'%'}
            onChangeText={(text) => setTitle(text)}
            placeholder={PLACEHOLDER_DARE_TITLE}
            placeholderTextColor={'rgba(255, 255, 255, 1)'}
            // style={{padding: '2% 2% 2% 0%'}}
        />
        </TextInputOuterView>
        <Sports onPress={() => dispatch(openSportsBottomDrawer())} currentWidth={WINDOW_WIDTH} colors={colors}>
            <Selected colors={colors}>{sport?.name || PLACEHOLDER_SPORTS}</Selected>
            <DownArrow color={colors.PLAYLEAP_WHITE} width={50}/>
        </Sports>
        <Skills onPress={() => dispatch(openSkillsBottomDrawer())} currentWidth={WINDOW_WIDTH} colors={colors}>
            <Selected colors={colors}>{skills?.name || PLACEHOLDER_SKILLS}</Selected>
            <DownArrow color={colors.PLAYLEAP_WHITE} width={50}/>
        </Skills>
        <Competitor onPress={() => dispatch(openCompetitorBottomDrawer())} currentWidth={WINDOW_WIDTH} colors={colors}>
            <Selected colors={colors}>{competitor?.name || PLACEHOLDER_COMPETITOR}</Selected>
            <DownArrow color={colors.PLAYLEAP_WHITE} width={50}/>
        </Competitor>
        <Hashtag onPress={() => dispatch(openHastagBottomDrawer())} currentWidth={WINDOW_WIDTH} colors={colors}>
            {
                hashtags.length == '' ? 
                    <Selected colors={colors}>{PLACEHOLDER_HASHTAGS}</Selected>
                    :
                    <FlatList
                        data={hashtags}
                        renderItem={({item}) => {
                            return (
                                <HashTag colors={colors} currentWidth={WINDOW_WIDTH} hashtagLength={hashtags.length} >
                                    <HashTagItem>{item.value}</HashTagItem>
                                    <ClosedContainer colors={colors}  onPress={() => dispatch(selectedHashtags({name: item.value, value: item.value}))}>
                                        <CloseIcon color={colors.PLAYLEAP_DARK_PINK} width={25} height={25} />
                                    </ClosedContainer>
                                </HashTag> 
                            )
                        }}
                        keyExtractor={(item, index) => item.value}
                    />
                    // hashtags.map((item) => (
                    // <HashTag colors={colors} currentWidth={WINDOW_WIDTH} hashtagLength={hashtags.length} >
                    //     <HashTagItem>{item.value}</HashTagItem>
                    //     <ClosedContainer colors={colors}  onPress={() => dispatch(selectedHashtags({name: item.value, value: item.value}))}>
                    //         <CloseIcon color={colors.PLAYLEAP_DARK_PINK} width={25} height={25} />
                    //     </ClosedContainer>
                    // </HashTag> ))
            }
            <DownArrow color={colors.PLAYLEAP_WHITE} width={50}/>
        </Hashtag>
        <NextBtn optionChoose={optionChoose} colors={colors} searchValue={(title && sport?.name && skills?.name) ? "true" : ""}>
            <TouchableOpacity onPress={() => nextAPI()}>
                <NextBtnText>{!isLoading ? LETS_GO : <Loader />}</NextBtnText>
            </TouchableOpacity>
        </NextBtn>
        {/* <Toaster successMessage={"Video Uploaded Successfully"}/> */}
      </InnerView>
      </>
    )
}

export default CreateDare;

const InnerView = styled.View`
    flex: 1;
    align-items: center;
    margin-bottom: ${props => props.currentWidth / 6};

    border-width: 1px;
    border-color: ${props => props.colors.secondary};
    border-radius: 20px;
    margin: 12px 12px 12px 12px;
`;

const NextBtnText = styled.Text`
    color: rgb(255, 255, 255);
    text-align: center;
    padding: 0 30px 0 30px;
`;

const NextBtn = styled.View`
    border-radius: 20px;
    padding-vertical: 10px;
    padding-horizontal: 30px;
    background-color: ${props => props.searchValue == '' ? props.colors.PLAYLEAP_SILVER : props.colors.secondary};
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20px;
`;

const Sports = styled.TouchableOpacity`
    width: ${props => props.currentWidth / 1.12 +'px'};
    border-width: 1px;
    border-color: ${props => props.colors.PLAYLEAP_DARK_PINK};
    border-radius: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.colors.primary};
    margin-top: 5%;
`;

const Skills = styled.TouchableOpacity`
    width: ${props => props.currentWidth / 1.12 +'px'};
    border-width: 1px;
    border-color: ${props => props.colors.PLAYLEAP_DARK_PINK};
    border-radius: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.colors.primary};
    margin-top: 4%;
`;

const Competitor = styled.TouchableOpacity`
    width: ${props => props.currentWidth / 1.12 +'px'};
    border-width: 1px;
    border-color: ${props => props.colors.PLAYLEAP_DARK_PINK};
    border-radius: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.colors.primary};
    margin-top: 5%;
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
    margin-top: 4%;
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
    padding: 5px 10px 5px 10px;
`;

const ClosedContainer = styled.TouchableOpacity`
    color: rgb(255, 255, 255);
    border-width: 1px;
    border-color: ${props => props.colors.PLAYLEAP_DARK_PINK};
    border-radius: 20px;
    margin: 2px 2px 2px 0;
`;

const Thumbnail = styled.Image`
    width: 35%;
    height: 100%;
    border-radius: 20px;
`;

const TopView = styled.View`
    width: 100%;
    height: 30%;
    margin: 5% 0 5% 10%;
    flex-direction: row;
`;

const ThumbnailRightView = styled.View`
    width: 60%;
    padding: 27% 5% 0 3%;
`;

const RightText = styled.Text`
    color: ${props => props.colors.PLAYLEAP_OFF_WHITE};
    padding-top: 10%;
`;

const TextInputOuterView = styled.View`
    margin: 0 1% 0 1%;
`;

const PickItem = styled.TouchableOpacity`
    margin-left: ${props => props.sectionList ? '10%' : '0'};
`;

const Item = styled.View`
    flex-direction: row;
`;

const ListItem = styled.Text`
    color: white;
    font-size: 14px;
    padding: 10px 0 5px 15px;
`;