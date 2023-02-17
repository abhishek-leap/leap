import React, { useEffect, useRef } from 'react';
import {View, NativeModules, Platform, Text} from 'react-native';
import withAuthentication from '../hoc/withAuthentication';
import {useDispatch, useSelector} from 'react-redux';
import {FullAuthentication, openAuthenticationBottomDrawer} from '../redux-ui-state/slices/authenticationSlice';
import { closeCreateDareBottomDrawer, openCreateDareBottomDrawer, selectedVedioURI, vedioThumbnail } from '../redux-ui-state/slices/createDareSlice';
// import { useLensGroup } from '../hooks/useQueryLens';
import { getData } from '../utils/helper';
import { lensGroup } from '../apis';
import { createThumbnail } from "react-native-create-thumbnail";
import Toaster from '../components/common/toaster';


const { VideoEditorModule } = NativeModules;

const CreateDare = ({isBasicSignupCompleted, isExtendedSignupCompleted}) => {
  const dispatch = useDispatch();
  const { progressBarSuccess } = useSelector(state => state.createDare);
  // const lensGroupInfo = useLensGroup();
  const videoURI = useRef('');

  useEffect(() => {
    
    if (isBasicSignupCompleted != "true" || isExtendedSignupCompleted != "true") {
      dispatch(FullAuthentication(1));
      dispatch(openAuthenticationBottomDrawer());
    } 
    // else if (isBasicSignupCompleted == "true" || isExtendedSignupCompleted == "true") {
    //   dispatch(openCreateDareBottomDrawer());
    // }
    openVideoEditor();
  }, [isBasicSignupCompleted, isExtendedSignupCompleted]);

  const openVideoEditor = async () => {
    const token = getData('token');
    // lensGroup.mutate(token);
      const data = await lensGroup();
      let lenseGroup = [];
      lenseGroup = data?.groups?.toString();
      // if (isBasicSignupCompleted == "true" || isExtendedSignupCompleted == "true") {
      //   dispatch(openCreateDareBottomDrawer());
      // }
      const videoUri = await VideoEditorModule.openVideoEditor(
        token,
        lenseGroup,
        false
      );
      if(videoUri) {
        if (isBasicSignupCompleted == "true" || isExtendedSignupCompleted == "true") {
          dispatch(openCreateDareBottomDrawer());
        }
        dispatch(selectedVedioURI(videoUri));
        videoURI.current = videoUri;
        createThumbnail({
          url: Platform.OS == "ios" ? videoUri : `file:/${videoUri}`,
          timeStamp: 100,
        })
        .then(async (response) => {
          const img = await getBase64FromUrl(response.path);
          dispatch(vedioThumbnail(img));
        })
        .catch((err) => console.log({ err }));
      } else {
        // dispatch(closeCreateDareBottomDrawer());
        console.log("Video not selected");
      }
  };

  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {progressBarSuccess ? 
        <Toaster successMessage={"Video Uploaded Successfully"}/>
        :
        <></>
      }
    </View>
  );
};

export default withAuthentication(CreateDare);