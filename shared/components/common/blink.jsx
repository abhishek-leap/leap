import React, { useEffect, useRef } from 'react'
import { Animated, Easing, View } from 'react-native'

export default Blink = ({children, duration, style}) => {
    const fadeAnimation = useRef(new Animated.Value(1.5))

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnimation.current, {
                    toValue: 2,
                    duration: duration,
                    easing: Easing.ease, // the style of animation
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnimation.current, {
                    toValue: 1.5,
                    duration: duration,
                    easing: Easing.ease, // the style of animation
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);

    return (
        <View style={{ ...style }}>
            <Animated.View style={{ transform: [{scale: fadeAnimation.current}] }}>
                {children}
            </Animated.View>
        </View>
    )
}