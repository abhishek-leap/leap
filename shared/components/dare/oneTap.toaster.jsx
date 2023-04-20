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

const OneTapToaster = ({
    toasterMessage
}) => {
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const windowHeight = Dimensions.get("window").height;
  const popAnim = useRef(new Animated.Value(windowHeight * 0.35)).current;
  

  useEffect(() => {
    popIn();
  }, [])
  
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
    }, 2000);
  };

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
      <ToastContainer colors={colors}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{toasterMessage}</Text>
        </View>
      </ToastContainer>
    </Modal>
  );
};

export default OneTapToaster;

const styles = StyleSheet.create({

  modalView: {
    bottom: '11%',
    height: '5%',
    width: '75%',
    borderColor: '#000',
    borderWidth: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'column'
  },
  modalText: {
    color: '#4a4a4a',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Metropolis-Regular'
  },
});

const ToastContainer = styled(Animated.View)`
    flex: 1;
    flex-direction: column;
    justifyContent: flex-end;
    alignItems: center;
    border: 1px solid #1B0D3D;
`;