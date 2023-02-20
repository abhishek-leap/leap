import React from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import CloseIcon from '../../../images/close.svg';
import BackArrow from '../../../images/backArrow.svg';

const HeaderTwo = ({ title, subTitle, details, handleClose, backIcon, handleBack }) => {
    const {colors} = useTheme();

    return (
        <TopView colors={colors}>
            <BackBtn onPress={() => handleBack()}>
                    <BackArrow style={{ color: colors.PLAYLEAP_WHITE }}/>
            </BackBtn>
            <MiddleView>
                {title ? <HeaderTxt style={{fontSize: 16}} colors={colors}>{title}</HeaderTxt> : <View></View>}
            </MiddleView>
        </TopView>
    )
}

export default HeaderTwo;

const BackBtn = styled.TouchableOpacity`
    position: absolute;
    left: 15px;
`;

const MiddleView = styled.View`
`;

const HeaderTxt = styled.Text`
    color: ${props => props.colors.PLAYLEAP_WHITE};
    text-align: center;
    font-size: ${props => props.style?.fontSize}'px';
`;

const TopView = styled.View`
    flex-direction: row;
    justify-content: center;
`;