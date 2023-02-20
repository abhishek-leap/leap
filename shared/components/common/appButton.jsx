import React from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';

export const AppButton = (props) => {
    const {colors} = useTheme();
    const {onPress, title, style, isLoading, value, width, height}  = props;

    return(
        <View width={width} height={height} colors={colors} value={value}>
            <ButtonPress
                onPressIn={onPress} >
                <ButtonText>{!isLoading ? title : <Loader />}</ButtonText>
            </ButtonPress>
        </View>
    );
};

const View = styled.View`
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: 20px;
    padding-vertical: 5px;
    background-color: ${props => props.value == '' ? props.colors.PLAYLEAP_SILVER : props.colors.secondary};
    justify-content: center;
    align-items: center;
    margin-top: 10%;
`;

const ButtonPress = styled.TouchableOpacity`
`;

const ButtonText = styled.Text`
    color: rgb(255, 255, 255);
    text-align: center;
    padding: 0 30px 0 30px;
`;