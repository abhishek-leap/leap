import React, { useEffect } from 'react';
import {View, NativeModules, Platform} from 'react-native';
import withAuthentication from '../hoc/withAuthentication';
import {useDispatch} from 'react-redux';
import {FullAuthentication, openAuthenticationBottomDrawer} from '../redux-ui-state/slices/authenticationSlice';
import { openCreateDareBottomDrawer, selectedVedioHeight, selectedVedioURI, selectedVedioWidth, vedioThumbnail } from '../redux-ui-state/slices/createDareSlice';
// import { useLensGroup } from '../hooks/useQueryLens';
import { getBase64FromUrl, getData } from '../utils/helper';
import { lensGroup } from '../apis';
import { createThumbnail } from "react-native-create-thumbnail";
import { useCompetitorsList, useHashtagList, useSkillsGroup, useSkillsList, useSportList, useSuggestionList } from '../hooks/useMasterAPI';


const { VideoEditorModule } = NativeModules;

const CreateDare = ({isBasicSignupCompleted, isExtendedSignupCompleted}) => {
  const dispatch = useDispatch();
  const {  } = useSportList();
  const {  } = useHashtagList();
  const skillsList = useSkillsList();
  const connectionsList = useCompetitorsList();
  const followersList = useCompetitorsList();
  const followingList = useCompetitorsList();
  const suggestionList = useSuggestionList();
  const { } = useSkillsGroup();
  // const lensGroupInfo = useLensGroup();

  useEffect(() => {
    
    if (isBasicSignupCompleted != "true" || isExtendedSignupCompleted != "true") {
      dispatch(FullAuthentication(1));
      dispatch(openAuthenticationBottomDrawer());
    } else {
      openVideoEditor();
      // dispatch(openCreateDareBottomDrawer());
    }
  }, [isBasicSignupCompleted, isExtendedSignupCompleted]);

  const openVideoEditor = async () => {
    const token = getData('token');
    // lensGroup.mutate(token);
      const data = await lensGroup();
      let lenseGroup = [];
      lenseGroup = data?.groups?.toString();
      const videoUri = await VideoEditorModule.openVideoEditor(
        token,
        lenseGroup,
        false
      );
      const PreVideoURL = videoUri
      if(Platform.os === 'ios') {
        PreVideoURL = JSON.parse(previousURL);
      }

      if(videoUri) {
        if (isBasicSignupCompleted == "true" || isExtendedSignupCompleted == "true") {
          dispatch(openCreateDareBottomDrawer());
        }
        const finalVideoURL = Platform.OS == "ios" ? PreVideoURL.urlToString : `file://${PreVideoURL}`;
        dispatch(selectedVedioURI(finalVideoURL));

        if(Platform.os === 'ios') {
          dispatch(selectedVedioWidth(parseInt(PreVideoURL.width)));
          dispatch(selectedVedioHeight(parseInt(PreVideoURL.height)));
        }

        createThumbnail({
          url: finalVideoURL,
          timeStamp: 100,
        })
        .then(async (response) => {
          const img = await getBase64FromUrl(response.path);
          dispatch(vedioThumbnail(img));
        })
        .catch((err) => console.log({ err }));
      }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    </View>
  );
};

export default withAuthentication(CreateDare);