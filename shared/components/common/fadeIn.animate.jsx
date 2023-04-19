import React, {useRef, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { Animated, Easing } from 'react-native';

const FadeInView = ({children, duration}) => {
  const fadeAnim = new Animated.Value(0); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: false,
      easing: Easing.ease, // the style of animation
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.animate, { transform: [
      {
          scaleX: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1.5, 1]
          })
      },
      {
          scaleY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1.5, 1]
          })
      }
  ]}]}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;

const styles = StyleSheet.create({
  animate: {
    position: 'absolute',
    height: '100%',
    width: '200%',
  }
});



// import React, { Component } from 'react'
// import { Animated, View, TouchableOpacity, Easing,Text, SafeAreaView} from 'react-native'

// const backgroundImage = require('../../images/defaultCover.png')

// class FadeInView extends Component {
//     constructor(props) {
//         super(props)
//         this.animatedValue = new Animated.Value(0)
//     }

//     handleAnimation = () => {
//         Animated.timing(this.animatedValue, {
//             toValue: 1,
//             duration: 1000,
//             useNativeDriver: false,
//             easing: Easing.ease
//         }).start()
//     }

//     render() {
//         return (
//             <SafeAreaView style={{ flex: 1 }}>
//                 <TouchableOpacity onPress={this.handleAnimation}>
//                     <Text>
//                        Transform Image
//                     </Text>
//                 </TouchableOpacity>
//                 <Animated.Image
//                     source={backgroundImage}
//                     resizeMode='cover'
//                     style={{
//                         position: 'absolute',
//                         left: 40,
//                         top: 100,
//                         height: 400,
//                         width: 400,
//                         transform: [
//                             // {
//                             //     translateX: this.animatedValue.interpolate({
//                             //         inputRange: [0, 1],
//                             //         outputRange: [0, 0]
//                             //     })
//                             // },
//                             // {
//                             //     translateY: this.animatedValue.interpolate({
//                             //         inputRange: [0, 1],
//                             //         outputRange: [0, 0]
//                             //     })
//                             // },
//                             {
//                                 scaleX: this.animatedValue.interpolate({
//                                     inputRange: [0, 1],
//                                     outputRange: [1, 0.5]
//                                 })
//                             },
//                             {
//                                 scaleY: this.animatedValue.interpolate({
//                                     inputRange: [0, 1],
//                                     outputRange: [1, 0.5]
//                                 })
//                             }
//                         ]
//                     }}
//                 />
//             </SafeAreaView>
//         )
//     }
// }

// export default FadeInView