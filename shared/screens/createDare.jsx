import React, { useEffect, useRef } from 'react';
import {View, NativeModules, Platform, Text} from 'react-native';
import withAuthentication from '../hoc/withAuthentication';
import {useDispatch, useSelector} from 'react-redux';
import {FullAuthentication, openAuthenticationBottomDrawer} from '../redux-ui-state/slices/authenticationSlice';
import { openCreateDareBottomDrawer, selectedVedioURI, vedioThumbnail } from '../redux-ui-state/slices/createDareSlice';
// import { useLensGroup } from '../hooks/useQueryLens';
import { getBase64FromUrl, getData } from '../utils/helper';
import { lensGroup } from '../apis';
import { createThumbnail } from "react-native-create-thumbnail";
import Toaster from '../components/common/toaster';


const { VideoEditorModule } = NativeModules;

const CreateDare = ({isBasicSignupCompleted, isExtendedSignupCompleted}) => {
  const dispatch = useDispatch();
  const { progressBarSuccess } = useSelector(state => state.createDare);
  // const lensGroupInfo = useLensGroup();

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
        console.log("Video not selected");
      }
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