import React, { useEffect } from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';

// import 
import { 
    WINDOW_HEIGHT,
  WINDOW_WIDTH 
} from '../../../constants';
import { useRef } from 'react';

const CustomWheel = ({ optionChoose, value, isLoading, data, onChange, type }) => {
    const {colors} = useTheme();
    const scrollRef = useRef(null);
    const dHeight = Math.round(WINDOW_HEIGHT / 4);
    const offsets = data.map((_: number, index: number) => index * dHeight)

    // const snapScrollToIndex = (index) => {
    //     scrollRef?.current?.scrollTo({y: dHeight * index, animated: true})
    // }

    // useEffect(() => {
    //     snapScrollToIndex(value - digits[0])
    // }, [scrollRef.current])

    const handleMomentumScrollEnd = ({nativeEvent}) => {
        const digit = Math.round(nativeEvent.contentOffset.y / dHeight + data[0]);
        onChange(type, digit);
    }

    return (
        <ScrollWheel 
            ref={scrollRef}
            snapToOffsets={offsets}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={0}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            currentWidth={WINDOW_WIDTH} 
            currentHeight={WINDOW_HEIGHT} 
            colors={colors}
        >
            {/* <TransparentView colors={colors} currentWidth={WINDOW_WIDTH} currentHeight={WINDOW_HEIGHT}> */}
                {data.map((year, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            onChange(type, data[index])
                            snapScrollToIndex(index)
                        }}
                        >
                        <Text key={year}>{year}</Text>
                    </TouchableOpacity>
                ))}
            {/* </TransparentView> */}
        </ScrollWheel>
    )
}

export default CustomWheel;

const ScrollWheel = styled.ScrollView`
    border-width: 1px;
    border-color: ${props => props.colors.PLAYLEAP_PINK};
    border-top: 1px;
    border-bottom: 1px;
    background-color: hsla(0,0%,100%,.03);
    border-radius: 0px;
    opacity: 0.8;
    position: relative;
    height: 20px;
    color: ${props => props.colors.PLAYLEAP_WHITE}
`;

// const TransparentView = styled.View`
//     border-width: 1px;
//     border-color: ${props => props.colors.PLAYLEAP_PINK};
//     border-top: 1px;
//     border-bottom: 1px;
//     background-color: hsla(0,0%,100%,.03);
//     border-radius: 0px;
//     opacity: 0.8;
//     position: relative;
//     height: 50px;
//     color: ${props => props.colors.PLAYLEAP_WHITE}
// `;

const Text = styled.Text`
    color: rgb(255, 255, 255);
    text-align: center;
    padding: 0 30px 0 30px;
`;

const TouchableOpacity = styled.TouchableOpacity`
   
`;