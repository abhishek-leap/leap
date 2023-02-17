import styled from "@emotion/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import {progressBarStatus} from '../../redux-ui-state/slices/createDareSlice';

const Toaster = () => {
  const windowHeight = Dimensions.get("window").height;
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const popAnim = useRef(new Animated.Value(windowHeight * 0.35)).current;
  const elseSuccessMessage = "";
  const successMessage = "Video Uploaded Successfully!!";

  useEffect(() => {
    setStatus("success");
    popIn();
  }, [])
  
  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * 0.35,
      duration: 700,
      useNativeDriver: true,
    }).start(popOut());
  };

  const popOut = () => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: windowHeight * 0.50,
        duration: 300,
        useNativeDriver: true,
      }).start();
      dispatch(progressBarStatus(false));
    }, 2000);
  };

  return (
    <TopView>
      <ToastContainer
        style={[
          {
            transform: [{ translateY: popAnim }],
          },
        ]}
      >
        <ToastRow >
          <ToastTextView>
            <ToastText>
              {status === "success" ? successMessage : elseSuccessMessage}
            </ToastText>
          </ToastTextView>
        </ToastRow>
      </ToastContainer>
    </TopView>
  );
};

export default Toaster;

const ToastContainer = styled(Animated.View)`
    height: 80px;
    width: 250px;
    background-color: #f5f5f5;
    justify-content: center;
    align-items: center;
    
    shadow-color: #000;
    shadow-offset: {
        width: 0,
        height: 2,
    },
    shadow-opacity: 0.25;
    shadow-radius: 3.84px;

    elevation: 5;
`;

const ToastRow = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;

const ToastTextView = styled.View`
    width: 90%;
    padding: 2px;
`;

const ToastText = styled.Text`
    font-size: 14px;
`;

const TopView =  styled.View`
`;