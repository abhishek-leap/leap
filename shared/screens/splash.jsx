import React,{useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useInfiniteDares } from '../hooks/useInfiniteDares';
import { useInfiniteFeeds } from '../hooks/useInfiniteFeeds';
// import { useLeapMockAPI, useMojAPI } from '../hooks/useMasterAPI';
import { handleSetRoot } from '../navigation/navigationService';
import { setGlobalNavigation } from '../utils/helper';
import Logo from '../images/logo.svg';

const Splash = ({navigation}) => {
    const {data: daresData } = useInfiniteDares();
    const {data: feedData } = useInfiniteFeeds();
    // const { data } = useMojAPI();
    // const { data } = useLeapMockAPI();
    

    useEffect(() => {
      setGlobalNavigation(navigation);
      if(feedData?.feeds && daresData?.dares.length > 0) {
        setTimeout(() => {
            handleSetRoot({name: 'Home'})
          },2000)
      }
      // if(data) {
      //   setTimeout(() => {
      //       handleSetRoot({name: 'Home'})
      //     },2000)
      // }
    })

  return (
   <SafeAreaView style={styles.container}>
      <View style={styles.uiView}>
        {/* <Text style={styles.txt}>{'Playleap'}</Text> */}
        <Logo height={20} width={60} />
      </View>
   </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9CA69E'
    },
    uiView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        fontSize: 24,
        color: "#000000"
    },
    img: {
        height: 145,
        width: 210
    },
});