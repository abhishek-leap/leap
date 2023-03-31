import styled from "@emotion/native";
import {useTheme} from '@react-navigation/native';
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text, View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {progressBarStatus} from '../../redux-ui-state/slices/createDareSlice';
import { toasterDisplayStatus, toasterMessage } from "../../redux-ui-state/slices/feedsSlice";


const Toaster = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(null);
  const { toasterDisplay, toasterMessage } = useSelector(state => state.feeds);

  const windowHeight = Dimensions.get("window").height;
  const popAnim = useRef(new Animated.Value(windowHeight * 0.35)).current;
  
  
  const elseSuccessMessage = "";
  const successMessage = toasterMessage || "";

  useEffect(() => {
    setStatus("success");
    if(successMessage !== '' && toasterDisplay) {
      popIn();
    }
  }, [toasterDisplay])
  
  const popIn = () => {
    setModalVisible(true);
    Animated.timing(popAnim, {
      toValue: windowHeight * 0.35,
      duration: 700,
      useNativeDriver: true,
    }).start(popOut());
  };

  const popOut = () => {
    setTimeout(() => {
      setModalVisible(false);
      // dispatch(toasterMessage(''));
      dispatch(toasterDisplayStatus(false));
      dispatch(progressBarStatus(false));
    }, 2000);
  };

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
      <ToastContainer colors={colors}>
        {/* <ToastRow colors={colors}>
            <ToastText>
              {status === "success" ? successMessage : elseSuccessMessage}
            </ToastText>
        </ToastRow> */}
        <View style={styles.modalView}>
          {/* <Text style={[styles.modalText, {textAlign: 'left'}]}>{status === "success" ? 'success!' : null}</Text> */}
          <Text style={styles.modalText}>{status === "success" ? successMessage : elseSuccessMessage}</Text>
        </View>
      </ToastContainer>
    </Modal>
  );
};

export default Toaster;

const styles = StyleSheet.create({

  modalView: {
    opacity: 0.9,
    height: '10%',
    width: '80%',
    margin: 20,
    backgroundColor: '#371270', //'white',
    borderRadius: 20,
    padding: 31,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column'
  },
  modalText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const ToastContainer = styled(Animated.View)`
    flex: 1;
    flex-direction: column;
    justifyContent: flex-end;
    alignItems: center;
    opacity: 0.7;
`;

const ToastRow = styled.View`
    height: 50%;
    
    margin: 20px;
    // background-color: white;
    border-radius: 20px;
    padding: 35px;
    align-items: center;
    shadow-color: #000
    shadow-offset: {
      width: 0px;
      height: 2px;
    },
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 5;

    width: 80%;
    background-color: ${props => props.colors.PLAYLEAP_DARK_BLUE}
`;

const ToastText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: white;
`;