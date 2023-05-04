import styled from "@emotion/native";
import {useTheme} from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text, View
} from "react-native";
import OneTap from '../../images/oneTapHand.svg';

const OneTapToaster = ({
    toasterMessage,
    handleFirstVideoFinish
}) => {
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true);
    let ModalTime = setTimeout(() => {
      setModalVisible(false);
    }, 2000);

    return () => {
      clearTimeout(ModalTime)
    }
  }, [])

  const onHandle = () => {
    setModalVisible(false);
    handleFirstVideoFinish();
  }

  return (
    <Modal
        transparent={true}
        visible={modalVisible}>
      <ToastContainer colors={colors} onPressOut={() => onHandle()}>
        <View style={styles.modalView}>
          <OneTap width={15} height={15}/>
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
    justifyContent: 'center',
    flexDirection: 'row'
  },
  modalText: {
    color: '#4a4a4a',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Metropolis-Regular',
    paddingHorizontal: 10,
  },
});

const ToastContainer = styled.TouchableOpacity`
    flex: 2;
    flex-direction: column;
    justifyContent: flex-end;
    alignItems: center;
    border: 1px solid #1B0D3D;
`;