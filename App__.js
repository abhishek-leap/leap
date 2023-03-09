import React, {useRef, useState} from 'react';
import { useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';


const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {width, height} = Dimensions.get('window');
  const slideAnimation = useRef(new Animated.Value(height)).current;

    const toggleDrawer = (toValueSelected, duration) => {
        Animated.timing(slideAnimation, {
        toValue: toValueSelected,
        duration: duration, //ANIMATION_DURATION,
        useNativeDriver: true,
        }).start();
    };


    useEffect(() => {
        let animationDuration = 5000;
        toggleDrawer(height, animationDuration);
    }, [toggleDrawer])
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // opacity: 0.1,
    // height: '100%',
    // width: '100%',
  },
  modalView: {
    // opacity: 0.1,
    height: '50%',
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;